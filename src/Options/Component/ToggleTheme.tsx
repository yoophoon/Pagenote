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

export default function ToggleTheme() {
  const optionsContext=React.useContext(OptionsContext)
  if(optionsContext==null) return null
  const {extensionConfig,setExtensionConfig}=optionsContext


  const handlerChangeTheme = (
    event: React.MouseEvent<HTMLElement>,
    value: ESiteTheme,
  ) => {
    setExtensionConfig(extensionConfig=>({
      ...extensionConfig,
      extensionTheme:value
    }))
  };

  return (
    <>
      <Typography variant='pagenoteSubtitle' component='h6'>主题设置</Typography>
      <ToggleButtonGroup
        value={extensionConfig.extensionTheme}
        exclusive
        fullWidth
        onChange={handlerChangeTheme}
        aria-label="text alignment"
        sx={{
          paddingLeft:'4rem',
          paddingRight:'4rem',
        }}
      >

        <ToggleButton value={ESiteTheme.dark} aria-label="left aligned">
        <NightlightIcon />
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