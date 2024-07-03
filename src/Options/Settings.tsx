import { Box, Paper, Typography, styled } from "@mui/material";
import ToggleTheme from "./Component/ToggleTheme";
import ToggleFont from "./Component/ToggleFont";

const ExtensionPaper=styled(Paper)(({theme})=>({
  minHeight:'100vh',
  minWidth:'100%',
  boxShadow:theme.shadows[5],
  borderRadius:0,
  overflow:'auto',
  // borderRadius:theme.typography.htmlFontSize,
}))

const ExtensionHead=styled(Typography)(({theme})=>({
  marginTop:theme.typography.htmlFontSize,
  padding:theme.typography.htmlFontSize*0.5,
  borderRadius:`${theme.typography.htmlFontSize}px ${theme.typography.htmlFontSize}px 0 0`,
  color:theme.palette.text.primary,
  textAlign:'center',
  backgroundColor:theme.palette.primary.main,
}))

export default function Setting(){
  return (
    <Box sx={{
      width:{ xs: '100%', lg: 'calc(100vw - 310px)' },
      // minWidth:'720px',
      padding:'0 100px 0',
      
    }}>
      <ExtensionHead variant="h5">
        扩展设置
      </ExtensionHead>
      <ExtensionPaper>
        <ToggleTheme/>
        <ToggleFont/>
        <div>禁用列表</div>
      </ExtensionPaper>
      <ExtensionHead variant="h5">
        网页功能设置
      </ExtensionHead>
      <ExtensionPaper>
        <div>{'主题 > dark | light | systemDefault | extensionDefault'}</div>
        <div>{'显示note'}</div>
        <div>{'显示侧栏'}</div>
        <div>{'禁用插件'}</div>
      </ExtensionPaper>
      <ExtensionHead variant="h5">
        边栏设置
      </ExtensionHead>
      <ExtensionPaper>
      <div>{'笔记排序方法 > 创建时间 | 修改时间 | 位置'}</div>
      <div>{'存在笔记自动打开侧栏'}</div>
      <div>{'不存在笔记自动关闭侧栏'}</div>
      <div>{'编辑笔记位置 > 网页内以创建的形式编辑 | 扩展内单独编辑'}</div>
      </ExtensionPaper>
      <ExtensionHead variant="h5">
        Markdown设置
      </ExtensionHead>
      <ExtensionPaper>markdown setting</ExtensionPaper>
      <ExtensionHead variant="h5">
        备份设置
      </ExtensionHead>
      <ExtensionPaper>
      <div>{'导出笔记数据'}</div>
      <div>{'导出配置数据'}</div>
      <div>{'全部导出'}</div>
      <div>{'同步至OneDrive'}</div>
      </ExtensionPaper>
    </Box>)
}