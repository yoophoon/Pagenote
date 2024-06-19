import { Box, Divider, Modal } from "@mui/material"
import EditorTitle from './components/EditorTitle'
import EditorToolBar from "./components/EditorToolBar"
import EditorContent from "./components/EditorContent"

import { EPosition, TPagenote, TSetContentPagenotes, TEditorStatus} from "../pagenoteTypes"
import { createContext, useContext, useEffect, useId, useState } from "react"
import {PagenoteAnchorContext} from '../Content/PagenoteTools/PagenoteIcon'

type TEditorContext={
  editorStatus:TEditorStatus,
  setEditorStatus:React.Dispatch<React.SetStateAction<TEditorStatus>>
}

export const EditorContext=createContext<TEditorContext|null>(null)

export default function Editor() {
  const pagenoteAnchorContext=useContext(PagenoteAnchorContext)
  if(pagenoteAnchorContext==null) return
  const {contentPagenote, setContentPagenote, setTool}=pagenoteAnchorContext
  const positionedEditor=getPositionedEditor(contentPagenote.pagenotePosition)

  //初始化editorStatus
  const [editorStatus,setEditorStatus]=useState<TEditorStatus>({
    pagenoteID:contentPagenote.pagenoteID,
    title:contentPagenote.pagenoteTitle??'',
    titleID:useId(),
    content:contentPagenote.pagenoteContent??'',
    markupContent:markUpStr(contentPagenote.pagenoteContent??''),
    contentID:useId(),
    selectStart:0,
    selectEnd:0,
    open:contentPagenote.showEditor,
    showTitle:contentPagenote.showEditorTitle,
    showTools:contentPagenote.showEditorTools,
    renderMarkdown:contentPagenote.renderMarkdown,
  })

  //退出editor时更新pagenoteTitle、pagenoteContent、showTools及showEditor
  useEffect(()=>{
    if(!editorStatus.open){
      setContentPagenote(contentPagenote=>({
        ...contentPagenote,
        pagenoteTitle:editorStatus.title,
        pagenoteContent:editorStatus.content,
        showTools:!editorStatus.open,
        showEditor:editorStatus.open,
        showEditorTitle:editorStatus.showTitle,
        showEditorTools:editorStatus.showTools,
        renderMarkdown:editorStatus.renderMarkdown,
      }))
      setTool('')
    }
  },[editorStatus.open])

  //处理editor在a标签打开的情况
  useEffect(()=>{
    //如果打开了editor并且这个editor锚在a元素中，那就暂时取消a元素得可拖拽状态
    const closest=document.querySelector(`pagenoteicon[pagenoteid="${contentPagenote.pagenoteID}"]`)?.closest('a')
    let originDragStatus=closest?.getAttribute('draggable')
    console.log('draggablestatus',originDragStatus)
    if(closest==null||closest==undefined) {
      return
    }
    else{
      closest.setAttribute('draggable','false')
    }
    //重置为之前得拖拽状态
    return ()=>{
      if(originDragStatus===undefined) return
      else if(originDragStatus===null) closest.removeAttribute('draggable')
      else closest.setAttribute('draggable',originDragStatus)
    }
  },[])

  return (
    <EditorContext.Provider value={{
      editorStatus,
      setEditorStatus
    }}>
      {editorStatus.open && positionedEditor}
    </EditorContext.Provider>)
}



/**
 * 
 * @returns true considered content exists while false considered no content
 */
function hasContent(): boolean {
  const pagenoteEditorContentEle = document.querySelector('#pagenoteEditorContent')
  //if pagenoteEditor exsits and its innerhtml contains content except whitespace
  if (pagenoteEditorContentEle &&
    pagenoteEditorContentEle.innerHTML.replace(/[\n\r ]+/, '') != '') {
    //ask user to confirm to leave or not
    //if leave then the content considered null
    const stillClose = confirm("编辑器存在内容，是否退出")
    if (stillClose) return false
  }
  //if pagenoteEditor exsits and its innerhtml includes just whitespace
  else if (pagenoteEditorContentEle &&
    pagenoteEditorContentEle.innerHTML.replace(/[\n\r ]+/, '') == '') {
    return false
  }
  return true
}

function handlerExitEditor(pagenoteInfo: TPagenote, setAllPagenotesInfo: TSetContentPagenotes) {
  setAllPagenotesInfo(allPagenotesInfo => {
    return allPagenotesInfo.map(pagenote => {
      if (pagenoteInfo.pagenoteID == pagenote?.contentPagenote.pagenoteID) {
        pagenote = {
          ...pagenote,
          contentPagenote: {
            ...pagenote.contentPagenote,
            showEditor: false,
          }
        }
      }
      return pagenote
    })
  })
}

import EditorInPage from "./EditorInPage"
import { markUpStr } from "../lib/markUp"
function getPositionedEditor(position:EPosition){
  if(position==EPosition.inPage){
    return <></>
  }else if(position==EPosition.followPagenoteFragment){
    return <EditorInPage/>
  }else if(position==EPosition.afterPagenoteFragment){
    
  }
  return <div>error on opening editor</div>
}