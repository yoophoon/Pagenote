import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import { IconButton, Tooltip, Zoom } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { ColorPicker } from "../../../Components/ColorPicker";

import { PagenoteAnchorContext } from '../PagenoteIcon'

export default function ToolsSetFontColor() {
    const AnchorContext = useContext(PagenoteAnchorContext)
    if (AnchorContext == null) {
        return <></>
    }

    const { contentPagenote,setAllPagenotesInfo,tool, setTool } = AnchorContext
    const [color,setColor]=useState('')
    const userColorPicker = tool == 'setFontColor' ? <ColorPicker setColor={setColor}></ColorPicker> : null
    
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
                                color: color,
                            }
                        }
                    }
                }
                return pagenote
            })
        })
    }, [color])

    const handlerFontColorClick = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        window.getSelection()?.removeAllRanges()
        setTool('setFontColor')
    }

    return (
        <IconButton
            color='secondary'
            onClick={handlerFontColorClick}
            sx={{
                position: 'relative', 
                width: 30, 
                height: '100%',
            }}
        >
            <Tooltip title="设置字体颜色" TransitionComponent={Zoom} arrow>
                <FormatColorTextIcon > </FormatColorTextIcon>
            </Tooltip>
            {userColorPicker}
        </IconButton>)
}

