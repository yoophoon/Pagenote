import DescriptionIcon from '@mui/icons-material/Description';
import { Box, Button, ButtonGroup, ClickAwayListener, styled } from '@mui/material';
import { createContext, memo, useEffect, useMemo, useState } from 'react';
import { TPagenote, TPagenoteStyle, TContentPagenote, TSetContentPagenotes } from "../../pagenoteTypes"
import ToolsSetFontColor from './PagenoteToolsButton/ToolsSetFontColor';
import ToolsSetBackgroundColor from './PagenoteToolsButton/ToolsSetBackgroundColor';
import ToolsSetFontBold from './PagenoteToolsButton/ToolsSetFontBold';
import ToolsSetFontItalic from './PagenoteToolsButton/ToolsSetFontItalic';
import ToolsSetFontOverline from './PagenoteToolsButton/ToolsSetFontOverline';
import ToolsSetFontStrikethrough from './PagenoteToolsButton/ToolsSetFontStrikethrough';
import ToolsSetFontUnderline from './PagenoteToolsButton/ToolsSetFontUnderline';
import ToolsSetCustomStyle from './PagenoteToolsButton/ToolsSetCustomStyle';
import ToolsSetPagenote from './PagenoteToolsButton/ToolsSetPagenote';
import ToolsDelete from './PagenoteToolsButton/ToolsDelete';

type TPagenoteIcon = {
    pagenoteInfo: TPagenote,
    setAllPagenotesInfo: TSetContentPagenotes
}

const ToolsButtonGroup = styled(ButtonGroup)(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: theme.palette.secondary.main,
    borderRadius: 10,
    position: 'absolute',
    verticalAlign:'bottom',
    zIndex: 999,
    left: 0,
    transform: 'translateX(-50%)',
    gap: 0,
    minHeight: 30,
    height: 30,
}))


type TTool = '' | 'setFontColor' | 'setBackgroundColor' | 'setFontBold' | 'setFontItalic' | 'setFontOverline' | 'setFontStrikethrough' | 'setFontUnderline' | 'setCustomStyle' | 'setPagenote' | 'delete'
type TPagenoteAnchorContext = {
    contentPagenote:TPagenote,
    setAllPagenotesInfo: TSetContentPagenotes,
    tool: TTool,
    setTool: React.Dispatch<React.SetStateAction<TTool>>
}

export const PagenoteAnchorContext = createContext<TPagenoteAnchorContext | null>(null)

const PagenoteIcon = memo((props: TPagenoteIcon) =>{
    //缓存数据避免重复操作
    const [ pagenoteAnchors, pagenoteIcon, rectInfo] = useMemo(() => {
        //pagenoteAnchors       包含当前pagenoteFragment.textStart文本的一系列节点
        const pagenoteAnchors = Array.from(document.querySelectorAll(`pagenoteanchor[pagenoteid="${props.pagenoteInfo.pagenoteID}"]`))
        //pagenoteIcon          pagenoteAnchors节点后面跟随的图标，用于响应后续弹出pagenoteTools
        const pagenoteIcon = document.querySelector(`pagenoteicon[pagenoteid="${props.pagenoteInfo.pagenoteID}"]`)
        //rectInfo              最后一个节点的宽高信息，主要使用rectInfo.height设置pagenoteTools的位置
        const rectInfo = pagenoteAnchors[pagenoteAnchors.length - 1].getBoundingClientRect()
        return [ pagenoteAnchors, pagenoteIcon, rectInfo]
    }, [])
    
    useEffect(()=>{
        setEleStyle(pagenoteIcon as HTMLElement,pagenoteAnchors as HTMLElement[],props.pagenoteInfo.pagenoteStyle)
        console.log(props.pagenoteInfo.pagenoteStyle)
    },[props.pagenoteInfo.pagenoteStyle])

    const [saveContentPagenote,setSaveContentPagenote]=useState(false)
    const [showTools,setShowTools]=useState(props.pagenoteInfo.showTools)
    
    const [tool, setTool] = useState<TTool>('')

    const handlerIconClick = (event: React.MouseEvent) => {
        event.preventDefault()
        event.stopPropagation()
        setShowTools(true)
        window.getSelection()?.removeAllRanges()
    }

    const handlerBoxMouseUp = (event: React.MouseEvent) => {
        event.preventDefault()
        event.stopPropagation()
        setSaveContentPagenote(true)
        window.getSelection()?.removeAllRanges()
    }

    const handlerClickAway=()=>{
        if(saveContentPagenote){
            setTool('')
            setShowTools(false)
        }else{
            props.setAllPagenotesInfo(allPagenotesInfo=>{
                return allPagenotesInfo.filter(pagenote=>pagenote?.contentPagenote.pagenoteID!=props.pagenoteInfo.pagenoteID)
            })
            pagenoteIcon?.remove()
            pagenoteAnchors.forEach(pagenoteAnchor=>pagenoteAnchor.outerHTML=pagenoteAnchor.innerHTML)
        }
    }

    return (
        <ClickAwayListener onClickAway={handlerClickAway}>
            <Box 
                sx={{position:'relative',
                    display:'inline-block',
                    lineHeight:1,
                }} 
                onMouseUp={handlerBoxMouseUp}
            >
                <DescriptionIcon
                    onClick={e => handlerIconClick(e)}
                    sx={{
                        width: rectInfo.height - rectInfo.height/4,
                        height: rectInfo.height - rectInfo.height/4,
                        verticalAlign:'bottom',
                    }}>
                </DescriptionIcon>
                <ToolsButtonGroup
                    orientation="horizontal"
                    sx={{
                        top: rectInfo.height,
                        height: rectInfo.height,
                        display:showTools?'inline-flex':'none',
                    }}
                >
                    <PagenoteAnchorContext.Provider
                        value={{
                            contentPagenote:props.pagenoteInfo,
                            setAllPagenotesInfo:props.setAllPagenotesInfo,
                            tool,
                            setTool
                        }}
                    >
                        <ToolsSetFontColor />
                        <ToolsSetBackgroundColor />
                        <ToolsSetFontBold />
                        <ToolsSetFontItalic />
                        <ToolsSetFontOverline />
                        <ToolsSetFontStrikethrough />
                        <ToolsSetFontUnderline />
                        {/* <ToolsSetCustomStyle />
                        <ToolsSetPagenote />
                        <ToolsDelete /> */}
                    </PagenoteAnchorContext.Provider>
                </ToolsButtonGroup>
            </Box>
        </ClickAwayListener>
        )
})

export default PagenoteIcon

function setEleStyle(pagenoteIcon:HTMLElement,targetEles:HTMLElement[],style:TPagenoteStyle|undefined){
    if(style==undefined) return
    pagenoteIcon.style['color']=style['color']??''
    pagenoteIcon.style['backgroundColor']=style['backgroundColor']??''
    targetEles.forEach(targetEle=>{
        for (let styleAttr in style){
            targetEle.style[styleAttr] = style[styleAttr]??''
        }
    })
}