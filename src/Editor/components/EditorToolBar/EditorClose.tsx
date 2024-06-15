import CloseIcon from '@mui/icons-material/Close';
import { IconButton, SvgIcon, Tooltip, Zoom } from '@mui/material';
import { PagenoteAnchorContext } from '../../../Content/PagenoteTools/PagenoteIcon';
import { useContext } from 'react';
export default function EditorClose() {
    const pagenoteAnchorContext=useContext(PagenoteAnchorContext)
    if(pagenoteAnchorContext==null) return
    const { contentPagenote, setAllPagenotesInfo, setTool } = pagenoteAnchorContext
    const handlerEditorClose=()=>{
        setAllPagenotesInfo(pagenotesInfo=>{
            return pagenotesInfo.map(pagenoteInfo=>{
                if(pagenoteInfo?.contentPagenote.pagenoteID==contentPagenote.pagenoteID){
                    pagenoteInfo.contentPagenote.showEditor=false
                    pagenoteInfo.contentPagenote.showTools=true
                    setTool('')
                }
                return pagenoteInfo
            })
        })
    }
    return (
        <Tooltip title="close" TransitionComponent={Zoom} arrow>
            <IconButton edge="start" color='secondary' onClick={handlerEditorClose}>
                <SvgIcon component={CloseIcon} inheritViewBox fontSize="small" sx={{ width: 16, height: 16 }} />
            </IconButton>
        </Tooltip>)
}