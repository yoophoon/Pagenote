import { IconButton, Tooltip, Zoom } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { PagenoteAnchorContext } from '../PagenoteIcon'
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import { EOperation } from "../../../pagenoteTypes";

export default function ToolsSetFontUnderline() {
    const AnchorContext = useContext(PagenoteAnchorContext)
    if (AnchorContext == null) {
        return <></>
    }

    const { contentPagenote,setAllPagenotesInfo,tool, setTool } = AnchorContext
    const [fontUnderline,setFontUnderline]=useState(contentPagenote.pagenoteStyle?.fontStyle)

    
    useEffect(() => {
        setAllPagenotesInfo(contentPagenotes => {
            return contentPagenotes.map(pagenote => {
                if (pagenote && pagenote?.contentPagenote.pagenoteID == contentPagenote?.pagenoteID) {
                    pagenote = {
                        ...pagenote,
                        contentPagenote: {
                            ...pagenote.contentPagenote,
                            pagenoteStyle: {
                                ...pagenote.contentPagenote.pagenoteStyle,
                                textDecoration: fontUnderline?
                                                (pagenote.contentPagenote.pagenoteStyle?.textDecoration??'')+' underline':
                                                (pagenote.contentPagenote.pagenoteStyle?.textDecoration??'').replace(/underline/g,'').replace(/[ ]+/g,' ').trim(),
                            }
                        }
                    }
                }
                console.log(pagenote)
                return pagenote
            })
        })
    }, [fontUnderline])

    const handlerFontUnderlineClick = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        window.getSelection()?.removeAllRanges()
        setTool('setFontUnderline')
        setFontUnderline(fontUnderline?.includes('underline')?fontUnderline.replace(/underline/g,'').replace(/[ ]+/g,' ').trim():(fontUnderline??'')+' underline')

        chrome.runtime.sendMessage({operation:EOperation.sidePanel,value:"fuck sidepanel"},response=>{
            console.log(response)
        })
    }

    return (
        <IconButton
            color='secondary'
            onClick={handlerFontUnderlineClick}
            sx={{ position: 'relative',width:30,height:'100%' }}
        >
            <Tooltip title="设置字体颜色" TransitionComponent={Zoom} arrow>
                <FormatUnderlinedIcon > </FormatUnderlinedIcon>
            </Tooltip>
        </IconButton>)
}

