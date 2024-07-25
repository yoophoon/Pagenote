import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { EditorContext } from '.';
import EditorTitle from './components/EditorTitle';
import { Divider } from '@mui/material';
import EditorToolBar from './components/EditorToolBar';
import EditorContent from './components/EditorContent';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


export default function EditorInpage(){
  const editorContext = React.useContext(EditorContext)
  if (editorContext == null) return
  const { editorStatus ,setEditorStatus} = editorContext
  
  const [open, setOpen] = React.useState(editorStatus.open);
  
  const handleClose = () => {
    if(editorStatus.content!==((editorStatus.fragment.prefix??'')+
                              (editorStatus.fragment.textStart??'')+
                              (editorStatus.fragment.textEnd??'')+
                              (editorStatus.fragment.suffix??'')))
    {
      const savePagenote = confirm("存在已编辑内容，是否保存")
      if(savePagenote){
        setEditorStatus(editorStatus=>({
          ...editorStatus,
          open:false,
        }))
      }
    }
    setOpen(false)
  }

  const [showTitleAndTools,setShowTitleTools]=React.useState({
    showTitle:editorStatus.showTitle,
    showTools:editorStatus.showTools,
  })

  React.useEffect(()=>{
    setShowTitleTools(setting=>({
      ...setting,
      showTitle:editorStatus.showTitle,
      showTools:editorStatus.showTools,
    }))
  },[editorStatus.showTitle,editorStatus.showTools])

  const handlerMouseEnter = (e:React.MouseEvent) => {
    console.log('mouse enter modal...')
    console.log(editorStatus)
    setShowTitleTools({
      showTitle:true,
      showTools:true,
    })
  }

  const handlerMouseLeave=(e:React.MouseEvent)=>{
    console.log('mouse leave modal...')
    setShowTitleTools({
      showTitle:editorStatus.showTitle,
      showTools:editorStatus.showTools,
    })
  }

  const handlerMouseUp=(e:React.MouseEvent<HTMLDivElement, MouseEvent>)=>{
    e.stopPropagation()
    e.preventDefault()
    console.log('resize...',e)
    console.log(editorStatus)
    const target=e.target as typeof e.currentTarget
    console.log('mouseup inpage pagenote...',target)
    // setEditorStatus(editorStatus=>({
    //   ...editorStatus,
    //   editorWidth:target.style.width,
    //   editorHeight:target.style.height,
    // }))
  }

  return (
    <div>
      <Modal
        disableEnforceFocus
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        onMouseUp={e => handlerMouseUp(e)}
      >
        <Box
          sx={{
            ...style,
            width: editorStatus.editorWidth,
            height: editorStatus.editorHeight,
          }}
          bgcolor={"background.default"}
          color={'text.primary'}
          id='pagenoteEditor'
          onMouseEnter={handlerMouseEnter}
          onMouseLeave={handlerMouseLeave}
          onMouseUp={e => handlerMouseUp(e)}
        >
          {/* <EditorSetting/> */}
          {
            showTitleAndTools.showTitle && <>
              <EditorTitle />
              <Divider aria-hidden="false" />
            </>}
          {
            showTitleAndTools.showTools && <>
              <EditorToolBar />
              <Divider aria-hidden="false" />
            </>}
          <EditorContent showTitleAndTools={showTitleAndTools} />
        </Box>
      </Modal>
    </div>
  );
}

