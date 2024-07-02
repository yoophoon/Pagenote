import { ThemeOptions } from "@mui/material/styles/createTheme";

declare module '@mui/material/styles' {
  interface Theme {
    pagenote: {
      pagenoteEditor:{
        title:{
          height:number
        },
        tools:{
          height:number
        }
      }
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    pagenote?: {
      pagenoteEditor:{
        title:{
          height:number
        },
        tools:{
          height:number
        }
      }
    };
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    pagenoteH6: true;
  }
}


const pagenoteEditor={
  titleHeight:32,
  toolsHeight:36
}

export const pagenoteTheme:ThemeOptions = {
  components: {
    MuiDivider: {
      styleOverrides: {
        root: {
          margin: '0 !important',
        }
      }
    },
    MuiTypography:{
      variants:[{
        props:{variant:'pagenoteH6'},
        style: {
          fontFamily: "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
          fontSize: "1.25rem",
          fontWeight: 500,
          letterSpacing: "0.0075em",
          lineHeight: `${pagenoteEditor.titleHeight}px !important`,
          background: 'none',
          display:'block !important',
          width: '100%',
          height: `${pagenoteEditor.titleHeight}px !important`,
          float: 'none',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          margin: '0 !important'
        }
      }]
    }
  },
  
  pagenote: {
    pagenoteEditor: {
      title: {
        height: pagenoteEditor.titleHeight
      },
      tools: {
        height: pagenoteEditor.toolsHeight
      }
    }
  }
}