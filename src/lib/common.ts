import { ESiteTheme } from "../pagenoteTypes"


export function getThemeMode(mode:ESiteTheme){
    if(mode==ESiteTheme.dark){
      return 'dark'
    }else if(mode==ESiteTheme.light){
      return 'light'
    }else if(mode==ESiteTheme.systemDefault){
      const themeMode=matchMedia('(prefers-color-scheme:dark)')
      return themeMode.matches?'dark':'light'
    }
  }