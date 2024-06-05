import { IconButton, Tooltip, Zoom } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { PagenoteAnchorContext } from '../PagenoteIcon'
import BorderColorIcon from '@mui/icons-material/BorderColor';

export default function ToolsSetCustomStyle() {
    const AnchorContext = useContext(PagenoteAnchorContext)
    if (AnchorContext == null) {
        return <></>
    }

    const { setTool } = AnchorContext

    

    const handlerFontBoldClick = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        window.getSelection()?.removeAllRanges()
        setTool('setFontBold')
    }

    return (
        <IconButton
            color='secondary'
            sx={{
                position: 'relative', 
                width: 30, 
                height: '100%',
                transformOrigin: 'top',
                scale: '0.8',
                transform: 'translateY(3px)'
            }}
        >
            <Tooltip title="高级设置" TransitionComponent={Zoom} arrow>
                <BorderColorIcon > </BorderColorIcon>
            </Tooltip>
        </IconButton>)
}

