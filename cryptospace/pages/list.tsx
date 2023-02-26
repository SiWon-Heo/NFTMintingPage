import { NextPage } from "next";
import React, { useContext, useEffect, useState } from "react";
import { SpaceContext, Web3Context } from "../contexts";
import { usePlanetContract } from "../hooks";
import styled from '@emotion/styled'
import { MenuView, Metadata, Title } from "../components";
import { Button } from "@mui/material";
import { useRouter } from "next/router";


const List: NextPage = () =>{
  const {web3} = useContext(Web3Context);
  const {totalSupply,tokenURI,ownerOf} = usePlanetContract(web3);
  const [currentIndex, setCurrentIndex] = useState(0) //페이지 
  const [numOfTokens, setNumOfTokens] = useState(-1) //총 발행양 
  const [owner, setOwner] = useState('')  
  const [metadataURI, setMetadataURI] = useState('')  
  const [metadata, setMetadata] = useState<any>('')  

  const router = useRouter()

  const {showPlanet,clearPlanet}=useContext(SpaceContext)

        
  useEffect(()=>{
    if (web3){
      (async ()=> {
        //totalsupply호출 하여 상태변수 값 할당
        const total = await totalSupply()
        setNumOfTokens(+total); 
        //owner uri 상태변수 값 할당
        if(currentIndex < numOfTokens){
          const tokenId = web3.utils.numberToHex(currentIndex)
          const uri = await tokenURI(tokenId)
          const owner = await ownerOf(tokenId)
          setOwner(owner)
          setMetadataURI(uri)
        }
      })()
    }
    return
  }, [web3,currentIndex,numOfTokens,ownerOf,tokenURI,totalSupply])

    //metadataURI로 메타데이터 받아 상태변수 할당
    useEffect(()=>{
      if (metadataURI){
        (async ()=> {
          const metadataQuery =await fetch(metadataURI)
          const metadata =await metadataQuery.json()
          setMetadata(metadata)
        })()
      }
      return
    }, [metadataURI])

      //metada 있을시 행성 보여주기
  useEffect(()=>{
    if (metadata && metadata.planetType){
      showPlanet(metadata.planetType)
    }
    return()=>clearPlanet()
  }, [metadata,showPlanet,clearPlanet])

    //버튼 클릭시 숫자 변하기
    const onNext =()=>{
      if(currentIndex < numOfTokens -1){
        setCurrentIndex(currentIndex +1)
      }
    }
    const onPrev =()=>{
      if(currentIndex > 0){
      setCurrentIndex(currentIndex -1)
      }
    }

  return ( 
    <ListView>
      <DownMenuView>
        <Title>Planet #{currentIndex}</Title>
        {metadata && (<Metadata owner={owner} properties={metadata.attributes}/>)}
        <SwitchView>
          <Button variant="contained" size="large" onClick={onPrev} disabled= {currentIndex === 0}>Prew</Button>
          {
            numOfTokens > 0 &&
            <Counter>{currentIndex+1}/{numOfTokens}</Counter>
          }
          <Button variant="contained" size="large" onClick={onNext} disabled= {currentIndex === numOfTokens -1}>Next</Button>
        </SwitchView>
        <GoPrevButton onClick={()=>router.back()}>Go Previous</GoPrevButton>
      </DownMenuView>
    </ListView>
    )}



//styled 컴포넌트
const ListView = styled.div`
display: flex;
align-items: center;
justify-content: center;
width: 100%;
height:100%;
color: white;
`
const DownMenuView =styled(MenuView)`
  margin-top: 320px;
`
const SwitchView = styled.div`
margin-top: 24px;
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
`
const Counter = styled.div`
flex: 1;
text-align: center;
color: #fff;
font-size: 20px;
`
const GoPrevButton = styled(Button)`
margin-top: 8px;
`

export default List