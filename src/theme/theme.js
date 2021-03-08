import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    // COLORS
    --pink: #FA34F3;
    --pink-2: #e033da;
    --pink-3: #c12dbc;
    --purple: #7217f4;
    --purple-2: #5413b1;
    --purple-3: #460f94;
    --lavender: #c462e8;
    --lavender-2: #aa4fcc;
    --red: #de2f2f;
    --red-2: #bf2b2b;

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

  // ag-grid styles
  .ag-theme-alpine {
    .ag-root-wrapper {
      border: none;
      border-radius: var(--border-radius);
      box-shadow: var(--box-shadow);
    }
    .ag-header {
      background: var(--purple-2);
      border-bottom-color: var(--purple-3);

      .ag-header-row {
        color: white;
      }
    }
    .ag-body-viewport {
      background: var(--purple-2);

      .ag-row {
        background: var(--purple-2);
        border-bottom-color: var(--purple-3);
        color: white;

        &:nth-child(even) {
          background: var(--purple-3);
        }
        &:hover {
          background: var(--purple-3);
        }
      }
    }
    .ag-body-horizontal-scroll {
      background: var(--purple-2);
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
      background: var(--purple-2);
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