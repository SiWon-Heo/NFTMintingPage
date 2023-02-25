import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import type { NextPage } from "next";
import styled from "@emotion/styled";
import { MenuView } from "@/components/MenuView";
import { Title } from "@/components/Title";
import { Button } from "@mui/material";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { PlanetList } from "@/components/Planet";
import { SpaceContext } from "@/contexts/useSpace";
import { useRouter } from "next/router";

const Mint: NextPage = () => {
	const router = useRouter();
	const { showPlanet, clearPlanet } = useContext(SpaceContext);
	const [planetIndex, setPlanetIndex] = useState(-1);

	const showRandomPlanet = () => {
		setPlanetIndex(Math.floor(Math.random() * PlanetList.length));
	};

	useEffect(() => {
		if (planetIndex >= 0) {
			showPlanet(PlanetList[planetIndex]);
		}
		return () => clearPlanet();
	}, [planetIndex, showPlanet, clearPlanet]);

	useEffect(() => {
		showRandomPlanet();
		const interval = setInterval(() => showRandomPlanet(), 1000);

		return () => clearInterval(interval);
	}, []);

	return (
		<MainView>
			<MenuView>
				<Title>Mint You Own Planet</Title>
				<Description>
					You can mint a planet NFT by paying <b>0.01 ETH.</b> <br />
					You will get a random planet. <br />
					Please press below button to mint!
				</Description>

				<ButtonView>
					<MenuButton variant="contained" size="large">
						Mint Planet
					</MenuButton>
					<MenuButton
						variant="outlined"
						size="large"
						onClick={() => router.back()}
					>
						Go Previous
					</MenuButton>
				</ButtonView>
			</MenuView>
		</MainView>
	);
};

const MainView = styled.div`
	margin-top: 50px;
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const MenuButton = styled(Button)`
	margin: 4px 0;
	width: 100%;
`;

const MenuLink = styled(Link)`
	display: flex;
	justify-content: center;
`;

const Description = styled.div`
	font-size: 16px;
	line-height: 24px;
	font-weight: 100;
	color: #ffffff;
	text-align: center;
`;

const ButtonView = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 24px;
`;
export default Mint;
