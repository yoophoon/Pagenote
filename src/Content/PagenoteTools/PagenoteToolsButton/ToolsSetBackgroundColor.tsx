import { FormatColorFill } from "@mui/icons-material";
import {  IconButton, Tooltip, Zoom } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { ColorPicker } from "../../../Components/ColorPicker";
import { PagenoteAnchorContext } from '../PagenoteIcon'


export default function ToolsSetBackgroundColor() {
    const AnchorContext = useContext(PagenoteAnchorContext)
    if (AnchorContext == null) {
        return <></>
    }

    const { contentPagenote,setAllPagenotesInfo,tool, setTool } = AnchorContext
    const [color,setColor]=useState(contentPagenote.pagenoteStyle?.backgroundColor)
    const userColorPicker = tool == 'setBackgroundColor' ? <ColorPicker setColor={setColor}></ColorPicker> : null
    
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
                                backgroundColor: color,
                            }
                        }
                    }
                }
                return pagenote
            })
        })
    }, [color])

    const handlerBackgroundColorClick = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        window.getSelection()?.removeAllRanges()
        setTool('setBackgroundColor')
    }


    return (
        <IconButton
            color='secondary'
            onClick={handlerBackgroundColorClick}
            sx={{
                position: 'relative', 
                width: 30, 
                height: '100%',
            }}
        >
            <Tooltip title="设置背景颜色" TransitionComponent={Zoom} arrow>
                <FormatColorFill > </FormatColorFill>
            </Tooltip>
            {userColorPicker}
        </IconButton>)
}


