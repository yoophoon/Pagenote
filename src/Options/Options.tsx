import {  createContext, useState } from 'react'
import './index.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import PagenoteAppBar from '../Components/PagenoteAppBar'
import { Box, ThemeProvider, createTheme } from '@mui/material'
import { ESiteTheme, TExtensionConfig, ESection } from '../pagenoteTypes'
import { getThemeMode } from "../lib/common"
import { pagenoteTheme } from '../Theme'
import SettingList from './SettingList'
import Setting from './Settings'

type TOptionsContext={
  extensionConfig:TExtensionConfig,
  setExtensionConfig:React.Dispatch<React.SetStateAction<TExtensionConfig>>,
  section:ESection,
  setSection:React.Dispatch<React.SetStateAction<ESection>>,
}

export const OptionsContext=createContext<TOptionsContext|null>(null)

export default function Options() {
  
  const [extensionConfig,setExtensionConfig]=useState<TExtensionConfig>({
    extensionTheme:ESiteTheme.dark
  })

  const [section,setSection]=useState<ESection>(ESection.sidepanel)

  const theme=createTheme({
    palette:{
      mode:getThemeMode(extensionConfig.extensionTheme)
    }
  },pagenoteTheme)

  return (
    <OptionsContext.Provider value={{extensionConfig,setExtensionConfig,section,setSection}}>
      <ThemeProvider theme={theme}>
        <PagenoteAppBar page='options' />
        <Box
          display='flex'
          justifyContent='right'
          sx={{
            justifyContent: { xs: 'center', lg: 'right' },
            // [`theme.breakpoints.down('lg')`]: {
            //   justifyContent: 'center',
            // }
          }}
        >
          <div>
            <SettingList section={section}></SettingList>
          </div>
          <Setting></Setting>
        </Box>
      </ThemeProvider>
    </OptionsContext.Provider>
  )
}

