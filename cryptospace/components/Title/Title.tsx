import styled from "@emotion/styled";
import React, {HTMLAttributes}  from "react";

export const Title = ({children, ...props}:HTMLAttributes<HTMLDivElement>) =>{
  return(
    <TitleText {...props} >
      {children}
    </TitleText>
  ) 
}

//styled 컴포넌트
const TitleText = styled.div`
margin-bottom: 24px;
color: #eee;
font-size: 23px;
text-align: center;
`