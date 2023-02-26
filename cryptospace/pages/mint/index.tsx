import { NextPage } from "next";
import React, { useContext, useEffect, useState } from "react";
import styled from '@emotion/styled'
import { MenuView,Title } from '../../components'
import { Button } from '@mui/material'
import { PlanetList } from "../../components/Planet";
import { SpaceContext, Web3Context } from "../../contexts";
import { useRouter } from "next/router";
import { usePlanetContract } from "../../hooks";
import BN from "bn.js";//✅

const Mint: NextPage = () =>{
  const router =useRouter()
  const {showPlanet, clearPlanet} = useContext(SpaceContext)
  const [planetIndex, setplanetIndex] = useState (-1)
  const {web3} = useContext(Web3Context);//✅
  const {mintPlanet} = usePlanetContract(web3);//✅
  

  //planetIndex 값을 랜덤으로 planetList의 인덱스값 중 하나라 지정하는 함수 만들기
  const showRandomPlanet =()=> {
    setplanetIndex(Math.floor(Math.random()*PlanetList.length))
  };
 
  const mint =async ()=>{
    if(!web3){
      return
    }
    const accounts = await web3.eth.requestAccounts()
    const currentAccount = accounts[0]
    console.log("currentAccount",currentAccount)

    //mintPlanet 호출 후 트랜잭션 생성 후 콜백 함수로 바로 트랜잭션해시 받아 txHash 페이지로 이동
    mintPlanet ({
      from: currentAccount,
      //0.001eth= 1 milliether, 0.001eth * 10 = 10 * 1 milliether  = 0.01eth
      value: web3.utils.toWei(new BN(10),"milliether") //wei단위로 들어가야 함 1eth = 10**18 wei
    }).on('transactionHash', (txHash:string)=>{
      router.push(`/mint/${txHash}`);
    });//✅
  };

  //planetIndex생성되면 행성 보여주며,useEffect 초기화 될때 clearplanet 호출
  useEffect(()=>{
    if (planetIndex >=0){
      showPlanet(PlanetList[planetIndex])
    }
    return()=>clearPlanet()
  }, [planetIndex, showPlanet, clearPlanet])

  //1분에 한번 행성 바꾸기
  useEffect(()=>{
    showRandomPlanet()
    const interval = setInterval(()=>showRandomPlanet(),1000)
    return()=>clearInterval(interval)
  }, [])

  return (
    <MainView>
      <MenuView>
        <Title>Mint your own PLANET!</Title>
        <Description>You can mint a planet NFT by paying <b>0.01ETH</b>.<br />
You will get a random planet.<br />
Please press below button to mint!</Description>
        <MenuButton variant="contained" size="large" onClick={()=>mint ()}>Mint Planet</MenuButton>
        <MenuButton variant="outlined" size="large" onClick={()=>router.back()}>Go Previous</MenuButton>
      </MenuView>
    </MainView>
)
}

//styled 컴포넌트
const MainView = styled.div`
margin-top: 100px;
display: flex;
align-items: center;
justify-content: center;
width: 100%;
height:100%;
`
const Description = styled.div`
font-size: 16px;
line-height: 1.5;
font-weight: 100;
color: #fff;
text-align: center;
margin-bottom: 24px;
`

const MenuButton = styled(Button)`
margin: 4px 0;
width: 100%;
`
export default Mint
