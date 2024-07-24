import * as React from 'react';
import ContrastIcon from '@mui/icons-material/Contrast';
import NightlightIcon from '@mui/icons-material/Nightlight';
import LightModeIcon from '@mui/icons-material/LightMode';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Box, Divider, Stack, TextField, Typography } from '@mui/material';
import { ESiteTheme } from '../../pagenoteTypes';
import { OptionsContext } from '../Options';
import { useLiveQuery } from 'dexie-react-hooks';
import pagenoteDB from '../../lib/storeage/pagenoteDB';

export default function SetShortcuts() {
  
  const extensionConfig=useLiveQuery(()=>
    pagenoteDB.sitesConfig.where('origin').equals(window.location.origin).toArray()
  )

  if(!extensionConfig||extensionConfig.length==0) return null

  return (
    <>
      <Typography variant='pagenoteSubtitle' component='h6'>快捷键设置</Typography>
      <Box sx={{
          paddingLeft:theme=>theme.typography.htmlFontSize*4+'px',
          paddingRight:theme=>theme.typography.htmlFontSize*4+'px',
          fontSize:theme=>theme.typography.fontSize*1.25+'px',
          lineHeight:theme=>theme.mixins.toolbar.minHeight+'px',
          
        }}>
        {
          extensionConfig[0].shortcuts.map(shortcut=>(
          <Stack direction='row' alignItems='end' key={shortcut.type} sx={{
            borderBottom:1,
            borderBottomColor:theme=>theme.palette.info.main
          }}>
            <Box flexBasis={300} flexGrow={8} sx={{
              
            }}>{shortcut.description}</Box>
            <Box flexBasis={150} flexGrow={1}>{'LeaddingKey: '+shortcut.leadingKey}</Box>
            <Divider orientation="vertical"/>
            <TextField id="standard-basic" label="shortcut" variant="standard" defaultValue={shortcut.leadingKey+' + '+shortcut.key} sx={{flexGrow:1,flexBasis:100}} />
          </Stack>))
        }
      </Box>
    </>
  );
}