import { ButtonGroup, IconButton, SvgIcon, Tooltip, Zoom } from '@mui/material'
import SetTable from '../../../assets/svg/Table'
import { FormatListNumbered } from '@mui/icons-material'
// import EditorSaveContent from './EditorSaveContent'
import EditorMarkup from './EditorRenderMarkup'
import EditorClose from './EditorClose'
export default function EditorToolBar() {
    return (
        <ButtonGroup>
            <EditorSetHead />
            <EditorToolSplit />
            <EditorSetBold />
            <EditorToolSplit />
            <EditorSetItaly />
            <EditorToolSplit />
            <EditorSetDeleteline />
            <EditorToolSplit />
            <EditorSetSetLink />
            <EditorToolSplit />
            <EditorSetUL />
            <EditorToolSplit />
            <EditorSetOL />
            <EditorToolSplit />
            <EditorSetCheckItem />
            <EditorToolSplit />
            <EditorSetReference />
            <EditorToolSplit />
            <EditorSetHr />
            <EditorToolSplit />
            <EditorSetCodeBlock />
            <EditorToolSplit />
            <EditorSetCodeInline />
            <EditorToolSplit />
            <EditorSetTable />
            <EditorToolSplit />
            <EditorMarkup />
            <EditorToolSplit />
            <EditorClose />
            {/* <EditorSaveContent /> */}
        </ButtonGroup>)
}



import SetBold from '../../../assets/svg/Bold'
function EditorSetBold() {
    return (
        <Tooltip title="加粗" TransitionComponent={Zoom} arrow>
            <IconButton edge="start" color='secondary'>
                <SvgIcon component={SetBold} inheritViewBox fontSize="small" />
            </IconButton>
        </Tooltip>)
}

import SetItaly from '../../../assets/svg/Italy'
function EditorSetItaly() {
    return (
        <Tooltip title="斜体" TransitionComponent={Zoom} arrow>
            <IconButton edge="start" color='secondary'>
                <SvgIcon component={SetItaly} inheritViewBox fontSize="small" />
            </IconButton>
        </Tooltip>)
}

import SetDeleteline from '../../../assets/svg/Deleteline'
function EditorSetDeleteline() {
    return (
        <Tooltip title="删除线" TransitionComponent={Zoom} arrow>
            <IconButton edge="start" color='secondary'>
                <SvgIcon component={SetDeleteline} inheritViewBox fontSize="small" sx={{ width: 16, height: 16 }} />
            </IconButton>
        </Tooltip>)
}

import SetLink from '../../../assets/svg/Link'
function EditorSetSetLink() {
    return (
        <Tooltip title="超链接" TransitionComponent={Zoom} arrow>
            <IconButton edge="start" color='secondary'>
                <SvgIcon component={SetLink} inheritViewBox fontSize="small" sx={{ width: 15, height: 15 }} />
            </IconButton>
        </Tooltip>)
}

import ToolSplit from '../../../assets/svg/Verticalline'
function EditorToolSplit() {
    return (
        <IconButton edge="start" disabled>
            <SvgIcon component={ToolSplit} inheritViewBox fontSize="small" sx={{ width: 16, height: 16 }} />
        </IconButton>
    )
}


import SetUL from '../../../assets/svg/Unorderlist'
function EditorSetUL() {
    return (
        <Tooltip title="无序列表" TransitionComponent={Zoom} arrow>
            <IconButton edge="start" color='secondary'>
                <SvgIcon component={SetUL} inheritViewBox fontSize="small" sx={{ width: 15, height: 15 }} />
            </IconButton>
        </Tooltip>)
}

function EditorSetOL() {
    return (
        <Tooltip title="有序列表" TransitionComponent={Zoom} arrow>
            <IconButton edge="start" color='secondary'>
                <FormatListNumbered sx={{ width: 20, height: 20 }} />
            </IconButton>
        </Tooltip>)
}

import SetCheckItem from '../../../assets/svg/Checkedbox'
function EditorSetCheckItem() {
    return (
        <Tooltip title="待办" TransitionComponent={Zoom} arrow>
            <IconButton edge="start" color='secondary'>
                <SvgIcon component={SetCheckItem} inheritViewBox fontSize="small" sx={{ width: 16, height: 16 }} />
            </IconButton>
        </Tooltip>)
}

import SetReference from '../../../assets/svg/Reference'
function EditorSetReference() {
    return (
        <Tooltip title="引用" TransitionComponent={Zoom} arrow>
            <IconButton edge="start" color='secondary'>
                <SvgIcon component={SetReference} inheritViewBox fontSize="small" sx={{ width: 16, height: 16 }} />
            </IconButton>
        </Tooltip>)
}

import SetHr from '../../../assets/svg/Line'
function EditorSetHr() {
    return (
        <Tooltip title="分割线" TransitionComponent={Zoom} arrow>
            <IconButton edge="start" color='secondary'>
                <SvgIcon component={SetHr} inheritViewBox fontSize="small" sx={{ width: 16, height: 16 }} />
            </IconButton>
        </Tooltip>)
}

import SetCodeBlock from '../../../assets/svg/Codeblock'
function EditorSetCodeBlock() {
    return (
        <Tooltip title="块代码" TransitionComponent={Zoom} arrow>
            <IconButton edge="start" color='secondary'>
                <SvgIcon component={SetCodeBlock} inheritViewBox fontSize="small" sx={{ width: 16, height: 16 }} />
            </IconButton>
        </Tooltip>)
}

import SetCodeInline from '../../../assets/svg/Codeinline'
import EditorSetHead from './EditorSetHead'
function EditorSetCodeInline() {
    return (
        <Tooltip title="行内代码" TransitionComponent={Zoom} arrow>
            <IconButton edge="start" color='secondary'>
                <SvgIcon component={SetCodeInline} inheritViewBox fontSize="small" sx={{ width: 16, height: 16 }} />
            </IconButton>
        </Tooltip>)
}

function EditorSetTable() {
    return (
        <Tooltip title="表格" TransitionComponent={Zoom} arrow>
            <IconButton edge="start" color='secondary'>
                <SvgIcon component={SetTable} inheritViewBox fontSize="small" sx={{ width: 16, height: 16 }} />
            </IconButton>
        </Tooltip>)
}

