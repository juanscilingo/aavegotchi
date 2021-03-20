import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    // COLORS
    --primary: #7217f4;
    --primary-2: #5413b1;
    --primary-3: #460f94;
    --secondary: #6b62ff;
    --secondary-2: #6058e8;
    --red: #cc4444;
    --black: #1e1e1e;
    --black-2: #373737;
    --purple: #aa2de8;
    --orange: #ffa502; 


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
    background: #7217f4;
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

  // ag-grid styles
  .ag-theme-alpine {
    .ag-root-wrapper {
      border: none;
      border-radius: var(--border-radius);
      box-shadow: var(--box-shadow);
    }
    .ag-header {
      background: var(--primary-2);
      border-bottom-color: var(--primary-3);

      .ag-header-row {
        color: white;
      }
    }
    .ag-body-viewport {
      background: var(--primary-2);

      .ag-row {
        background: var(--primary-2);
        border-bottom-color: var(--primary-3);
        color: white;

        &:nth-child(even) {
          background: var(--primary-3);
        }
        &:hover {
          background: var(--primary-3);
        }
      }
    }
    .ag-body-horizontal-scroll {
      background: var(--primary-2);
    }
    .ag-icon {
      color: white;

      &.ag-icon-menu {
        &:hover {
          color: lightgray;
        }
      }
    }
    .ag-paging-panel {
      background: var(--primary-2);
      border: none;
      color: white;
    }
    .ag-cell-value {
      cursor: text;
    }
    .ag-disabled {
      .ag-icon {
        color: gray;
      }
    }
  }
`