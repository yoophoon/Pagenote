import React, { useCallback, useEffect, useMemo, useState } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import IconPagenote from '../assets/svg/Note'
import { Box, CssBaseline, SvgIcon, ThemeProvider, Typography, createTheme } from '@mui/material'
import pagenoteDB from '../lib/storeage/pagenoteDB'
import { pagenoteTheme } from '../Theme'
import { EHighlightStyle, ESiteTheme } from '../pagenoteTypes'
import { pagenoteShortcuts } from '../lib/common'
import { useLiveQuery } from 'dexie-react-hooks'
import GitHubIcon from '@mui/icons-material/GitHub';
import {MaterialUi, SvgReact, Vite, DexieIcon, CrxjsIcon} from '../assets/svg'



ReactDOM.createRoot(document.getElementById('root')!).render(<Home />)


function Home() {
  const extensionConfigDB=useLiveQuery(()=>
    pagenoteDB.sitesConfig.where('origin').equals(window.location.origin).toArray()
  )
  const [extensionThemeMode,setExtensionThemeMode]=useState<'dark'|'light'>('dark')

  const themeMode = useMemo(() => (matchMedia('(prefers-color-scheme:dark)')), [])
  // const themeMode = matchMedia('(prefers-color-scheme:dark)')
  const setSystemDefaultTheme = useCallback(() => {
    themeMode.matches ?
      setExtensionThemeMode('dark')
      :
      setExtensionThemeMode('light')
  }, [])

  const theme=createTheme({
    palette:{
      mode:extensionThemeMode
    }
  },pagenoteTheme)


  useEffect(()=>{
    console.log(extensionConfigDB)
    if(extensionConfigDB&&extensionConfigDB.length==0){
      pagenoteDB.sitesConfig.put({
        origin:window.location.origin,
        title:'轻松给网页留下你的笔记',
        siteTheme:ESiteTheme.dark,
        showPagenote:true,
        showEditorTools:false,
        showEditorTitle:true,
        showPositionBar:false,
        onThisSite:false,
        shortcutsOn:true,
        shortcuts:pagenoteShortcuts,
        highLightStyle:EHighlightStyle.bg,
        openSidepanel:false,
      }).catch(function (e) {
        console.error(e);
    })
    }else if(extensionConfigDB&&extensionConfigDB.length==1){
      if(extensionConfigDB[0].siteTheme==ESiteTheme.systemDefault){
        setSystemDefaultTheme()
        themeMode.addEventListener("change",setSystemDefaultTheme)
      }else {
        extensionConfigDB[0].siteTheme==ESiteTheme.dark&&setExtensionThemeMode('dark')
        extensionConfigDB[0].siteTheme==ESiteTheme.light&&setExtensionThemeMode('light')
        themeMode.removeEventListener('change',setSystemDefaultTheme)
      }
    }
  },[extensionConfigDB])

  const IconPagenoteStyled=(<IconPagenote
    width='6rem'
    height='6rem'
    fileContent={theme.palette.text.secondary}
    fileShadow={theme.palette.primary.main}
    cardColor={theme.palette.info.main}
    dogEarColor={theme.palette.success.main}
    plusSymbolColor={theme.palette.error.main}
    oSymbolColor={theme.palette.warning.main}
    style={{
      marginRight: '0.5rem',
    }}
  />)

  if(!extensionConfigDB || extensionConfigDB.length==0) return null
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: '30vh',
        flexDirection: 'column',
        gap: 5,
      }}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2,
        }}>
          {IconPagenoteStyled}
          <Box>
            <Typography sx={{ fontSize: '4rem', lineHeight: '4.5rem' }}>pagenote</Typography>
            <Typography sx={{ fontSize: '1.74rem', lineHeight: '2.74rem' }}>easy to note the page</Typography>
          </Box>
        </Box>
        <Box className='container' sx={{
          width: '392px',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
        }}>
          <Box className='slide' sx={{
            '& > svg': {
              width: '2rem',
              height: '2rem',
              margin: '0 1rem 0'
            }
          }}>
            <GitHubIcon />
            <SvgReact />
            <MaterialUi />
            <DexieIcon />
            <Vite />
            <CrxjsIcon />
            <GitHubIcon />
            <SvgReact />
            <MaterialUi />
            <DexieIcon />
            <Vite />
            <CrxjsIcon />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>)
}

