import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    // COLORS
    --pink: #FA34F3;
    --pink-2: #e033da;
    --purple: #7217f4;
    --purple-2: #5413b1;
    --lavender: #c462e8;
    --lavender-2: #aa4fcc;

    /* ELEMENTS */
    --placeholder-color: #b1afaf;
    
    /* LAYOUT */
    --navbar-height: 70px;

    /* BORDERS */
    --border-radius: 8px;
    --box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
  }

  body {
    margin: 0px;
    background: var(--purple);
    color: white;
  }

  * {
    font-family: Inter, sans-serif;
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
    color: white;

    &:hover {
      color: lightgray;
    }
  }
`