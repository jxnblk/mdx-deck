import React from 'react';
import { ThemeProvider } from 'emotion-theming'


//adding a hotpink theme using emotion-theming

const theme = {
  colors: {
    primary: 'hotpink'
  }
}

class HotPink extends React.Component {
 render() {
     return(
        <ThemeProvider theme={theme}>
            <div css={theme => ({ color: theme.colors.primary })}>
            some other text
            </div>
        </ThemeProvider>
     );
 }    
}

export default HotPink;