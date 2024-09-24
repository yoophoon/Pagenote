import { Box, CssBaseline, Divider, ThemeProvider, Typography, createTheme } from "@mui/material";
import PagenoteAppBar from "../Components/PagenoteAppBar";
import { useLiveQuery } from "dexie-react-hooks";
import pagenoteDB from "../lib/storeage/pagenoteDB";
import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { pagenoteTheme } from "../Theme";
import { EHighlightStyle, ESiteTheme } from "../pagenoteTypes";
import { pagenoteShortcuts } from "../lib/common";

import PagenotesItem from "./PagenotesItem";

export default function PagenotesList(){
  //获取所有pagneote数据
  const extensionConfigDB = useLiveQuery(() =>
    pagenoteDB.sitesConfig.where('origin').equals(window.location.origin).toArray()
  )
  
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

  //----------------------------------------------------------------------------
  //处理所有网页的pagenote
  //
  const pagenotes = useLiveQuery(() =>
    pagenoteDB.pagenote.toArray()
  )



  const [sitesWithPagenotes,setSitesWithPagenotes]=useState<{origin:string,title:string,icon:string ,num:number,folder:boolean}[]>([])

  
  const pagenoteLengthRef=useRef<number>(pagenotes?.length??0)
  useEffect(() => {
    //TODO sitesWithPagenotes.num 无法正常更新
    if (pagenotes && pagenotes.length > 0&&pagenoteLengthRef.current!==pagenotes?.length) {
      pagenotes.forEach(pagenote => {
        pagenoteDB.sitesConfig.get(pagenote.pagenoteTarget).then(res => {
          if (res) {
            setSitesWithPagenotes(sitesWithPagenotes => {
              if (sitesWithPagenotes.filter(site => site.origin === pagenote.pagenoteTarget).length === 0) {
                return [...sitesWithPagenotes, { origin: pagenote.pagenoteTarget, title: res.title, icon: res.icon, num: pagenotes.filter(pagenoteF => pagenoteF.pagenoteTarget === pagenote.pagenoteTarget).length, folder: false }]
              }
              //需要更新num属性
              return [...sitesWithPagenotes.filter(site=>site.origin!==pagenote.pagenoteTarget),{...sitesWithPagenotes.filter(site=>site.origin===pagenote.pagenoteTarget)[0],num: pagenotes.filter(pagenoteF => pagenoteF.pagenoteTarget === pagenote.pagenoteTarget).length}]
            })
          } else {
            setSitesWithPagenotes(sitesWithPagenotes => {
              if (sitesWithPagenotes.filter(site => site.origin === pagenote.pagenoteTarget).length === 0) {
                return [...sitesWithPagenotes, { origin: pagenote.pagenoteTarget, title: '', icon: '', num: pagenotes.filter(pagenoteF => pagenoteF.pagenoteTarget === pagenote.pagenoteTarget).length, folder: false }]
              }
              //需要更新num属性
              return [...sitesWithPagenotes.filter(site=>site.origin!==pagenote.pagenoteTarget),{...sitesWithPagenotes.filter(site=>site.origin===pagenote.pagenoteTarget)[0],num: pagenotes.filter(pagenoteF => pagenoteF.pagenoteTarget === pagenote.pagenoteTarget).length}]
            })
          }
        })
      })
      pagenoteLengthRef.current=pagenotes.length
    }

  }, [pagenotes])

  console.log(sitesWithPagenotes)

  //----------------------------------------------------------------------------
  //页面逻辑
  //
  const handlerSetFolder = (origin: string) => {
    setSitesWithPagenotes(sitesWithPagenotes => {
      return sitesWithPagenotes.map(site => {
        if (site.origin === origin) {
          return {...site,folder:!site.folder}
        }
        return site
      })
    })
  }



  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <PagenoteAppBar page='list' />
      {/* TODO:搜索框 笔记排序:时间 位置 */}

      {/* <Box
        display='flex'
        justifyContent='right'
        sx={{
          justifyContent: { xs: 'center', lg: 'right' },
          // [`theme.breakpoints.down('lg')`]: {
          //   justifyContent: 'center',
          // }
        }}
      >
        hello
      </Box> */}
      <Box sx={{
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        '& > *': {
          width: '70vw',
          minWidth: '1000px',
        }
      }}>
        {
          (pagenotes && pagenotes.length > 0) ?
            sitesWithPagenotes.map(site => (
              <Fragment key={site.origin}>
                <Box sx={{
                  margin: '2rem',
                  marginBottom: '0',
                  padding: '1rem',
                  paddingBottom: '0.5rem',
                  backgroundColor: theme.palette.primary.main+'99',
                  borderRadius: '5px',
                  position: 'relative',
                }}>
                  <Typography dangerouslySetInnerHTML={{ __html: site.title }} sx={{
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                  }} />
                  <Typography component={'a'} href={site.origin} target="_blank" title="跳转至该网页" sx={{
                    color: 'unset',
                    textDecoration: 'none',
                    verticalAlign: 'bottom',
                    fontSize: '1.1rem',
                    height:'1.1rem',
                    lineHeight: '1.1rem',
                  }}>
                    <img src={site.icon} style={{
                      width: '1.1rem',
                      height: '1.1rem',
                      marginRight: '0.5rem',
                      verticalAlign: 'bottom',
                    }}></img>
                    {site.origin}
                  </Typography>
                  <Typography title='单击可折叠或展开该网页的笔记列表'
                    sx={{
                      position: 'absolute',
                      right: '2rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      paddingLeft: '0.5rem',
                      paddingRight: '0.5rem',
                      width: 'fit-content',
                      height: '2rem',
                      fontSize: '1.2rem',
                      lineHeight: '2rem',
                      textAlign: 'center',
                      backgroundColor: theme.palette.error.main,
                      borderRadius: '6px',
                      cursor: 'pointer',
                      userSelect:'none',
                    }}
                    onClick={()=>handlerSetFolder(site.origin)}
                  >
                    {site.num}
                  </Typography>
                </Box>
                {!site.folder&&pagenotes.filter(pagenote => pagenote.pagenoteTarget === site.origin).map(pagenote => (
                  <PagenotesItem key={pagenote.pagenoteID} pagenote={pagenote}></PagenotesItem>  
                )
                )}
              </Fragment>
            )) :
            null
        }
      </Box>
    </ThemeProvider>
  )
}