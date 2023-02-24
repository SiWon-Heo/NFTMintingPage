import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Space } from "@/components/Space/Space";
import styled from "@emotion/styled";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<AppView>
			<SpaceWrapper>
				<Space />
			</SpaceWrapper>
			<ComponentWrapper>
				<Component {...pageProps} />
			</ComponentWrapper>
		</AppView>
	);
}

const AppView = styled.div`
	width: 100%;
	height: 100%;
`;

const SpaceWrapper = styled.div`
	position: absolute;
	z-index: -1;
	width: 100%;
	height: 100%;
`;

const ComponentWrapper = styled.div`
	width: 100%;
	height: 100%;
	padding: 20px;
	overflow-y: auto;
`;

export default MyApp;
