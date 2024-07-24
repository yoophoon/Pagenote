import * as React from 'react';
import ContrastIcon from '@mui/icons-material/Contrast';
import NightlightIcon from '@mui/icons-material/Nightlight';
import LightModeIcon from '@mui/icons-material/LightMode';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Box, Typography } from '@mui/material';
import { EHighlightStyle, ESiteTheme } from '../../pagenoteTypes';
import { OptionsContext } from '../Options';
import { useLiveQuery } from 'dexie-react-hooks';
import pagenoteDB from '../../lib/storeage/pagenoteDB';



export default function SetHighlight() {

  const extensionConfig=useLiveQuery(()=>
    pagenoteDB.sitesConfig.where('origin').equals(window.location.origin).toArray()
  )

  

  const handlerChangeHighlightStyle = (
    event: React.MouseEvent<HTMLElement>,
    value: EHighlightStyle,
  ) => {
    if(extensionConfig&&value!==null&&value!==extensionConfig[0].highLightStyle){
      pagenoteDB.sitesConfig.update(window.location.origin,{highLightStyle:value})
    }
  };
  console.log(extensionConfig)

  if(!extensionConfig||extensionConfig.length==0) return null

  return (
    <>
      <Typography id='extension' variant='pagenoteSubtitle' component='h6'>高亮设置</Typography>
      <ToggleButtonGroup
        value={extensionConfig[0].highLightStyle}
        exclusive
        fullWidth
        onChange={handlerChangeHighlightStyle}
        aria-label="text alignment"
        sx={{
          paddingLeft:'4rem',
          paddingRight:'4rem',
          '&>button>svg':{
            ml:1,
            mr:1,
          }
        }}
      >

        <ToggleButton value={EHighlightStyle.bg} aria-label="left aligned">
          <Box sx={{
            color:theme=>theme.palette.text.secondary,
            bgcolor:theme=>theme.palette.error.main,
            width:'fit-content',
            padding:'0 5px',
            height:'fit-content'
          }}>hightlight</Box>
        </ToggleButton>
        <ToggleButton value={EHighlightStyle.underLine} aria-label="centered">
          <Box sx={{
            color: theme => theme.palette.text.secondary,
            // bgcolor:theme=>theme.palette.error.main,
            width: 'fit-content',
            padding: '0 5px',
            height: 'fit-content',
            borderBottomWidth: 2,
            borderBottomColor: theme => theme.palette.error.main,
            borderBottomStyle: 'solid',
          }}>hightlight</Box>
        </ToggleButton>
        
      </ToggleButtonGroup>
    </>
  );
}