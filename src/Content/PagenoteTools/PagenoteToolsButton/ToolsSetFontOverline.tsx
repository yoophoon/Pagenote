import { IconButton, Tooltip, Zoom } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { PagenoteAnchorContext } from '../PagenoteIcon'
import FormatOverlineIcon from '@mui/icons-material/FormatOverline';

export default function ToolsSetFontOverline() {
    const AnchorContext = useContext(PagenoteAnchorContext)
    if (AnchorContext == null) {
        return <></>
    }

    const { contentPagenote,setAllPagenotesInfo,tool, setTool } = AnchorContext
    const [fontOverline,setFontOverline]=useState(contentPagenote.pagenoteStyle?.textDecoration)

    
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
                                textDecoration: fontOverline,
                            }
                        }
                    }
                }
                console.log('overline',pagenote?.contentPagenote.pagenoteID)
                return pagenote
            })
        })
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

