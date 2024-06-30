import { IconButton, Tooltip, Zoom } from "@mui/material";
import React, { useContext} from "react";
import { PagenoteAnchorContext } from '../PagenoteIcon'
import StrikethroughSIcon from '@mui/icons-material/StrikethroughS';

type strikethrough={
    strikethrough:string
  }

export default function ToolsSetFontStrikethrough({strikethrough}:strikethrough) {
    const AnchorContext = useContext(PagenoteAnchorContext)
    if (AnchorContext == null) {
        return <></>
    }

    const { setContentPagenote, setTool } = AnchorContext

    const handlerFontStrikethroughClick = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        window.getSelection()?.removeAllRanges()
        setTool('setFontStrikethrough')
        setContentPagenote(contentPagenote=>({
            ...contentPagenote,
                pagenoteStyle: {
                    ...contentPagenote.pagenoteStyle,
                    textDecoration: strikethrough.includes('line-through')?
                                    strikethrough.replace(/line-through/g,'').replace(/[ ]+/g,' ').trim():
                                    (strikethrough+' line-through'),
                }
            })
        )
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

