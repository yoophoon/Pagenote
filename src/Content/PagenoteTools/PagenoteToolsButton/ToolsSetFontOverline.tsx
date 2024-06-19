import { IconButton, Tooltip, Zoom } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { PagenoteAnchorContext } from '../PagenoteIcon'
import FormatOverlineIcon from '@mui/icons-material/FormatOverline';

export default function ToolsSetFontOverline() {
    const AnchorContext = useContext(PagenoteAnchorContext)
    if (AnchorContext == null) {
        return <></>
    }

    const { contentPagenote, setContentPagenote, setTool } = AnchorContext
    const [fontOverline,setFontOverline]=useState(contentPagenote.pagenoteStyle?.textDecoration)

    
    useEffect(() => {
        setContentPagenote(contentPagenote=>({
            ...contentPagenote,
                pagenoteStyle: {
                    ...contentPagenote.pagenoteStyle,
                    textDecoration: fontOverline,
                }
            })
        )
    }, [fontOverline])
    console.log('overline++++++++',fontOverline,contentPagenote.pagenoteID)
    const handlerFontOverlineClick = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        window.getSelection()?.removeAllRanges()
        setTool('setFontOverline')
        setFontOverline(fontOverline?.includes('overline')?fontOverline?.replace(/overline/g,'').replace(/[ ]+/g,' ').trim():(fontOverline??'')+' overline')
    }

    return (
        <IconButton
            color='secondary'
            onClick={handlerFontOverlineClick}
            sx={{ position: 'relative',width:30,height:'100%'  }}
        >
            <Tooltip title="设置上划线" TransitionComponent={Zoom} arrow>
                <FormatOverlineIcon > </FormatOverlineIcon>
            </Tooltip>
        </IconButton>)
}

