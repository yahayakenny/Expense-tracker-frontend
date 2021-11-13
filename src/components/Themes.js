import { createGlobalStyle } from "styled-components";
export const lightTheme = {
    body: '	#FFFFFF',
    fontColor: 'black'
}

export const darkTheme = {
    body: 'black',
    fontColor: '#FFFFFF'
}

export const GlobalStyles = createGlobalStyle`
	body {
		background-color: ${(props) => props.theme.body};
	}
`;