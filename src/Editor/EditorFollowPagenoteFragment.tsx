import { Box, Divider } from "@mui/material";
import EditorTitle from "./components/EditorTitle";
import EditorToolBar from "./components/EditorToolBar";
import EditorContent from "./components/EditorContent";
// import zIndex from "@mui/material/styles/zIndex";
import { EditorContext } from ".";
import { useContext, useEffect, useRef, useState } from "react";
const style = {
    position: 'absolute',
    boxShadow: 24,
    p: 2,
    'resize':"both",
    overflow:'auto',
    minWidth:'300px',
    minHeight:'200px',
    height:'200px',
    zIndex:999,
  };

export default function EditorFollowPagenoteFragment() {
  const editorContext = useContext(EditorContext)
  if (editorContext == null) return
  const { editorStatus ,setEditorStatus} = editorContext
  const [showTitleAndTools,setShowTitleTools]=useState({
    showTitle:editorStatus.showTitle,
    showTools:editorStatus.showTools,
  })
  
  useEffect(()=>{
    setShowTitleTools(setting=>({
      ...setting,
      showTitle:editorStatus.showTitle,
      showTools:editorStatus.showTools,
    }))
  },[editorStatus.showTitle,editorStatus.showTools])
  
  const handlerMouseEnter = (e:React.MouseEvent) => {
    setShowTitleTools({
      showTitle:true,
      showTools:true,
    })
  }

  const handlerMouseLeave=(e:React.MouseEvent)=>{
    setShowTitleTools({
      showTitle:editorStatus.showTitle,
      showTools:editorStatus.showTools,
    })
  }

  const handlerMouseUp=(e:React.MouseEvent<HTMLDivElement, MouseEvent>)=>{
    console.log('resize...',e)
    console.log(editorStatus)
    const target=e.target as typeof e.currentTarget
    setEditorStatus(editorStatus=>({
      ...editorStatus,
      editorWidth:target.style.width,
      editorHeight:target.style.height,
    }))
  }

  return (<Box
    sx={{
      ...style,
      top: editorStatus.editorPositionY,
      left: editorStatus.editorPositionX,
      transform: 'translate(-50%,0)',
      width:editorStatus.editorWidth,
      height:editorStatus.editorHeight,
    }}
    bgcolor={"background.default"}
    color={'text.primary'}
    id='pagenoteEditor'
    onMouseEnter={handlerMouseEnter}
    onMouseLeave={handlerMouseLeave}
    onMouseUp={e=>handlerMouseUp(e)}
  >
    {/* <EditorSetting/> */}
    {
      showTitleAndTools.showTitle && <>
      <EditorTitle />
      <Divider aria-hidden="false" />
    </>}
    {
      showTitleAndTools.showTools && <>
      <EditorToolBar />
      <Divider aria-hidden="false" />
    </>}
    <EditorContent showTitleAndTools={showTitleAndTools}/>
  </Box>)
}