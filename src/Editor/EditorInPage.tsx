import { Box, Divider } from "@mui/material";
import EditorTitle from "./components/EditorTitle";
import EditorToolBar from "./components/EditorToolBar";
import EditorContent from "./components/EditorContent";

const style = {
    position: 'absolute',
    top: '100%',
    left: '50%',
    transform: 'translate(-50%, 0)',
    boxShadow: 24,
    p: 2,
    'resize':"both",
  };

export default function EditorInPage(){
    return (<Box
        sx={style}
        bgcolor={"background.default"}
        color={'text.primary'}
        id='pagenoteEditor'
      >
        <EditorTitle />
        <Divider aria-hidden="false" />
        {/* editor toolbar */}
        {/* <div>hi there</div> */}
        <EditorToolBar />
        <Divider aria-hidden="false" />
        <EditorContent >
        </EditorContent>
      </Box>)
}