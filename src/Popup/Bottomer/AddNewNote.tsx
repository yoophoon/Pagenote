import { IconButton, Tooltip } from "@mui/material";
import { NoteAdd } from "@mui/icons-material";
import Zoom from '@mui/material/Zoom'
import { EOperation, EPosition, TMessageToEditor } from "../../pagenoteTypes";

export function AddNewNote() {

    return (<>
        <Tooltip title="Add" TransitionComponent={Zoom} arrow>
            <IconButton aria-label="add a new note" onClick={addANewNote}>
                <NoteAdd />
            </IconButton>
        </Tooltip>
    </>)
}

function addANewNote() {

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        console.log(tabs)
        const targetURL=new URL(tabs[0].url??"")
        const message: TMessageToEditor = {
            operation: EOperation.addPagenote,
            value: {
                editorPosition: EPosition.inPage,
                pagenoteID: new Date().getTime(),
                pagenoteTitle: 'new pagenote',
                pagenoteContent: '',
                pagenoteTimestamp: new Date().getTime(),
                pagenoteTarget:targetURL.origin+targetURL.pathname,
                pagenoteIndex:-1,
                showTools:false,
                showEditor:true,
                showEditorTitle:true,
                showEditorTools:true,
                renderMarkdown:false,
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