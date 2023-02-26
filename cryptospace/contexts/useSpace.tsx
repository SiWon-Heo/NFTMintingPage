import { createContext, ReactNode, useState } from "react";
import { PlanetName } from "../components/Planet";

interface ISpaceContext {
  planet: PlanetName;
  showPlanet:(planet:PlanetName) =>void;
  clearPlanet: ()=>void
}

export const SpaceContext = createContext<ISpaceContext>({
  //인자는 context가 제공 안되였을때 기본 값인데,  여기서는 context가 제공 될때만 사용하므로 의미 없으므로 초기값만 세팅
  planet: null,
  showPlanet:() =>{},
  clearPlanet: ()=>{}
})

export const SpaceContextProvide = ({children}: {children:ReactNode}) =>{
  const [planet, setPlanet] = useState<PlanetName>(null)

  return <SpaceContext.Provider value ={{
    planet, 
    showPlanet: (planet: PlanetName)=> setPlanet(planet), 
    clearPlanet:() =>setPlanet(null),
  }}>{children}</SpaceContext.Provider>
}