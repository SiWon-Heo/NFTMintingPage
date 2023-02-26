import styled from "@emotion/styled";
import { useGLTF } from "@react-three/drei";
import { PrimitiveProps, useFrame } from "@react-three/fiber";
import React, {HTMLAttributes, useRef}  from "react" ;
import { useMemo } from "react";

//행성 오브젝트 이름 정의
//타입 define
export type PlanetName = | "sun" |"mercury"|"venus"|"earth"|"mars"|"jupiter"|"saturn"|"uranus"|"neptune"|null;

export const PlanetList = ["sun" ,"mercury","venus","earth","mars","jupiter","saturn","uranus","neptune"]as PlanetName[];

interface PlanetProps extends Partial<PrimitiveProps>{
  name: PlanetName
}
export const Planet = ({name, ...primitiveProps}:PlanetProps) =>{
  const planetRef = useRef<any>();
  //3d 오브젝트 import
  const {scene:sun} = useGLTF("https://space.coinyou.io/3d-objects/sun.glb")
  const {scene:mercury} = useGLTF("https://space.coinyou.io/3d-objects/mercury.glb")
  const {scene:venus} = useGLTF("https://space.coinyou.io/3d-objects/venus.glb")
  const {scene:earth} = useGLTF("https://space.coinyou.io/3d-objects/earth.glb")
  const {scene:mars} = useGLTF("https://space.coinyou.io/3d-objects/mars.glb")
  const {scene:jupiter} = useGLTF("https://space.coinyou.io/3d-objects/jupiter.glb")
  const {scene:saturn} = useGLTF("https://space.coinyou.io/3d-objects/saturn.glb")
  const {scene:uranus} = useGLTF("https://space.coinyou.io/3d-objects/uranus.glb")
  const {scene:neptune} = useGLTF("https://space.coinyou.io/3d-objects/neptune.glb")

  const scene = useMemo (()=> name ? {
    sun,mercury,venus,earth,mars,jupiter,saturn,uranus,neptune
  }[name]: null,[sun,mercury,venus,earth,mars,jupiter,saturn,uranus,neptune,name]);

  //3d 재사용시 오류남, 그러므로 랜더링 할때마다 새롭게 클론
  const copiedScene = useMemo(()=>(scene ? scene.clone():null), [scene]);

  //3d 화면 프레임마다 로테이션 값을 수정하여 자전효과 줌
  useFrame(()=>{
    if (planetRef.current) {
      planetRef.current.rotation.x = 3;
      planetRef.current.rotation.y += 0.004;
    }
  })

  return (
    copiedScene !== null ? ( 
    <group key ="planet" dispose={null}>
     <primitive 
     ref={planetRef}
     object ={copiedScene.children [copiedScene.children.length-1]}
     {...primitiveProps}
     />
    </group>
    ):null
  )
}

//styled 컴포넌트
const View = styled.div`
display: flex;
flex-direction: column;
width: 500px;
padding: 24px;
border-radius: 12px;
background: #88888820;
`