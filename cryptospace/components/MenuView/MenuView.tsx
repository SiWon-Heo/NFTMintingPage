import styled from "@emotion/styled";
import React, {HTMLAttributes}  from "react";

export const MenuView = ({children, ...props}:HTMLAttributes<HTMLDivElement>) =>{
  return(
    <View {...props} >
      {children}
    </View>
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