import { BorderColor } from "@mui/icons-material";
import { IconButton, Tooltip, Zoom } from "@mui/material";
import React, { useContext } from "react";


import { PagenoteAnchorContext } from '../index'

export default function ToolsSetFontColor() {
    const pagenoteAnchorContext = useContext(PagenoteAnchorContext)
    if (pagenoteAnchorContext == null) {
        return <></>
    }

    const { style, setStyle } = pagenoteAnchorContext
    const handlerClick = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setStyle({
            ...style,
            color: 'red'
        })
        alert('setfontColor')
    }


    return (
        <Tooltip title="设置字体颜色" TransitionComponent={Zoom} arrow>
            <IconButton
                edge="start"
                color='secondary'
                onClick={e => handlerClick(e)}
            >
                <BorderColor />
            </IconButton>
        </Tooltip>)
}

