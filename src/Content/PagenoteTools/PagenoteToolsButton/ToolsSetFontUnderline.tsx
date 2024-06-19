import { IconButton, Tooltip, Zoom } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { PagenoteAnchorContext } from '../PagenoteIcon'
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import { EOperation } from "../../../pagenoteTypes";

type underline={
    underline:string
  }

export default function ToolsSetFontUnderline({underline}:underline) {
    const AnchorContext = useContext(PagenoteAnchorContext)
    if (AnchorContext == null) {
        return <></>
    }

    const {setContentPagenote, setTool } = AnchorContext

    const handlerFontUnderlineClick = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        window.getSelection()?.removeAllRanges()
        setTool('setFontUnderline')
        setContentPagenote(contentPagenote=>({
            ...contentPagenote,
                pagenoteStyle: {
                    ...contentPagenote.pagenoteStyle,
                    textDecoration: underline.includes('underline')?
                                    underline.replace(/underline/g,'').replace(/[ ]+/g,' ').trim():
                                    (underline+' underline'),
                }
            })
        )

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

