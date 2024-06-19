import { Box, Divider } from "@mui/material";
import EditorTitle from "./components/EditorTitle";
import EditorToolBar from "./components/EditorToolBar";
import EditorContent from "./components/EditorContent";
import zIndex from "@mui/material/styles/zIndex";
import { EditorContext } from ".";
import { useContext } from "react";
import EditorSetting from "./components/EditorSetting";
const style = {
    position: 'absolute',
    top: '100%',
    left: '50%',
    transform: 'translate(-50%, 0)',
    boxShadow: 24,
    p: 2,
    'resize':"both",
    zIndex:999,
  };

export default function EditorInPage(){
  const editorContext=useContext(EditorContext)
  if(editorContext==null) return
  const {editorStatus,setEditorStatus}=editorContext
    return (<Box
        sx={style}
        bgcolor={"background.default"}
        color={'text.primary'}
        id='pagenoteEditor'
      >
      <EditorSetting/>
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