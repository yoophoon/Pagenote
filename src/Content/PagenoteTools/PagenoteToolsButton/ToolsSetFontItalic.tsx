import { IconButton, Tooltip, Zoom } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { PagenoteAnchorContext } from '../PagenoteIcon'
import FormatItalicIcon from '@mui/icons-material/FormatItalic';

export default function ToolsSetFontItalic() {
    const AnchorContext = useContext(PagenoteAnchorContext)
    if (AnchorContext == null) {
        return <></>
    }

    const { contentPagenote,setAllPagenotesInfo,tool, setTool } = AnchorContext
    const [fontItalic,setFontItalic]=useState(contentPagenote.pagenoteStyle?.fontStyle)

    
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
                                fontStyle: fontItalic,
                            }
                        }
                    }
                }
                return pagenote
            })
        })
    }, [fontItalic])

    const handlerFontItalicClick = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        window.getSelection()?.removeAllRanges()
        setTool('setFontItalic')
        setFontItalic(fontItalic=='italic'?'normal':'italic')
    }

    return (
        <IconButton
            color='secondary'
            onClick={handlerFontItalicClick}
            sx={{
                position: 'relative',
                width: 30,
                height: '100%',
                transformOrigin: 'center',
                scale: '1.2',
                transform: 'translateY(1px)'
            }}
        >
            <Tooltip title="设置斜体" TransitionComponent={Zoom} arrow>
                <FormatItalicIcon > </FormatItalicIcon>
            </Tooltip>
        </IconButton>)
}

