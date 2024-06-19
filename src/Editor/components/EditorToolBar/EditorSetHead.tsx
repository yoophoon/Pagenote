import { IconButton, SvgIcon, Tooltip, Zoom } from '@mui/material'
import SetHead from '../../../assets/svg/Head'
import { EditorContext } from '../..'
import { useContext } from 'react'
export default function EditorSetHead() {
  const editorContext = useContext(EditorContext)
  if (editorContext == null) return
  const { editorStatus, setEditorStatus } = editorContext

  const handlerSetHeadClick = () => {
    const { selectStart, selectEnd, content } = editorStatus
    let newContent = ''
    if (selectStart == selectEnd) {
      if (content.slice(0, selectStart).replace(/ /g,'').endsWith('\n')||
          content.slice(0, selectStart).replace(/ /g,'')=='') {
        newContent =  content.slice(0, selectStart) +
                      '# ' +
                      content.slice(selectStart)
      } else {
        newContent =  content.slice(0, selectStart) +
                      '\n# ' + 
                      content.slice(selectStart)
      }
    } else {
      if (content.slice(0, selectStart).replace(/ /g,'').endsWith('\n')||
          content.slice(0, selectStart).replace(/ /g,'')=='') {
        newContent =  content.slice(0, selectStart) + 
                      '# ' + 
                      content.slice(selectStart, selectEnd) + 
                      '\n' +
                      content.slice(selectEnd)
      } else {
        newContent =  content.slice(0, selectStart) + 
                      '\n# ' + 
                      content.slice(selectStart, selectEnd) + 
                      '\n' +
                      content.slice(selectEnd)
      }
    }
    setEditorStatus(editorStatus=>({
      ...editorStatus,
      content:newContent,
    }))
  }

  return (
    <Tooltip title="标题" TransitionComponent={Zoom} arrow>
      <IconButton
        edge="start"
        color='secondary'
        onClick={handlerSetHeadClick}>
        <SvgIcon component={SetHead} inheritViewBox fontSize="small" />
      </IconButton>
    </Tooltip>)
}