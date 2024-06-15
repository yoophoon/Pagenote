import { IconButton, Tooltip, Zoom } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import { PagenoteAnchorContext } from '../PagenoteIcon'

export default function ToolsSetFontBold() {
    const AnchorContext = useContext(PagenoteAnchorContext)
    if (AnchorContext == null) {
        return <></>
    }

    const { contentPagenote,setAllPagenotesInfo,tool, setTool } = AnchorContext
    const [fontBold,setFontBold]=useState(contentPagenote.pagenoteStyle?.fontWeight)

    
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
                                fontWeight: fontBold,
                            }
                        }
                    }
                }
                return pagenote
            })
        })
    }, [fontBold])

    const handlerFontBoldClick = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        window.getSelection()?.removeAllRanges()
        setTool('setFontBold')
        setFontBold(fontBold=='bold'?'normal':'bold')
    }

    return (
        <IconButton
            color='secondary'
            onClick={handlerFontBoldClick}
            sx={{
                position: 'relative',
                width: 30,
                height: '100%',
                transformOrigin: 'center',
                scale: '1.3',
                transform: 'translateY(1px)'
            }}
        >
            <Tooltip title="设置粗体" TransitionComponent={Zoom} arrow>
                <FormatBoldIcon > </FormatBoldIcon>
            </Tooltip>
        </IconButton>)
}

