import { Box, Divider, Modal } from "@mui/material"
import EditorTitle from './components/EditorTitle'
import EditorToolBar from "./components/EditorToolBar"
import EditorContent from "./components/EditorContent"

import { EPosition, TPagenote, TSetContentPagenotes } from "../pagenoteTypes"
import { useContext, useEffect } from "react"
import {PagenoteAnchorContext} from '../Content/PagenoteTools/PagenoteIcon'

export default function Editor() {
  const pagenoteAnchorContext=useContext(PagenoteAnchorContext)
  if(pagenoteAnchorContext==null) return
  const {contentPagenote}=pagenoteAnchorContext
  const positionedEditor=getPositionedEditor(contentPagenote.pagenotePosition)
  
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

  return positionedEditor
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
function getPositionedEditor(position:EPosition){
  if(position==EPosition.inPage){
    return <></>
  }else if(position==EPosition.followPagenoteFragment){
    return <EditorInPage/>
  }else if(position==EPosition.afterPagenoteFragment){
    
  }
  return <div>error on opening editor</div>
}