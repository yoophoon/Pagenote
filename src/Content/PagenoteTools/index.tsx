import { ButtonGroup, ClickAwayListener, styled } from '@mui/material';
import ToolsSetBackgroundColor from './PagenoteToolsButton/ToolsSetBackgroundColor';
import ToolsSetFontColor from './PagenoteToolsButton/ToolsSetFontColor';
import { Dispatch, createContext, useEffect, useMemo, useState } from 'react';
import ToolsSetFontBold from './PagenoteToolsButton/ToolsSetFontBold';
import ToolsSetFontItalic from './PagenoteToolsButton/ToolsSetFontItalic';
import ToolsSetFontOverline from './PagenoteToolsButton/ToolsSetFontOverline';
import ToolsSetFontStrikethrough from './PagenoteToolsButton/ToolsSetFontStrikethrough';
import ToolsSetFontUnderline from './PagenoteToolsButton/ToolsSetFontUnderline';
import ToolsSetCustomStyle from './PagenoteToolsButton/ToolsSetCustomStyle';
import ToolsSetPagenote from './PagenoteToolsButton/ToolsSetPagenote';
import ToolsDelete from './PagenoteToolsButton/ToolsDelete';

const ToolsButtonGroup = styled(ButtonGroup)(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: theme.palette.secondary.main,
    borderRadius: 10,
    position: 'absolute',
    zIndex: 999,
    left: 0,
    transform: 'translateX(-50%)',
    gap: 0,
    minHeight: 30,
    height: 30
}))

interface IPagenoteAnchorStyle {
    color?: string,
    fontWeight?: string,
    fontStyle?: string,
    //文字装饰
    textDecorationColor?: string,
    textDecorationStyle?: string,
    textDecorationThickness?: string,
    textDecorationLine?: string,
    //显示样式
    display?: string,
    backgroundColor?: string,
    [key: string]: string | undefined
}
type TTool = '' | 'setFontColor' | 'setBackgroundColor' | 'setFontBold' | 'setFontItalic' | 'setFontOverline' | 'setFontStrikethrough' | 'setFontUnderline' | 'setCustomStyle' | 'setPagenote' | 'delete'
type TPagenoteAnchorContext = {
    style: IPagenoteAnchorStyle,
    setStyle: Dispatch<IPagenoteAnchorStyle>,
    tool: TTool,
    setTool: Dispatch<TTool>
}

export const PagenoteAnchorContext = createContext<TPagenoteAnchorContext | null>(null)

export function PagenoteTools(props: any) {
    //pagenoteID            当前pagenote的唯一标识符，用于获取pagenote相关信息
    //pagenoteToolsRoot     pagenoteTools的React.Root，用于当删除当前pagenote时卸载pagenoteTools
    //pagenoteIconRoot      pagenoteIcon的React.Root，用于当删除当前pagenote时卸载pagenoteIcon
    const { pagenoteID} = props
    //缓存数据避免重复操作
    const [ pagenoteAnchors, pagenoteIcon, rectInfo] = useMemo(() => {
        //pagenoteAnchors       包含当前pagenoteFragment.textStart文本的一系列节点
        const pagenoteAnchors = document.querySelectorAll(`pagenoteanchor:not([pagenoteid])`).length == 0 ? document.querySelectorAll(`pagenoteanchor[pagenoteid="${pagenoteID}"]`) : document.querySelectorAll(`pagenoteanchor:not([pagenoteid])`)
        //pagenoteIcon          pagenoteAnchors节点后面跟随的图标，用于响应后续弹出pagenoteTools
        const pagenoteIcon = document.querySelector(`pagenoteicon[pagenoteid="${pagenoteID}"]`)
        //rectInfo              最后一个节点的宽高信息，主要使用rectInfo.height设置pagenoteTools的位置
        const rectInfo = pagenoteAnchors[pagenoteAnchors.length - 1].getBoundingClientRect()
        return [ pagenoteAnchors, pagenoteIcon, rectInfo]
    }, [pagenoteID])



    //响应点击工具框内部的情况
    const handlerMouseUp = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        //如果在pageotetools中触发点击事件的话就认为需要生成pagenote，
        //这时为每个pagenoteanchor添加自定义属性pagenoteID
        pagenoteAnchors.forEach((pagenoteAnchor: Element) => {
            pagenoteAnchor.setAttribute('pagenoteID', pagenoteID.toString())
        })
    }

    const [style, setStyle] = useState<IPagenoteAnchorStyle>({
        // color: currentCssInfo.color,
        // backgroundColor: currentCssInfo.backgroundColor,
        // display: currentCssInfo.display,
        // fontWeight: currentCssInfo.fontWeight,
    })

    const [tool, setTool] = useState<TTool>('')


    return (<ToolsButtonGroup
                sx={{
                    top: rectInfo.height,
                }}
                onMouseUp={e => handlerMouseUp(e)}
            >
                <PagenoteAnchorContext.Provider
                    value={{
                        style,
                        setStyle,
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
                    <ToolsSetCustomStyle />
                    <ToolsSetPagenote />
                    <ToolsDelete />
                </PagenoteAnchorContext.Provider>
            </ToolsButtonGroup>
    )
}
