import { IconButton, Tooltip, Zoom } from "@mui/material";
import React, { useContext } from "react";
import { PagenoteAnchorContext } from '../PagenoteIcon'
import FormatOverlineIcon from '@mui/icons-material/FormatOverline';

type overline={
    overline:string
  }

export default function ToolsSetFontOverline({overline}:overline) {
    const AnchorContext = useContext(PagenoteAnchorContext)
    if (AnchorContext == null) {
        return <></>
    }
    const { setContentPagenote, setTool } = AnchorContext

    const handlerFontOverlineClick = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        window.getSelection()?.removeAllRanges()
        setTool('setFontOverline')
        setContentPagenote(contentPagenote=>({
            ...contentPagenote,
                pagenoteStyle: {
                    ...contentPagenote.pagenoteStyle,
                    textDecoration: overline.includes('overline')?
                                    overline.replace(/overline/g,'').replace(/[ ]+/g,' ').trim():
                                    (overline+' overline'),
                }
            })
        )
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

