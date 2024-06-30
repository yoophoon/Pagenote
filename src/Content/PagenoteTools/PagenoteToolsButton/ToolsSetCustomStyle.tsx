import { IconButton, Tooltip, Zoom } from "@mui/material";
import  { useContext } from "react";
import { PagenoteAnchorContext } from '../PagenoteIcon'
import BorderColorIcon from '@mui/icons-material/BorderColor';

/**
 * 这个组件用于给用户更大的自由度去设置pagenoteAnchor的css
 * 后续整理
 * @returns 一个设置pagenoteAnchor更多css的按钮
 */
export default function ToolsSetCustomStyle() {
    const AnchorContext = useContext(PagenoteAnchorContext)
    if (AnchorContext == null) {
        return <></>
    }

    // const { setTool } = AnchorContext

    

    // const handlerFontBoldClick = (e: React.MouseEvent) => {
    //     e.preventDefault()
    //     e.stopPropagation()
    //     window.getSelection()?.removeAllRanges()
    //     setTool('setFontBold')
    // }

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

