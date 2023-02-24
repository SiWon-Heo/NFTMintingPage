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

const Home: NextPage = () => {
	return (
		<MainView>
			<MenuView>
				<Title>CryptoSpace</Title>
				<MenuLink href="/mint">
					<MenuButton variant="outlined" size="large">
						Minting Your Own Planet
					</MenuButton>
				</MenuLink>
				<MenuLink href="/list">
					<MenuButton variant="outlined" size="large">
						View All Planets
					</MenuButton>
				</MenuLink>
			</MenuView>
		</MainView>
	);
};

const MainView = styled.div`
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
export default Home;
