import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import { IconButton, Tooltip, Zoom } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { ColorPicker } from "../../../Components/ColorPicker";

import { PagenoteAnchorContext } from '../PagenoteIcon'

type fontColor={
    fontColor:string|undefined
  }

export default function ToolsSetFontColor({fontColor}:fontColor) {
    const AnchorContext = useContext(PagenoteAnchorContext)
    if (AnchorContext == null) {
        return <></>
    }

    const {setContentPagenote,tool, setTool } = AnchorContext
    const [color,setColor]=useState(fontColor)
    const userColorPicker = tool == 'setFontColor' ? <ColorPicker color={color} setColor={setColor}></ColorPicker> : null
    
    useEffect(() => {
        setContentPagenote(contentPagenote=>({
            ...contentPagenote,
            pagenoteStyle:{
                ...contentPagenote.pagenoteStyle,
                color:color,
            }
        }))
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

