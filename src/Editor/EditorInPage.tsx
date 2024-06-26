import { Box, Divider } from "@mui/material";
import EditorTitle from "./components/EditorTitle";
import EditorToolBar from "./components/EditorToolBar";
import EditorContent from "./components/EditorContent";
import zIndex from "@mui/material/styles/zIndex";
import { EditorContext } from ".";
import { useContext } from "react";
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

export default function EditorInPage(){
  const editorContext=useContext(EditorContext)
  if(editorContext==null) return
  const {editorStatus,setEditorStatus}=editorContext
    return (<Box
        sx={{
          ...style,
          top:editorStatus.editorPositionY,
          left:editorStatus.editorPositionX,
          transform:'translate(-50%,0)',
        }}
        bgcolor={"background.default"}
        color={'text.primary'}
        id='pagenoteEditor'
      >
      {/* <EditorSetting/> */}
      {editorStatus.showTitle&&<>
        <EditorTitle />
        <Divider aria-hidden="false" />
      </>}
      {editorStatus.showTools && <>
        <EditorToolBar />
        <Divider aria-hidden="false" />
      </>}
        <EditorContent/>
      </Box>)
}