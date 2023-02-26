import { Canvas } from "@react-three/fiber";
import React, {CanvasHTMLAttributes, useContext}  from "react";

//self오류 처리: three 라이버러리 컴포넌트타가 서버사이드 랜더링 안되게 처리
import dynamic from "next/dynamic";
import { SpaceContext } from "../../contexts";
const Stars = dynamic(
  () => import("@react-three/drei").then((mod) => mod.Stars),
  {
  ssr: false,
  }
);
const Planet = dynamic(
  () => import("../Planet").then((mod) => mod.Planet),
  {
  ssr: false,
  }
);

export const Space = (props:CanvasHTMLAttributes<any>) =>{
  const {planet} = useContext(SpaceContext);//context의 planet 변수 가져오기
  return(
    //canvas 생성 후 배경 검정으로 변경
    //canvas 속성 props 넘겨 받음
    <Canvas onCreated={(state) => state.gl.setClearColor('black')} {...props}>
      <Stars/>
      <Planet name={planet} position={[0,1.5,0]}/>//context의 planet 변수 사용
      <ambientLight intensity={0.3}/> //전역으로 빛 비추기
      <spotLight position={[100,100,80]} distance= {200} intensity={70} angle={1}/>//한 방향으로 빛 비추어 그림자로 입체감 주기
    </Canvas>
  ) 
}
