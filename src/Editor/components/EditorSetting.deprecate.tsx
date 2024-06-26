import { memo, useContext, useState } from "react"
import { EditorContext } from ".."
import { Box } from "@mui/material"
import zIndex from "@mui/material/styles/zIndex"
import { Opacity } from "@mui/icons-material"

const style={
  position:'absolute',
  right:33,
  top:10,
  zIndex:999,
  opacity:'0.5',
}

const EditorSetting=memo(()=> {
  const editorContext = useContext(EditorContext)
  if (editorContext == null) return
  const { editorStatus, setEditorStatus } = editorContext
  
  const [hideTitle,setHideTitle]=useState(!editorStatus.showTitle)
  const [hideTools,setHideTools]=useState(!editorStatus.showTools)
  return (
    <Box sx={{...style}}>
      <label>
        <input
          key={Math.random()}
          type="checkbox"
          name="hide title"
          checked={hideTitle}
          onChange={function () {
            setHideTitle(!hideTitle)
            setEditorStatus(editorStatus => ({
              ...editorStatus,
              showTitle: !editorStatus.showTitle,
            }))
          }}
        />{' '}
        hide title
      </label>
      <br></br>
      <label>
        <input
          key={Math.random()}
          type="checkbox"
          name="hide tools"
          checked={hideTools}
          onChange={function () {
            setHideTools(!hideTools)
            setEditorStatus(editorStatus => ({
              ...editorStatus,
              showTools: !editorStatus.showTools,
            }))
          }}
        />{' '}
        hide tools
      </label>
    </Box>
  )
})
export default EditorSetting