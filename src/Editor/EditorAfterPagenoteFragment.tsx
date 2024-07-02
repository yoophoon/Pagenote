    import { Box, Divider, styled } from "@mui/material";
import EditorTitle from "./components/EditorTitle";
import EditorToolBar from "./components/EditorToolBar";
import EditorContent from "./components/EditorContent";
// import zIndex from "@mui/material/styles/zIndex";
import { EditorContext } from ".";
import { useContext, useEffect, useRef, useState } from "react";


  const EditorAfterPagenoteFragmentContainer=styled(Box)(({theme})=>({
    boxShadow: theme.shadows[1],
    
    resize:'vertical',
    overflow:'auto',
    minWidth:'100%',
    minHeight:'200px',
    height:'200px',
    zIndex:999,
}))

export default function EditorAfterPagenoteFragment() {
  const editorContext = useContext(EditorContext)
  if (editorContext == null) return
  const { editorStatus ,setEditorStatus} = editorContext
  const [showTitleAndTools,setShowTitleTools]=useState({
    showTitle:editorStatus.showTitle,
    showTools:editorStatus.showTools,
  })
  
  const pagenoteEditorRef=useRef<HTMLDivElement>()
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
    if(target==pagenoteEditorRef.current){
      setEditorStatus(editorStatus=>({
        ...editorStatus,
        editorHeight:target.scrollHeight+'px',
      }))
    }
    
  }

  return (<EditorAfterPagenoteFragmentContainer
    sx={{
      boxSizing:'border-box',
      // width:editorStatus.editorWidth,
      // maxWidth:editorStatus.editorWidth,
      height:editorStatus.editorHeight,
      float:'left',
      p: 2,
    }}
    bgcolor={"background.default"}
    color={'text.primary'}
    id='pagenoteEditor'
    ref={pagenoteEditorRef}
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
  </EditorAfterPagenoteFragmentContainer>)
}