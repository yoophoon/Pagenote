import DescriptionIcon from '@mui/icons-material/Description';
import { Box, ButtonGroup, ClickAwayListener, styled } from '@mui/material';
import { Fragment, createContext, memo, useEffect, useMemo, useRef, useState } from 'react';
import { EOperation, EPosition, TPagenote, TPagenoteStyle,  TSetContentPagenotes } from "../../pagenoteTypes"
import ToolsSetFontColor from './PagenoteToolsButton/ToolsSetFontColor';
import ToolsSetBackgroundColor from './PagenoteToolsButton/ToolsSetBackgroundColor';
import ToolsSetFontBold from './PagenoteToolsButton/ToolsSetFontBold';
import ToolsSetFontItalic from './PagenoteToolsButton/ToolsSetFontItalic';
import ToolsSetFontOverline from './PagenoteToolsButton/ToolsSetFontOverline';
import ToolsSetFontStrikethrough from './PagenoteToolsButton/ToolsSetFontStrikethrough';
import ToolsSetFontUnderline from './PagenoteToolsButton/ToolsSetFontUnderline';
import ToolsSetPagenote from './PagenoteToolsButton/ToolsSetPagenote';
import ToolsDelete from './PagenoteToolsButton/ToolsDelete';
import Editor from '../../Editor'
import { createPortal } from 'react-dom';
import { getClosestBlock } from '../../lib/DOMOperation';

type TPagenoteIcon = {
  contentPagenote: TPagenote,
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
    //当前的pagenote信息
    contentPagenote:TPagenote,
    //用于设置当前pagenote的信息
    setContentPagenote:React.Dispatch<React.SetStateAction<TPagenote>>,
    //设置当前页面所有pagenote，主要用于删除当前pagenote
    setAllPagenotesInfo: TSetContentPagenotes,
    //当前pagenoteTools的面板，如果未使用面板的功能tool应该为''
    tool: TTool,
    //setTool函数主要用于驱动pagenoteTools各面板切换，如：setFontColor、setBackgroundColor、setPagenote对应三个面板
    setTool: React.Dispatch<React.SetStateAction<TTool>>
}

export const PagenoteAnchorContext = createContext<TPagenoteAnchorContext | null>(null)

const PagenoteIcon = memo((props: TPagenoteIcon) => {

  //组件状态设置
  //--------------------------------------------------------------------------
  //
  const [contentPagenote, setContentPagenote] = useState(props.contentPagenote)
  const [tool, setTool] = useState<TTool>('')

  //获取pagenoteAnchor、pagenoteIcon和rectInfo
  //方便后续更新pagenoteAnchor的样式            考虑到这个组件会频繁的更新所以这里采用useMemo()存储获取的信息
  const [pagenoteAnchors, pagenoteIcon] = useMemo(() => {
    //包含当前pagenoteFragment.textStart文本的一系列节点
    const pagenoteAnchors = Array.from(document.querySelectorAll(`pagenoteanchor[data-pagenoteid="${props.contentPagenote.pagenoteID}"]`))
    //pagenoteAnchors节点后面跟随的图标，用于响应后续弹出pagenoteTools
    const pagenoteIcon = document.querySelector(`pagenoteicon[data-pagenoteid="${props.contentPagenote.pagenoteID}"]`) as HTMLElement
    //最后一个节点的宽高信息，主要使用rectInfo.height设置pagenoteTools的位置
    if(pagenoteAnchors.length>=1){
      console.log(pagenoteAnchors)
      const rectInfo = pagenoteAnchors[pagenoteAnchors.length - 1].getBoundingClientRect()
      pagenoteIcon.style.paddingLeft=rectInfo.height+'px'
      setContentPagenote(contentPagenote => {
        return ({
          ...contentPagenote,
          anchorPositionX: getToolsSuitablePositionX(window.scrollX + rectInfo.left + rectInfo.width, 272),
          anchorPositionY: window.scrollY + rectInfo.top + rectInfo.height,
        })
      })
    }
    console.log('pagenote信息',contentPagenote,pagenoteIcon)
    return [pagenoteAnchors, pagenoteIcon]
  },[])

  // const [rectInfo,setRectInfo]=useState(pagenoteAnchors[pagenoteAnchors.length - 1].getBoundingClientRect())

  useEffect(()=>{
    const resetToolsPosition=contentPagenote.pagenoteIndex>=0?()=>{
      const rectInfo = pagenoteAnchors[pagenoteAnchors.length - 1].getBoundingClientRect()
      setContentPagenote(contentPagenote => {
        return ({
          ...contentPagenote,
          anchorPositionX: getToolsSuitablePositionX(window.scrollX + rectInfo.left + rectInfo.width, 272),
          anchorPositionY: window.scrollY + rectInfo.top + rectInfo.height,
        })
      })
    }:()=>{}

    // resetToolsPosition()
    window.addEventListener('resize',resetToolsPosition)

    return ()=>{
      window.removeEventListener('resize',resetToolsPosition)
    }
  },[])

  //监听contentPagenote.showEditor
  //如果为真的话就直接在页面上显示editor的内容
  useEffect(() => {
    if (props.contentPagenote.showEditor) {
      setTool('setPagenote')
    }
    setContentPagenote(contentPagenote=>({
      ...contentPagenote,
      showEditor:props.contentPagenote.showEditor,
      showEditorTitle:props.contentPagenote.showEditorTitle,
      showEditorTools:props.contentPagenote.showEditorTools,
    }))
  }, [props.contentPagenote])

  const closestBlockProperty=useRef<{computedOverflow?:string,styleOverflow:string}>({styleOverflow:''})
  //检测是否需要将最近块级父元素overflow设置为hidden
  useEffect(()=>{
    const currentEle=document.querySelector(`pagenoteicon[data-pagenoteid="${contentPagenote.pagenoteID}"]`)
    const closestBlock=currentEle&&getClosestBlock(currentEle)
    if(tool=='setPagenote' && contentPagenote.editorPosition==EPosition.afterPagenoteFragment){
      if(closestBlock){
        closestBlockProperty.current.styleOverflow=closestBlock.style.overflow
        closestBlockProperty.current.computedOverflow=window.getComputedStyle(closestBlock).overflow
        if(closestBlockProperty.current.computedOverflow=='visible'){
          closestBlock.style.overflow='auto'
        }
        console.log('closestBlockProperty.current...',closestBlockProperty.current)
      }
    }
    if(tool=='' && contentPagenote.editorPosition==EPosition.afterPagenoteFragment){
      if(closestBlock&&closestBlockProperty.current.computedOverflow!=closestBlock.style.overflow){
        closestBlockProperty.current.styleOverflow==''?
        closestBlock.style.removeProperty('overflow'):
        closestBlock.style.overflow=closestBlockProperty.current.styleOverflow
      }
    }
  },[tool])

  //检测更新pagenoteAnchor和pagenoteIcon的样式
  useEffect(() => {
    setEleStyle(pagenoteIcon as HTMLElement, pagenoteAnchors as HTMLElement[], contentPagenote.pagenoteStyle)
  }, [contentPagenote.pagenoteStyle])

  //单击pagenoteIcon唤出pagenoteTools面板
  const handlerIconClick = (event: React.MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()
    console.log('tools icon click')
    // setSaveContentPagenote(true)
    contentPagenote.pagenoteIndex>=0&&setContentPagenote(contentPagenote => ({ 
      ...contentPagenote, 
      showTools: true, 
      anchorPositionX:getToolsSuitablePositionX(window.scrollX+pagenoteAnchors[pagenoteAnchors.length - 1].getBoundingClientRect().left+pagenoteAnchors[pagenoteAnchors.length - 1].getBoundingClientRect().width,272),
      anchorPositionY:window.scrollY+pagenoteAnchors[pagenoteAnchors.length - 1].getBoundingClientRect().top+pagenoteAnchors[pagenoteAnchors.length - 1].getBoundingClientRect().height,
    }))
    setTool('')
    window.getSelection()?.removeAllRanges()
  }

  //避免触发在上级组件中定义的document.onMouseUp事件
  const handlerBoxMouseUp = (event: React.MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()
    window.getSelection()?.removeAllRanges()
  }

  const handlerClickAway = () => {
    console.log(props.contentPagenote,contentPagenote,'clickaway')
    //判断当前pagenote是否有效，并对相关元素和状态进行处理
    if (//检测pagenoteStyle是否存在，如果存在说明设置了pagenoteAnchor的样式
        ( contentPagenote.pagenoteStyle &&
          ( contentPagenote.pagenoteStyle.color||
            contentPagenote.pagenoteStyle.backgroundColor||
            contentPagenote.pagenoteStyle.fontWeight||
            contentPagenote.pagenoteStyle.fontStyle||
            contentPagenote.pagenoteStyle.textDecoration))||
        //检测pagenoteContent是否与默认的pagenoteContent相同
        contentPagenote.pagenoteContent != ((contentPagenote.pagenoteFragment?.prefix??'')+
                                            (contentPagenote.pagenoteFragment?.textStart??'')+
                                            (contentPagenote.pagenoteFragment?.textEnd??'')+
                                            (contentPagenote.pagenoteFragment?.suffix??'')) ||
        //检测pagenoteTitle是否与默认的pagenoteTitle相同
        contentPagenote.pagenoteTitle != props.contentPagenote.pagenoteTitle
    ) {
      //符合上述条件的pagenoteContent会被认为是一个有效的pagenote
      setTool('')
      setContentPagenote(contentPagenote => {
        chrome.runtime.sendMessage({operation:EOperation.savePagenote,value:{ ...contentPagenote, showTools: false, }})
        return ({ ...contentPagenote, showTools: false, })
      })
    } else {
      props.setAllPagenotesInfo(allPagenotesInfo => {
        return allPagenotesInfo.filter(pagenote => pagenote?.contentPagenote.pagenoteID != contentPagenote.pagenoteID)
      })
      pagenoteIcon?.remove()
      pagenoteAnchors.forEach(pagenoteAnchor => pagenoteAnchor.outerHTML = pagenoteAnchor.innerHTML)
    }
  }

  return (
    <PagenoteAnchorContext.Provider
      value={{
        contentPagenote,
        setContentPagenote,
        setAllPagenotesInfo: props.setAllPagenotesInfo,
        tool,
        setTool
      }}
    >
      {
        tool != 'setPagenote'&&contentPagenote.showEditor==false ?
          <Fragment>
            {
              pagenoteIcon&&
              createPortal(<DescriptionIcon
                onClick={e => handlerIconClick(e)}
                sx={{
                  width: pagenoteAnchors[pagenoteAnchors.length - 1].getBoundingClientRect().height,
                  height: pagenoteAnchors[pagenoteAnchors.length - 1].getBoundingClientRect().height,
                  position:'absolute',
                  top:0,
                  left:0,
                }}>
              </DescriptionIcon>,
                pagenoteIcon)
            }
            {
                  contentPagenote.showTools ?
            <ClickAwayListener onClickAway={handlerClickAway}>
              <Box
                sx={{
                  display: 'inline-block',
                  lineHeight: 1,
                }}
                onMouseUp={handlerBoxMouseUp}
              >
                
                    <ToolsButtonGroup
                      orientation="horizontal"
                      sx={{
                        // top: window.scrollY+rectInfo.top+rectInfo.height,
                        // left: getToolsSuitablePositionX(window.scrollX+rectInfo.left+rectInfo.width,272),
                        top:contentPagenote.anchorPositionY,
                        left:contentPagenote.anchorPositionX,
                        height: pagenoteAnchors[pagenoteAnchors.length - 1].getBoundingClientRect().height,
                        display: 'inline-flex',
                        zIndex: 999,
                        overflow: 'visible',
                      }}
                    >
                      <ToolsSetFontColor fontColor={contentPagenote.pagenoteStyle?.color} />
                      <ToolsSetBackgroundColor backgroundColor={contentPagenote.pagenoteStyle?.backgroundColor} />
                      <ToolsSetFontBold />
                      <ToolsSetFontItalic />
                      <ToolsSetFontOverline overline={contentPagenote.pagenoteStyle?.textDecoration ?? ''} />
                      <ToolsSetFontStrikethrough strikethrough={contentPagenote.pagenoteStyle?.textDecoration ?? ''} />
                      <ToolsSetFontUnderline underline={contentPagenote.pagenoteStyle?.textDecoration ?? ''} />
                      {/* <ToolsSetCustomStyle /> */}
                      <ToolsSetPagenote />
                      <ToolsDelete />
                    </ToolsButtonGroup> 
              </Box>
            </ClickAwayListener>: ''
                }
          </Fragment> :
          ( contentPagenote.editorPosition == EPosition.afterPagenoteFragment &&
            pagenoteIcon ? createPortal(<Editor />, pagenoteIcon) : <Editor />)
      }
    </PagenoteAnchorContext.Provider>
  )
})

export default PagenoteIcon

/**
 * 给pagenoteAnchors和pagenoteIcon设置样式
 * @param pagenoteIcon pagenoteTools的容器元素
 * @param targetEles pagenoteAnchors，匹配contentPagenote的pagenoteFragment内容
 * @param style 需要设置的样式
 * @returns 函数没有返回值
 */
function setEleStyle(pagenoteIcon: HTMLElement, targetEles: HTMLElement[], style: TPagenoteStyle | undefined) {
  //如果样式未定义则直接返回
  if (style == undefined || pagenoteIcon==undefined) return
  //pagenoteIcon仅设置字体颜色和背景颜色
  pagenoteIcon.style['color'] = style['color'] ?? ''
  pagenoteIcon.style['backgroundColor'] = style['backgroundColor'] ?? ''
  //将style的每项值都赋给pagenoteAnchors的元素
  targetEles.forEach(targetEle => {
    for (let styleAttr in style) {
      targetEle.style[styleAttr] = style[styleAttr] ?? ''
    }
  })
}
/**
 * 这个函数获取一个横向坐标避免pagenoteTools超出屏幕
 * @param originPositionX 原始的横向位置
 * @param toolsWidth pagenoteTools的宽度
 * @returns 新的位置
 */
function getToolsSuitablePositionX(originPositionX:number,toolsWidth:number){
  let newX=toolsWidth
  if(originPositionX<=toolsWidth/2){
    newX=toolsWidth/2
  }else if(originPositionX>toolsWidth/2&&originPositionX < document.documentElement.clientWidth-toolsWidth/2){
    newX=originPositionX
  }else if(originPositionX>=document.documentElement.clientWidth-toolsWidth/2){
    newX=document.documentElement.clientWidth-toolsWidth/2
  }
  return newX
}