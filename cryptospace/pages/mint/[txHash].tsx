import styled from "@emotion/styled";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/router";
import React,{useCallback, useContext,useEffect,useState} from "react";
import { MenuView, Metadata, Title } from "../../components";
import { PlanetName } from "../../components/Planet";
import { SpaceContext, Web3Context } from "../../contexts";
import { usePlanetContract } from "../../hooks";
import { Button } from '@mui/material'


type TxStatus ='PENDING' | 'MINING' | 'MINED' | 'WRONG_TX' //트랜잭션 조회 중 | 트랜잭션이 블록체인에 들어가지 못하고 대기중 | 트랜잭션이 블록체인에 들어가서 트랜잭션 결과 조회 가능 상태 | 다른 트랜잭션일때

const MintTx =()=>{
  const router = useRouter()
  const {txHash}= router.query

  //트랜잭션을 조회해서 받은 상태값
  const [status, setStatus] = useState<TxStatus>('PENDING')

  const {web3} = useContext(Web3Context);
  const {contractAddress,tokenURI} = usePlanetContract(web3)
  const {showPlanet}=useContext(SpaceContext)
  const [metadata, setMetadata] = useState()
  const [owner, setOwner] = useState("")
  const [tokenId, setTokenId] = useState<number | null>(null)


  //트랜잭션 조회
  const checkTx = useCallback(async ()=> {
    if (web3 && txHash){
      const receipt = await web3.eth.getTransactionReceipt(txHash as string);//트랜잭션이 블록체인이 들어갈 시 생성된 결과값이나 로그 포함. 즉receipt가 있으면 민팅 트랜잭션 조회가능, 없으면 마이닝 중 안됨
        
      //receipt로그를 통해 민팅된 행성 결과를 보여줌
      if(receipt){
        console.log(receipt)
        //로그필터를 통해 민팅 (Transfer) 이벤트 필터링
        const mintingEvent = receipt.logs.filter(
          (log)=>
          log.topics[0] === 
          web3.utils.sha3("Transfer(address,address,uint256)")//topics값을(16진수[0:"이벤트 이름 해싱값",1:"from",2:"to",3:"tokenId"]) 통해 민팅 트랜잭션인지 확인
          )[0]//트랜잭션에서 하나만 민팅하므로 트랜잭션 하나발생, 따라서 첫번째 트랜잭션 이벤트 가져오기

        //민팅 트랜잭션 여부 체크
        const isMintingTx =  receipt.to.toLowerCase() ===contractAddress.toLowerCase() && mintingEvent

        if (isMintingTx){
          //민팅 이벤트를 조회하여 메타데이터에서 토큰 행성 이름을 가져오기
          const tokenId = mintingEvent.topics[3];
          const uri = await tokenURI(tokenId);
          const metadataQuery =await fetch(uri);//fetch를 통해 uri를 실행시켜 메타데이터 조회
          const metadata = await metadataQuery.json()   
          setMetadata(metadata)

          const owner = mintingEvent.topics[2];
          setOwner(owner.slice(-40)) //topics값은 앞에 여래개의 0 + 지갑 주소 40글로 구성 됨. 

          setTokenId(web3.utils.hexToNumber(tokenId))//web3 유틸함수로 hex값을 넘버로 바꿈

          const planetType = metadata.planetType as PlanetName;
          showPlanet(planetType)//행성을 보여주기

          setStatus('MINED')
        }

      }else{
        setStatus("MINING")
      }
    }
  }, [web3,txHash,contractAddress,showPlanet,tokenURI]);

  useEffect(()=>{
    if(status === 'PENDING'){
      checkTx()
      return
    }
    if (status === 'MINING'){
      const interval = setInterval(()=>checkTx(),5000)
      return ()=> clearInterval(interval)
    };
  },[status,checkTx])

  return (
    <TxView>
      <DownMenuView>
        {status === 'MINING' &&(
          <>
           <progress/>
            <Description>Wait until transacito is mined...</Description>
          </>
        )}
        {status ==="WRONG_TX" &&(
          <>
           <Title>Wrong Transaction</Title>
            <Description>It{"'"}s not a mining transaction.</Description>
          </>
        )}
        {status ==="MINED" &&(
          <>
           <Title>Planet #{tokenId} </Title>
            <Metadata owner={owner} properties={metadata.attributes}/>
          </>
        )}
        {
        status !== 'PENDING' && status !== 'MINING' && (
        <GoPrevButton variant="contained" size="large" onClick={()=>router.back()}>GO PREVIOUS</GoPrevButton>
        )}
      </DownMenuView>

    </TxView>)
}
const TxView =styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`
const DownMenuView =styled(MenuView)`
  margin-top: 320px;
  align-items: center;
`
//로딩중 애니메이션 효과
const Progress = styled(CircularProgress)`
  margin-top: 24px;
  align-items: 24px;
`
const Description = styled.div`
  width: 100%;
  margin-top:8px;
  color: #ccc;
  text-align: center;
`
const GoPrevButton = styled(Button)`
margin-top: 24px;
color: white;
width: 100%;
`

export default MintTx; 