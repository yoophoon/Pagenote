
import { useLiveQuery } from "dexie-react-hooks";
import pagenoteDB from '../lib/storeage/pagenoteDB'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { CssBaseline, Typography, createTheme } from "@mui/material";
import { pagenoteTheme } from "../Theme"
import { EPagenoteOrder, ESiteTheme } from "../pagenoteTypes";
import { ThemeProvider } from "@emotion/react";
import SidepanelHead from "./Component/SidepanelHead";
import SidepanelCard from "./Component/SidepanelCard";

export default function SidePanel() {
  //获取当前活动标签url
  const [activeTab, setActiveTab] = useState('')

  const [order,setOrder]=useState<EPagenoteOrder>(EPagenoteOrder.creation)

  //获取所有pagneote数据
  const pagenotes = useLiveQuery(() =>
    pagenoteDB.pagenote.toArray(),
    []
  )

  // 获取当前活动标签的siteConfig
  const siteConfig = useLiveQuery(() =>
    // pagenoteDB.sitesConfig.where('origin').equals(activeTab).toArray()
    pagenoteDB.sitesConfig.where('origin').equals(activeTab).toArray(),
    [activeTab]
  )
  console.log('pagenotes...',pagenotes)
  console.log('siteConfig...', siteConfig)
  console.log('activeTab...', activeTab)
  // console.log(siteConfig&&siteConfig[0].origin == activeTab)

  
  const [siteThemeMode,setSiteThemeMode]=useState<'dark'|'light'>('dark')

  const themeMode = useMemo(() => (matchMedia('(prefers-color-scheme:dark)')), [])
  // const themeMode = matchMedia('(prefers-color-scheme:dark)')
  const setSystemDefaultTheme = useCallback(() => {
    themeMode.matches ?
      setSiteThemeMode('dark')
      :
      setSiteThemeMode('light')
  }, [])

  useEffect(()=>{
    if(siteConfig&&siteConfig.length!==0&&siteConfig[0].siteTheme==ESiteTheme.systemDefault){
      setSystemDefaultTheme()
      themeMode.addEventListener("change",setSystemDefaultTheme)
    }else {
      siteConfig&&siteConfig.length!==0&&siteConfig[0].siteTheme==ESiteTheme.dark&&setSiteThemeMode('dark')
      siteConfig&&siteConfig.length!==0&&siteConfig[0].siteTheme==ESiteTheme.light&&setSiteThemeMode('light')
      themeMode.removeEventListener('change',setSystemDefaultTheme)
    }
  },[siteConfig&&siteConfig.length!==0&&siteConfig[0]])


  //TODO not available now
  //[sidePanel does not automatically open](https://github.com/GoogleChrome/chrome-extensions-samples/issues/982)
  //监听如果有页面的siteconfig的openSidepanel为false的话则关闭saidepanel
  // useEffect(()=>{
  //   console.log('siteconfig for window.close()',siteConfig)
  //   if(siteConfig&&siteConfig.length==0||siteConfig&&siteConfig[0].openSidepanel==false){
  //     window.close()
  //   }
  // },[siteConfig&&siteConfig.length!==0&&siteConfig[0].openSidepanel])

  useEffect(()=>{
    console.log('加载window.addEventListener')
    const updateSidepanelStatus=()=>{
      console.log('sidepanel closedddd...')
      localStorage.setItem('closedSidepanel',JSON.stringify({origin:activeTab}))
    }

    window.addEventListener('unload',updateSidepanelStatus)
    
    return ()=>{
      console.log('卸载window.addEventListener')
      window.removeEventListener('unload',updateSidepanelStatus)
    }
  },[activeTab])


  const theme = createTheme({
      palette: {
        mode: siteThemeMode
      },
    },pagenoteTheme)

  console.log(theme)
  useEffect(() => {
    //打开页面时获取当前活动页
    chrome.tabs.query({ active:true,}, ([tab]) => {
      console.log('currentWindow...',tab)
      if (tab.url) {
        const activedTabUrl = new URL(tab.url)
        if(activedTabUrl.origin==chrome.runtime.getURL('')){
          setActiveTab(activedTabUrl.origin)
        }else{
          setActiveTab(activedTabUrl.origin + activedTabUrl.pathname)
        }
      }
    })
    //监听活动页变化
    chrome.tabs.onActivated.addListener(activeInfo => {
      console.log('activeInfo...',activeInfo)
      chrome.tabs.get(activeInfo.tabId)
        .then(tab => {
          console.log('activeInfoTab...',tab)
          console.log(tab)
          if (tab.url) {
            console.log('activeInfoTab.url...',tab)
            const activedTabUrl = new URL(tab.url)
            console.log('actived taburl...',activedTabUrl)
            if(activedTabUrl.origin==chrome.runtime.getURL('')){
              setActiveTab(activedTabUrl.origin)
            }else{
              setActiveTab(activedTabUrl.origin + activedTabUrl.pathname)
            }
          }else if(tab.pendingUrl){
            const activedTabUrl = new URL(tab.pendingUrl)
            if(activedTabUrl.origin==chrome.runtime.getURL('')){
              setActiveTab(activedTabUrl.origin)
            }else{
              setActiveTab(activedTabUrl.origin + activedTabUrl.pathname)
            }
          }else {
            setActiveTab('something wrong while getting the url')
          }
        })
    })

    
  }, [])

  const pagenotesOnCurrentSite = pagenotes?.filter(pagenote => pagenote.pagenoteTarget == activeTab)

  if (!pagenotes ||!siteConfig || siteConfig.length==0) return (<div style={{fontWeight:'bold'}}>NOT AVAILABLE ON CURRENT PAGE</div>)
  return (<ThemeProvider theme={theme}>
    <CssBaseline />
    <SidepanelHead pagenotesOnCurrentSite={pagenotesOnCurrentSite} activeTab={activeTab} setPagenoteOrder={setOrder}/>
    {
      pagenotesOnCurrentSite && pagenotesOnCurrentSite.sort((pagenoteA,pagenoteB)=>{
        if(order==EPagenoteOrder.modification){
          return pagenoteA.pagenoteTimestamp-pagenoteB.pagenoteTimestamp
        }else if(order==EPagenoteOrder.position){
          return pagenoteA.pagenoteIndex-pagenoteB.pagenoteIndex
        }
        return pagenoteA.pagenoteID-pagenoteB.pagenoteID
      }).map(pagenote => (
        <SidepanelCard key={pagenote.pagenoteID} pagenote={pagenote}></SidepanelCard>
      ))
    }
  </ThemeProvider>)
}