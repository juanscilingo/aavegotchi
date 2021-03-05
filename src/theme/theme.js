import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    --pink: #FA34F3;
    --pink-2: #e033da;
    --purple: #7217f4;
    --purple-2: #5413b1;


    --blue: #4467a0;
    --dark-blue: #36507b;
    --midnight: #262c3c;
    --midnight-2: #1c212d;
    --midnight-3: #11141b;
    --green: #27ae60;
    --red: #e74c3c;

    --navbar-height: 70px;
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