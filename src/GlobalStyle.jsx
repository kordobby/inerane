import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle `
* {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
body {
    background-color: #ffffff;
    width : 100%;
    height : 100vh;
    box-sizing: border-box;
}
:root {
    --purple: #9667e0;
    --purple-1 : #d4bbfc;
    --purple-2 : #ebd9fc;
    --purple-3 : #f2ebfb;
    --purple-4 : #fbfaff;
  }
`

export default GlobalStyle;