
import { useLiveQuery } from "dexie-react-hooks";
import pagenoteDB from '../lib/storeage/pagenoteDB'
import { useEffect, useState } from 'react'
import { CssBaseline, Typography, createTheme } from "@mui/material";
import { pagenoteTheme } from "../Theme"
import { getThemeMode } from "../lib/common"
import { ESiteTheme } from "../pagenoteTypes";
import { ThemeProvider } from "@emotion/react";
import SidepanelHead from "./Component/SidepanelHead";
import SidepanelCard from "./Component/SidepanelCard";

export default function SidePanel() {
  //获取当前活动标签url
  const [activeTab, setActiveTab] = useState('')

  //获取所有pagneote数据
  const pagenotes = useLiveQuery(() =>
    pagenoteDB.pagenote.toArray(),
    []
  )

  // 获取当前活动标签的siteConfig
  const siteConfig = useLiveQuery(() =>
    // pagenoteDB.sitesConfig.where('origin').equals(activeTab).toArray()
    pagenoteDB.sitesConfig.get(activeTab),
    [activeTab]
  )
  console.log('pagenotes...',pagenotes)
  console.log('siteConfig...', siteConfig)
  console.log('activeTab...', activeTab)
  console.log(siteConfig?.origin == activeTab)

  const theme = createTheme({
      palette: {
        mode: getThemeMode((siteConfig&&siteConfig.siteTheme)??ESiteTheme.dark)
      },
    },pagenoteTheme)

  console.log(theme)
  useEffect(() => {
    //打开页面时获取当前活动页
    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      if (tab.url) {
        setActiveTab(tab.url)
      }
    })
    //监听活动页变化
    chrome.tabs.onActivated.addListener(activeInfo => {
      chrome.tabs.get(activeInfo.tabId)
        .then(tab => {
          if (tab.url) {
            const activedTabUrl = new URL(tab.url)
            setActiveTab(activedTabUrl.origin + activedTabUrl.pathname)
          }
        })
    })
  }, [])

  const pagenotesOnCurrentSite = pagenotes?.filter(pagenote => pagenote.pagenoteTarget == activeTab)

  if (!pagenotes) return null
  return (<ThemeProvider theme={theme}>
    <CssBaseline />
    <SidepanelHead pagenotesOnCurrentSite={pagenotesOnCurrentSite} activeTab={activeTab} />
    {
      pagenotesOnCurrentSite && pagenotesOnCurrentSite.map(pagenote => (
        <SidepanelCard key={pagenote.pagenoteID} pagenote={pagenote}></SidepanelCard>
      ))
    }
  </ThemeProvider>)
}