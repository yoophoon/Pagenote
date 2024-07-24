import * as React from 'react';
import ContrastIcon from '@mui/icons-material/Contrast';
import NightlightIcon from '@mui/icons-material/Nightlight';
import LightModeIcon from '@mui/icons-material/LightMode';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Typography } from '@mui/material';
import { ESiteTheme } from '../../pagenoteTypes';
import { OptionsContext } from '../Options';
import { useLiveQuery } from 'dexie-react-hooks';
import pagenoteDB from '../../lib/storeage/pagenoteDB';

export default function ToggleTheme() {
  //获取所有pagneote数据
  const extensionConfigDB = useLiveQuery(() =>
    pagenoteDB.sitesConfig.where('origin').equals(window.location.origin).toArray()
  )


  const handlerChangeTheme = (
    event: React.MouseEvent<HTMLElement>,
    value: ESiteTheme,
  ) => {
    if(extensionConfigDB&&value!==null&&value!==extensionConfigDB[0]?.siteTheme){
      console.log('extensionConfigDB in theme setting',extensionConfigDB)
      pagenoteDB.sitesConfig.update(window.location.origin,{siteTheme:value})
    }
  };

  if(!extensionConfigDB||extensionConfigDB.length==0) return null

  return (
    <>
      <Typography id='extension' variant='pagenoteSubtitle' component='h6'>主题设置</Typography>
      <ToggleButtonGroup
        value={extensionConfigDB[0].siteTheme}
        exclusive
        fullWidth
        onChange={handlerChangeTheme}
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

        <ToggleButton value={ESiteTheme.dark} aria-label="left aligned">
        <NightlightIcon sx={{
          // ml:1,
          // mr:1,
        }}/>
          暗黑主题
        </ToggleButton>
        <ToggleButton value={ESiteTheme.light} aria-label="centered">
          <LightModeIcon />
          明亮主题
        </ToggleButton>
        <ToggleButton value={ESiteTheme.systemDefault} aria-label="right aligned">
          <ContrastIcon />
          跟随系统
        </ToggleButton>
      </ToggleButtonGroup>
    </>
  );
}