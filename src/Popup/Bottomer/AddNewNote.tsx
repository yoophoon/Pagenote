import { IconButton, Tooltip } from "@mui/material";
import { NoteAdd } from "@mui/icons-material";
import Zoom from '@mui/material/Zoom'
import { EOperation, EPosition, TMessageToEditor, TSiteConfig } from "../../pagenoteTypes";
import { useLiveQuery } from "dexie-react-hooks";
import pagenoteDB from "../../lib/storeage/pagenoteDB";
import { useEffect, useState } from "react";

export function AddNewNote() {
    const [activeTab, setActiveTab] = useState('')
    
    const siteConfig = useLiveQuery(() =>
        // pagenoteDB.sitesConfig.where('origin').equals(activeTab).toArray()
        pagenoteDB.sitesConfig.where('origin').equals(activeTab).toArray(),
        [activeTab]
      )

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

    return (<>
        <Tooltip title="Add" TransitionComponent={Zoom} arrow>
            <IconButton aria-label="add a new note" onClick={()=>addANewNote(siteConfig)} disabled={(siteConfig&&siteConfig.length>0)?false:true}>
                <NoteAdd />
            </IconButton>
        </Tooltip>
    </>)
}

function addANewNote(siteConfig: TSiteConfig[] | undefined) {
    if(!siteConfig||siteConfig.length==0) return
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        console.log(tabs)
        const targetURL=new URL(tabs[0].url??"")
        const message: TMessageToEditor = {
            operation: EOperation.addPagenote,
            value: {
                editorPosition: EPosition.inPage,
                pagenoteID: new Date().getTime(),
                pagenoteTitle: 'new pagenote',
                pagenoteContent: 'new pagenote',
                pagenoteTimestamp: new Date().getTime(),
                pagenoteTarget:targetURL.origin+targetURL.pathname,
                pagenoteIndex:-1,
                pagenoteFragment:{
                    textStart:'new pagenote'
                },
                
                showTools:false,
                showEditor:true,
                showEditorTitle:siteConfig[0].showEditorTitle,
                showEditorTools:siteConfig[0].showEditorTools,
                renderMarkdown:false,
                editorContentScrollTop:-1,
                editorHeight:'80vh',
                editorWidth:'80vw',
            }
        }
        if (tabs[0].id)
            chrome.tabs.sendMessage(
                tabs[0].id,
                message,
                (response) => {
                    console.log(response)
                    if (response == undefined) {
                        console.log('something wrong')
                    } else if (response.editorStatus == 'open') {
                        //已经打开编辑器

                        window.close()
                    } else {
                        //发生未知错误
                        console.log('something wrong')
                    }
                });
    });
}