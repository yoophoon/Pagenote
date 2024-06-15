import { IconButton, Tooltip, Zoom } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { PagenoteAnchorContext } from '../PagenoteIcon'
import StrikethroughSIcon from '@mui/icons-material/StrikethroughS';

export default function ToolsSetFontStrikethrough() {
    const AnchorContext = useContext(PagenoteAnchorContext)
    if (AnchorContext == null) {
        return <></>
    }

    const { contentPagenote,setAllPagenotesInfo,tool, setTool } = AnchorContext
    const [fontStrikethrough,setFontStrikethrough]=useState(contentPagenote.pagenoteStyle?.fontStyle)

    
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
                                textDecoration: fontStrikethrough?
                                                (pagenote.contentPagenote.pagenoteStyle?.textDecoration??'')+' line-through':
                                                (pagenote.contentPagenote.pagenoteStyle?.textDecoration??'').replace(/line-through/g,'').replace(/[ ]+/g,' ').trim(),
                            }
                        }
                    }
                }
                console.log(pagenote)
                return pagenote
            })
        })
    }, [fontStrikethrough])

    const handlerFontStrikethroughClick = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        window.getSelection()?.removeAllRanges()
        setTool('setFontStrikethrough')
        setFontStrikethrough(fontStrikethrough?.includes('line-through')?fontStrikethrough.replace(/line-through/g,'').replace(/[ ]+/g,' ').trim():(fontStrikethrough??'')+' line-through')
    }

    return (
        <IconButton
            color='secondary'
            onClick={handlerFontStrikethroughClick}
            sx={{
                position: 'relative',
                width: 30,
                height: '100%',
                transformOrigin: 'center',
                scale: '1.2',
                transform: 'translateY(1px)'
            }}
        >
            <Tooltip title="设置删除线" TransitionComponent={Zoom} arrow>
                <StrikethroughSIcon > </StrikethroughSIcon>
            </Tooltip>
        </IconButton>)
}

