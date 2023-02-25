import styled from "@emotion/styled";
import React, { HTMLAttributes } from "react";

export const MenuView = ({
	children,
	...props
}: HTMLAttributes<HTMLDivElement>) => {
	return <View {...props}>{children}</View>;
};

const View = styled.div`
	padding: 24px;
	border-radius: 12px;
	background: #88888820;
	display: flex;
	flex-direction: column;
	width: 500px;
`;

// export default MenuView;
