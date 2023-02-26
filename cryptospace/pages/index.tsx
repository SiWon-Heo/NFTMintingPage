import { NextPage } from 'next'
import styled from '@emotion/styled'
import { useContext,useEffect } from "react";
import { MenuView,Title } from '../components'
import { Button } from '@mui/material'
import Link from "next/link"
import {  Web3Context } from "../contexts";
declare const ethereum:any;


const Home: NextPage =()=> {
  const {web3} = useContext(Web3Context);

  //네트 워크 아이디 체크, 
  //31337 아니면 네트 워크 변환 알림창 및 네트워크 변경
   useEffect( ()=>{
  (async () => {
    const currentNetworkId = await web3?.eth.net.getId()
    console.log(currentNetworkId)

    if(currentNetworkId !==31337){
      // window.alert("change your network to hardhat")
      ethereum.request({method:'wallet_switchEthereumChain', params:[{chainId:"0x7A69"}]})
    }
   })()
    
   
  }, [web3])

  return (
      <MainView>
        <MenuView>
          <Title>CRYPTOSPACE</Title>
          <Link href = "/mint">
            <MenuButton variant="outlined" size="large">Minting Your Own Planet</MenuButton>
          </Link>
          <Link href="/list">
            <MenuButton variant="outlined" size="large">View All Planet</MenuButton>
          </Link>
        </MenuView>
      </MainView>
  )
}

//styled 컴포넌트
const MainView = styled.div`
display: flex;
align-items: center;
justify-content: center;
width: 100%;
height:100%;
`
const MenuButton = styled(Button)`
margin: 4px 0;
width: 100%;
`

export default Home
