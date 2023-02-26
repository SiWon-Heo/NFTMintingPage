import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Space } from '../components'
import styled from '@emotion/styled'
import { SpaceContextProvide} from '../contexts'
import { Web3ContextProvider } from '../contexts'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Web3ContextProvider>
    <SpaceContextProvide>
    <AppView>
    <SpaceWrapper>
    <Space/>
    </SpaceWrapper>
    <ComponetWrapper>
     <Component {...pageProps} />
    </ComponetWrapper>
    </AppView>
    </SpaceContextProvide>
    </Web3ContextProvider>
  ) 
}

//styled 컴포넌트
const AppView = styled.div`
width: 100%;
height:100%;
`
const SpaceWrapper = styled.div`
position: absolute;
z-index: -1;
width: 100%;
height:100%;
`

const ComponetWrapper = styled.div`
padding: 20px;
overflow-y: auto;
width: 100%;
height:100%;
`