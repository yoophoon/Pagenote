import { IconButton, SvgIcon, Tooltip, Zoom } from '@mui/material'
import { Save } from '../../assets/svg'
import { useContext } from 'react'
import { TPagenoteFragment } from '../../pagenoteTypes'
import { EditorContext } from '..'
export default function EditorSaveContent() {
    const { openEditor, pagenoteID, pagenoteFragment } = useContext(EditorContext)

    function getPagenoteContent() {
        const pagenoteEditorContentEle = document.querySelector('#pagenoteEditorContent')
        return pagenoteEditorContentEle?.innerHTML ?? ''
    }

    return (
        <Tooltip title="保存" TransitionComponent={Zoom} arrow>
            <IconButton edge="start" color='secondary' onClick={async () => await handleSaveContent(pagenoteID, openEditor.initTitle, getPagenoteContent(), pagenoteFragment)}>
                <SvgIcon component={Save} inheritViewBox fontSize="small" sx={{ width: 16, height: 16 }} />
            </IconButton>
        </Tooltip>)
}

async function handleSaveContent(pagenoteUUID: number, pagenoteTitle: string, pagenoteContent: string, pagenoteFragment: TPagenoteFragment) {

    const response = await chrome.runtime.sendMessage({
        operation: 'saveContent',
        value: {
            pagenoteUUID,
            timestamp: new Date().getTime(),
            pagenoteTitle,
            pagenoteContent,
            pagenoteFragment
        }
    })
    console.log(response)
}