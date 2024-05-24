import { ButtonGroup, ClickAwayListener, styled } from '@mui/material';
import ToolsSetBackgroundColor from './PagenoteToolsButton/ToolsSetBackgroundColor';
import ToolsSetFontColor from './PagenoteToolsButton/ToolsSetFontColor';
import { Dispatch, createContext, useEffect, useState } from 'react';

const ToolsButtonGroup = styled(ButtonGroup)(({ theme }) => ({
    ...theme.palette.text,
    color: 'text.primary',
    backgroundColor: '#0000',
    borderSpacing: 'solid',
    borderWidth: 1,
    borderColor: 'text.secondary',
    position: 'absolute',
    zIndex: 999,
    left: 0,
    transform: 'translateX(-50%)',
    gap: 5,
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

type TPagenoteAnchorContext = {
    style: IPagenoteAnchorStyle,
    setStyle: Dispatch<IPagenoteAnchorStyle>
}

export const PagenoteAnchorContext = createContext<TPagenoteAnchorContext | null>(null)

export function PagenoteTools(props: any) {
    const { currentCssInfo, rectInfo, currentPagenoteAnchor, currentRoot, currentRootEle } = props

    const handlerClickAway = () => {
        //移除选中文字
        window.getSelection()?.removeAllRanges()
        //清除pagenoteTools渲染的内容并将这个节点移至body外
        if (currentRootEle.innerHTML != '') {
            currentRoot.unmount()
        }
        document.documentElement.appendChild(currentRootEle)
        //处理pagenoteanchor节点
        if (currentPagenoteAnchor[0].getAttribute('style') != null) {
            alert('创建笔记成功')
        } else {
            alert('创建笔记失败')
        }
    }

    const handlerMouseUp = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
    }

    const [style, setStyle] = useState<IPagenoteAnchorStyle>({
        color: currentCssInfo.color,
        backgroundColor: currentCssInfo.backgroundColor,
        display: currentCssInfo.display,
        fontWeight: currentCssInfo.fontWeight,
    })

    useEffect(() => {
        for (let i = 0; i < currentPagenoteAnchor.length; i++) {
            for (const property in style) {
                currentPagenoteAnchor[i].style[property] = style[property]
            }
        }
    }, [style])

    return (<>
        <ClickAwayListener onClickAway={handlerClickAway}>
            <ToolsButtonGroup sx={{ top: rectInfo.height }} onMouseUp={e => handlerMouseUp(e)}>
                <PagenoteAnchorContext.Provider
                    value={{
                        style,
                        setStyle
                    }}>
                    <ToolsSetFontColor {...props} style={style} setStyle={setStyle} />
                    <ToolsSetBackgroundColor {...props} />
                </PagenoteAnchorContext.Provider>
            </ToolsButtonGroup>
        </ClickAwayListener>
    </>
    )
}
