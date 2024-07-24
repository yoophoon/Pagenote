import { createContext, useCallback, useEffect, useMemo, useRef, useState } from "react"
// import { createPortal } from "react-dom"
// import { PagenoteGeneration } from "./PagenoteTools/pagenoteFragment/pagenoteGeneration"
import { TPagenote, EOperation, TContentPagenote, TSetContentPagenotes, TSiteConfig, ESiteTheme, EHighlightStyle} from "../pagenoteTypes"
import PagenoteIcon from "./PagenoteTools/PagenoteIcon"
import RegistMessageListener from "./RegistMessageListener"
import SiteConfig from "./SiteConfig/index"
import {  ScopedCssBaseline, createTheme } from "@mui/material"
import { pagenoteTheme } from "../Theme"


type TSiteConfigContext={
    siteConfig:TSiteConfig,
    setSiteConfig:React.Dispatch<React.SetStateAction<TSiteConfig>>
}

export const SiteConfigContext=createContext<TSiteConfigContext|null>(null)

export default function ContentPagenotes() 
{
  

    const [pagenotesInfo, setPagenotesInfo] = useState<TContentPagenote[]>([])
    const [siteConfig, setSiteConfig]=useState<TSiteConfig>({
        origin:window.location.origin+window.location.pathname,
        title:document.querySelector('title')?.innerHTML??'',
        siteTheme:ESiteTheme.dark,
        showPagenote:false,
        showPositionBar:false,
        showEditorTitle:true,
        showEditorTools:true,
        onThisSite:true,
        shortcutsOn:true,
        shortcuts:[],
        highLightStyle:EHighlightStyle.bg,
        openSidepanel:false,
    })
    const previoutSiteCOnfig=useRef(siteConfig)
    const [siteThemeMode,setSiteThemeMode]=useState<'dark'|'light'>('dark')

  const theme = createTheme({
    palette: {
      mode: siteThemeMode
    },
  },pagenoteTheme)
    console.log('pagenoteTheme...',theme)


  useEffect(() => {
    //处理页面第一次加载，从后台获取数据
    initPagenotes(setPagenotesInfo)
    RegistMessageListener(setPagenotesInfo)
    //处理页面选中事件
    document.body.onmouseup = (e) => {
      console.log(e)
      if (e.button == 0 && siteConfig.onThisSite) {
        e.preventDefault()
        e.stopPropagation()
        handlerContentMouseup(setPagenotesInfo)
      }
    }

    //请求页面配置
    chrome.runtime.sendMessage({
      operation: EOperation.getSiteConfig,
      value: {
        origin: window.location.origin + window.location.pathname,
        title:document.querySelector('title')?.innerHTML??'',
      }
    }, response => {
      console.log('EOperation.getSiteConfig...', response)
      if (response) {
        setSiteConfig(response)
      }
    })

  }, [])

    const themeMode=useMemo(()=>(matchMedia('(prefers-color-scheme:dark)')),[])
    // const themeMode = matchMedia('(prefers-color-scheme:dark)')
    const setSystemDefaultTheme=useCallback(()=>{
      themeMode.matches?
      setSiteThemeMode('dark')
      :
      setSiteThemeMode('light')
    },[])
    /**
     * 更新siteConfig的相关功能设置
     */
    useEffect(()=>{
        //监听siteConfig.onThisSite,设置是否禁用在当前页生成pagenote功能
        if(siteConfig.onThisSite==false){
            document.body.onmouseup=null
        }else{
            document.body.onmouseup=(e)=>{
                if(e.button==0&&siteConfig.onThisSite){
                    e.preventDefault()
                    e.stopPropagation()
                    
                    if(e.target instanceof HTMLElement && !e.target.getAttribute('data-pagenoteid')){
                      handlerContentMouseup(setPagenotesInfo)
                    }
                }
            }
        }

      

      //监听siteConfig.showEditorTitle和siteConfig.showEditorTools,设置editor是否显示标题和工具栏
      if (siteConfig.showEditorTitle != previoutSiteCOnfig.current.showEditorTitle ||
        siteConfig.showEditorTools != previoutSiteCOnfig.current.showEditorTools) {
        setPagenotesInfo(pagenotesInfo => {
          return pagenotesInfo.map(pagenoteInfo => {
            if (pagenoteInfo) {
              return {
                ...pagenoteInfo,
                contentPagenote: {
                  ...pagenoteInfo.contentPagenote,
                  showEditorTitle: siteConfig.showEditorTitle,
                  showEditorTools: siteConfig.showEditorTools,
                }
              }
            }
            return
          })
        })
      }
      
      if(siteConfig.siteTheme==ESiteTheme.systemDefault){
        setSystemDefaultTheme()
        themeMode.addEventListener("change",setSystemDefaultTheme)
      }else {
        siteConfig.siteTheme==ESiteTheme.dark&&setSiteThemeMode('dark')
        siteConfig.siteTheme==ESiteTheme.light&&setSiteThemeMode('light')
        themeMode.removeEventListener('change',setSystemDefaultTheme)
      }
      previoutSiteCOnfig.current=siteConfig
    },[siteConfig])

    console.log(pagenotesInfo)
  return (
      <ThemeProvider theme={theme}>
        <ScopedCssBaseline sx={{width:0,height:0}}>
          {pagenotesInfo.map((pagenoteInfo) => {
            if (pagenoteInfo 
              //&& pagenoteInfo.pagenoteIcon
            ) {
              return (
                <PagenoteIcon
                  key={pagenoteInfo.contentPagenote.pagenoteID}
                  contentPagenote={pagenoteInfo.contentPagenote}
                  setAllPagenotesInfo={setPagenotesInfo}
                />
              )
            }
            // else if(pagenoteInfo&&!pagenoteInfo.pagenoteIcon){
            //   console.log('pagenoteIcon 不存在',pagenoteInfo)
            //   return
            // }
          })}
          {/* {console.log(pagenotesInfo.map((pagenoteInfo) => {
            if (pagenoteInfo && pagenoteInfo.pagenoteIcon) {
                return (
                    <PagenoteIcon
                        key={pagenoteInfo.contentPagenote.pagenoteID}
                        contentPagenote={pagenoteInfo.contentPagenote}
                        setAllPagenotesInfo={setPagenotesInfo}
                    />
                )
            }
        }))} */}
          <SiteConfigContext.Provider value={{ siteConfig, setSiteConfig }}>
            <SiteConfig />
          </SiteConfigContext.Provider>
        </ScopedCssBaseline>
      </ThemeProvider>)
}

/*******************************************************************************
 * init
 */


function initPagenotes(setPagenoteIcons: React.Dispatch<React.SetStateAction<TContentPagenote[]>>) {
    chrome.runtime.sendMessage({
        operation: EOperation.getPagenotes,
        value: {
            origin: window.location.origin + window.location.pathname
        }
    }, (response) => {
        if (response == undefined || response.length == 0) return
        console.log(response)
        setPagenoteIcons(response.map(function (contentPagenote: TPagenote): TContentPagenote {
            if (contentPagenote.pagenoteFragment) {
                const pagenoteEles = getPagenoteFragmentEleAnchor(contentPagenote.pagenoteFragment)
                if (pagenoteEles == undefined) {
                  console.log('missAnchor...',contentPagenote)
                  chrome.runtime.sendMessage({operation:EOperation.missAnchor,value:{
                    origin:contentPagenote.pagenoteTarget,
                    pagenoteID:contentPagenote.pagenoteID,
                  }})
                  return {contentPagenote}
                }
                pagenoteEles.forEach(pagenoteEle => pagenoteEle.setAttribute('data-pagenoteid', contentPagenote.pagenoteID.toString()))
                const pagenoteIcon = document.createElement('pagenoteIcon')
                pagenoteIcon.setAttribute('data-pagenoteid', contentPagenote.pagenoteID.toString())
                pagenoteIcon.style.position='relative'
                // pagenoteIcon.innerHTML='&emsp;'
                pagenoteIcon.draggable = false
                pagenoteIcon.onclick = e => {
                    // e.stopPropagation();
                    e.preventDefault()
                }
                pagenoteIcon.ondrop = e => {
                    e.preventDefault()
                    e.stopPropagation()
                }

                pagenoteIcon.onmouseup = e => {
                    e.preventDefault()
                    e.stopPropagation()
                }
                //调整位置
                pagenoteEles[pagenoteEles.length - 1].parentNode?.insertBefore(pagenoteIcon, pagenoteEles[pagenoteEles.length - 1])
                pagenoteEles[pagenoteEles.length - 1].parentNode?.insertBefore(pagenoteEles[pagenoteEles.length - 1], pagenoteIcon)

                return { pagenoteIcon, contentPagenote }
            }
            return { contentPagenote }
        })
        )
        // const pagenoteIcons = presentPagenotes(response.pagenotes)
        // setPagenoteIcons(pagenoteIcons)
    })
}

// function presentPagenotes(contentPagenotes: TPagenote[])
// {
//     return contentPagenotes.map(contentPagenote => {
//         //如果pagenoteFragment不存在，说明这个contentPagenote是与网页内容无关的附加笔记
//         if (contentPagenote.pagenoteFragment == undefined) return 
//         //开始处理页面内的pagenote
//         const pagenoteGeneration = new PagenoteGeneration()
//         const pagenoteNodes = pagenoteGeneration.getPagenoteNodes(contentPagenote.pagenoteFragment)
//         //获取pagenoteFragment对应的元素
//         const pagenoteEles = pagenoteGeneration.setPagenote(pagenoteNodes)
//         //设置pagenoteFragment对应元素的pagenoteid属性
//         pagenoteEles.forEach(pagenoteEle => pagenoteEle.setAttribute('pagenoteid', contentPagenote.pagenoteID.toString()))
//         //添加末尾的图标
//         const pagenoteIcon = document.createElement('pagenoteicon')
//         pagenoteIcon.setAttribute('pagenoteid', contentPagenote.pagenoteID.toString())
//         pagenoteEles[pagenoteEles.length - 1].parentElement?.insertBefore(pagenoteIcon, pagenoteEles[pagenoteEles.length - 1])
//         pagenoteEles[pagenoteEles.length - 1].parentElement?.insertBefore(pagenoteEles[pagenoteEles.length - 1], pagenoteIcon)
//         return {pagenoteIcon,contentPagenote}
//     })
// }



/*******************************************************************************
 * save
 */
import tryToGeneratePagenote , { getPagenoteFragmentEleAnchor, selectEles } from "./PagenoteTools/pagenoteFragment"
import { ThemeProvider } from "@emotion/react"


function handlerContentMouseup(setPagenotesInfo: TSetContentPagenotes)
{
    const result = tryToGeneratePagenote()
    if (result == undefined) {
        return
    }
    const { pagenoteEles, contentPagenote } = result
    pagenoteEles.forEach(pagenoteEle=>pagenoteEle.setAttribute('data-pagenoteid',contentPagenote.pagenoteID.toString()))
    const pagenoteIcon=document.createElement('pagenoteIcon')
    pagenoteIcon.setAttribute('data-pagenoteid',contentPagenote.pagenoteID.toString())
    pagenoteIcon.style.position='relative'
    // pagenoteIcon.innerHTML='&emsp;'
    pagenoteIcon.draggable=false
    pagenoteIcon.onclick=e=>{
        // e.stopPropagation();
        e.preventDefault()
    }
    pagenoteIcon.ondrop=e=>{
        e.preventDefault()
        e.stopPropagation()
    }
    
    pagenoteIcon.onmouseup=e=>{
        e.preventDefault()
        e.stopPropagation()
    }
    //调整位置
    pagenoteEles[pagenoteEles.length - 1].parentNode?.insertBefore(pagenoteIcon, pagenoteEles[pagenoteEles.length - 1])
    pagenoteEles[pagenoteEles.length - 1].parentNode?.insertBefore(pagenoteEles[pagenoteEles.length - 1], pagenoteIcon)
    

    setPagenotesInfo(pagenotesInfo => {
        //检查选中的内容是否已经在之前生成过pagenoe
        for (let i = 0; i < pagenotesInfo.length; i++) {
          const initContent = pagenotesInfo[i]?.contentPagenote.pagenoteFragment?.prefix ?? '' +
                              pagenotesInfo[i]?.contentPagenote.pagenoteFragment?.textStart ?? '' +
                              pagenotesInfo[i]?.contentPagenote.pagenoteFragment?.textEnd ?? '' +
                              pagenotesInfo[i]?.contentPagenote.pagenoteFragment?.suffix ?? ''
            if (initContent == contentPagenote.pagenoteContent) {
                pagenoteEles.forEach(pagenoteEle => pagenoteEle.outerHTML = pagenoteEle.innerHTML)
                pagenoteIcon.remove()
                selectEles(Array.from(document.querySelectorAll(`pagenoteanchor[data-pagenoteid="${pagenotesInfo[i]?.contentPagenote.pagenoteID}"]`)))
                return pagenotesInfo
            }
        }
        console.log('contentPagenote...',contentPagenote)
        console.log('pagenoteEles...',pagenoteEles)
        selectEles(Array.from(document.querySelectorAll(`pagenoteanchor[data-pagenoteid="${contentPagenote.pagenoteID}"]`)))
        return [...pagenotesInfo, {
            pagenoteIcon,
            contentPagenote: {
                ...contentPagenote,
                showTools:true,
                showEditor:false,
            }
        }]
    })
}


/*******************************************************************************
 * tools
 */

// function getPagenoteEditorContainer():Element{
//     const PagenoteEditor = document.querySelector('#pagenoteeditor') ?? document.createElement('div')
//     PagenoteEditor.id = 'pagenoteeditor'
//     document.documentElement.append(PagenoteEditor)
//     return PagenoteEditor
// }

