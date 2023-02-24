import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import type { NextPage } from "next";
import styled from "@emotion/styled";

const Home: NextPage = () => {
	return <MainView>abc</MainView>;
};

const MainView = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
`;
export default Home;
