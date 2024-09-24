import {  createContext, useCallback, useEffect, useMemo, useState } from 'react'
import './index.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import PagenoteAppBar from '../Components/PagenoteAppBar'
import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import { ESiteTheme, TExtensionConfig, ESection, TSiteConfig, EHighlightStyle } from '../pagenoteTypes'
import { pagenoteTheme } from '../Theme'
import SettingList from './SettingList'
import Setting from './Settings'
import { pagenoteShortcuts } from '../lib/common'
import pagenoteDB from '../lib/storeage/pagenoteDB'
import { useLiveQuery } from 'dexie-react-hooks'

type TOptionsContext={
  // extensionConfig:TSiteConfig,
  section:ESection,
  setSection:React.Dispatch<React.SetStateAction<ESection>>,
}

export const OptionsContext=createContext<TOptionsContext|null>(null)

export default function Options() {
  
  //获取所有pagneote数据
  const extensionConfigDB = useLiveQuery(() =>
    pagenoteDB.sitesConfig.where('origin').equals(window.location.origin).toArray()
  )

  const [section,setSection]=useState<ESection>(ESection.sidepanel)

  //----------------------------------------------------------------------------
  //监听扩展主题变化，因为要用到上下文状态dispatch所以没办法进行抽离
  // > hooks 必须定义在组件内部顶层作用域
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
        icon:chrome.runtime.getURL('favicon.ico'),
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

  if(!extensionConfigDB) return null

  return (
    <OptionsContext.Provider value={{section,setSection}}>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
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

