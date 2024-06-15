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
import Editor from '../../Editor'

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

const PagenoteIcon = memo((props: TPagenoteIcon) =>{
    //缓存数据避免重复操作
    const [ pagenoteAnchors, pagenoteIcon, rectInfo] = useMemo(() => {
        //pagenoteAnchors       包含当前pagenoteFragment.textStart文本的一系列节点
        const pagenoteAnchors = Array.from(document.querySelectorAll(`pagenoteanchor[pagenoteid="${props.contentPagenote.pagenoteID}"]`))
        //pagenoteIcon          pagenoteAnchors节点后面跟随的图标，用于响应后续弹出pagenoteTools
        const pagenoteIcon = document.querySelector(`pagenoteicon[pagenoteid="${props.contentPagenote.pagenoteID}"]`)
        //rectInfo              最后一个节点的宽高信息，主要使用rectInfo.height设置pagenoteTools的位置
        const rectInfo = pagenoteAnchors[pagenoteAnchors.length - 1].getBoundingClientRect()
        return [ pagenoteAnchors, pagenoteIcon, rectInfo]
    }, [])
    
    useEffect(()=>{
      if(props.contentPagenote.showEditor){
        setTool('setPagenote')
      }
    },[props.contentPagenote.showEditor])

    useEffect(()=>{
        setEleStyle(pagenoteIcon as HTMLElement,pagenoteAnchors as HTMLElement[],props.contentPagenote.pagenoteStyle)
        console.log(props.contentPagenote.pagenoteStyle)
    },[props.contentPagenote.pagenoteStyle])

    const [saveContentPagenote,setSaveContentPagenote]=useState(false)
    const [contentPagenote,setContentPagenote]=useState(props.contentPagenote)
    const [tool, setTool] = useState<TTool>('')
    const [showTools,setShowTools]=useState(props.contentPagenote.showTools)
    const handlerIconClick = (event: React.MouseEvent) => {
        event.preventDefault()
        event.stopPropagation()
        console.log('tools icon click')
        // setSaveContentPagenote(true)
        setShowTools(true)
        props.setAllPagenotesInfo(pagenotesInfo=>{
          return pagenotesInfo.map(pagenoteInfo=>{
            if(pagenoteInfo?.contentPagenote.pagenoteID==props.contentPagenote.pagenoteID){
              pagenoteInfo={
                ...pagenoteInfo,
                contentPagenote:{
                  ...pagenoteInfo.contentPagenote,
                  showTools:true
                }
              }
            }
            console.log('icon click style',pagenoteInfo)
            return pagenoteInfo
          })
        })
        setTool('')
        window.getSelection()?.removeAllRanges()
    }

    const handlerBoxMouseUp = (event: React.MouseEvent) => {
        event.preventDefault()
        event.stopPropagation()
        console.log('tools box mouseup')
        setSaveContentPagenote(true)
        window.getSelection()?.removeAllRanges()
    }

    const handlerClickAway=()=>{
        if(saveContentPagenote){
            setTool('')
            setShowTools(false)
            props.setAllPagenotesInfo(pagenotesInfo=>{
              return pagenotesInfo.map(pagenoteInfo=>{
                if(pagenoteInfo?.contentPagenote.pagenoteID==props.contentPagenote.pagenoteID){
                  pagenoteInfo.contentPagenote.showTools=false
                }
                console.log('click away',pagenoteInfo)
                return pagenoteInfo
              })
            })
        }else{
            props.setAllPagenotesInfo(allPagenotesInfo=>{
                return allPagenotesInfo.filter(pagenote=>pagenote?.contentPagenote.pagenoteID!=props.contentPagenote.pagenoteID)
            })
            pagenoteIcon?.remove()
            pagenoteAnchors.forEach(pagenoteAnchor=>pagenoteAnchor.outerHTML=pagenoteAnchor.innerHTML)
        }
    }

    console.log(props.contentPagenote.showTools,'工具栏显示')
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
        tool != 'setPagenote' ? <ClickAwayListener onClickAway={handlerClickAway}>
          <Box
            sx={{
              position: 'relative',
              display: 'inline-block',
              lineHeight: 1,
            }}
            onMouseUp={handlerBoxMouseUp}
          >
            <DescriptionIcon
              onClick={e => handlerIconClick(e)}
              sx={{
                width: rectInfo.height - rectInfo.height / 4,
                height: rectInfo.height - rectInfo.height / 4,
                verticalAlign: 'bottom',
              }}>
            </DescriptionIcon>{
            showTools ?
              <ToolsButtonGroup
                orientation="horizontal"
                sx={{
                  top: rectInfo.height,
                  height: rectInfo.height,
                  display: 'inline-flex',
                }}
              >
                <ToolsSetFontColor />
                <ToolsSetBackgroundColor />
                <ToolsSetFontBold />
                <ToolsSetFontItalic />
                <ToolsSetFontOverline />
                <ToolsSetFontStrikethrough />
                <ToolsSetFontUnderline />
                {/* <ToolsSetCustomStyle /> */}
                <ToolsSetPagenote />
                <ToolsDelete />
              </ToolsButtonGroup>:''
            }
          </Box>
          </ClickAwayListener>:
        <Editor />
        }
      </PagenoteAnchorContext.Provider>
    
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