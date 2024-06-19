import { FormatColorFill } from "@mui/icons-material";
import {  IconButton, Tooltip, Zoom } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { ColorPicker } from "../../../Components/ColorPicker";
import { PagenoteAnchorContext } from '../PagenoteIcon'

type backgroundColor={
  backgroundColor:string|undefined
}
/**
 * 这个组件用于设置pagenoteAnchors的背景颜色
 * @returns 一个设置pagenoteAnchor背景颜色的按钮，单击调出colorPicker
 */
export default function ToolsSetBackgroundColor({backgroundColor}:backgroundColor) {
  const AnchorContext = useContext(PagenoteAnchorContext)
  if (AnchorContext == null) return

  const { setContentPagenote, tool, setTool } = AnchorContext
  const [color, setColor] = useState(backgroundColor)
  const userColorPicker = tool == 'setBackgroundColor' ? <ColorPicker color={color} setColor={setColor}></ColorPicker> : null

  useEffect(() => {
    setContentPagenote(contentPagenote=>({
      ...contentPagenote,
      pagenoteStyle:{
        ...contentPagenote.pagenoteStyle,
        backgroundColor:color
      }
    }))
  }, [color])

  const handlerBackgroundColorClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    window.getSelection()?.removeAllRanges()
    setTool('setBackgroundColor')
  }

  return (
    <IconButton
      color='secondary'
      onClick={handlerBackgroundColorClick}
      sx={{
        position: 'relative',
        width: 30,
        height: '100%',
      }}
    >
      <Tooltip title="设置背景颜色" TransitionComponent={Zoom} arrow>
        <FormatColorFill > </FormatColorFill>
      </Tooltip>
      {userColorPicker}
    </IconButton>)
}


