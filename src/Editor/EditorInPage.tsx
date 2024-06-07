import { Box, Divider, Modal } from "@mui/material"
import EditorTitle from './EditorTitle'
import EditorToolBar from "./EditorToolBar"
import EditorContent from "./EditorContent"
import './Editor.css'
import { TPagenote, TSetContentPagenotes } from "../pagenoteTypes"
import { createContext, useState } from "react"

type TPagenoteInpage = {
    pagenoteInfo: TPagenote,
    setAllPagenotesInfo: TSetContentPagenotes
}

export const noteContext=createContext<{note:{
    title: string;
    content: string;
},
setNote:React.Dispatch<React.SetStateAction<{
    title: string;
    content: string;
}>>}|null>(null)

export default function EditorInPage(props:TPagenoteInpage) {
    //
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        boxShadow: 24,
        p: 2,
    };

    const { pagenoteInfo, setAllPagenotesInfo } = props
    const [inpageEditorOpen, setInpageEditorOpen] = useState(pagenoteInfo.showEditor)
    const [note, setNote] = useState({ title: pagenoteInfo.pagenoteTitle??'', content: pagenoteInfo.pagenoteContent??'', })
    

    return (
        <Modal
            open={inpageEditorOpen}
            onClose={() => {
                if (hasContent() == false) {
                    setInpageEditorOpen(!inpageEditorOpen)
                    
                }
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box
                sx={style}
                bgcolor={"background.default"}
                color={'text.primary'}
                id='pagenoteEditor'
            >
                <noteContext.Provider value={{note,setNote}}>
                    <EditorTitle />
                    <Divider aria-hidden="true" />
                    {/* editor toolbar */}
                    {/* <EditorToolBar /> */}
                    <Divider aria-hidden="true" />
                    <EditorContent >
                    </EditorContent>
                </noteContext.Provider>
            </Box>
        </Modal >)
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

function handlerExitEditor(pagenoteInfo: TPagenote,setAllPagenotesInfo: TSetContentPagenotes){
    setAllPagenotesInfo(allPagenotesInfo=>{
        return allPagenotesInfo.map(pagenote=>{
            if(pagenoteInfo.pagenoteID==pagenote?.contentPagenote.pagenoteID){
                pagenote={
                    ...pagenote,
                    contentPagenote:{
                        ...pagenote.contentPagenote,
                        showEditor:false,
                    }
                }
            }
            return pagenote
        })
    })
}