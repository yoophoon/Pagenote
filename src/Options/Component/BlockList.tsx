import * as React from 'react';
import ContrastIcon from '@mui/icons-material/Contrast';
import NightlightIcon from '@mui/icons-material/Nightlight';
import LightModeIcon from '@mui/icons-material/LightMode';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Box, IconButton, TextField, Typography } from '@mui/material';
import { ESiteTheme } from '../../pagenoteTypes';
import { OptionsContext } from '../Options';
import { useLiveQuery } from 'dexie-react-hooks';
import pagenoteDB from '../../lib/storeage/pagenoteDB';
import CloseIcon from '@mui/icons-material/Close';

export default function BlockList() {

  //获取所有pagneote数据
  const blockedList = useLiveQuery(() =>
    pagenoteDB.sitesConfig.toArray(),
    []
  )

  if(!blockedList) return null

  return (
    <>
      <Typography id='extension' variant='pagenoteSubtitle' component='h6'>禁用站点</Typography>
      <Box sx={{
        paddingLeft: '4rem',
        paddingRight: '4rem',

      }}>
        <TextField fullWidth label="增加禁用站点" variant="standard" sx={{
          marginBottom: '1rem',
        }} />
        {
          blockedList?.filter(siteConfig => siteConfig.onThisSite == false).map(siteconfig => (
            <Box
              key={siteconfig.origin}
              sx={{
                verticalAlign: 'middle',
                position: 'relative',
                marginBottom: '1rem',
              }}>
              <img src={new URL(siteconfig.origin).origin + '/favicon.ico'} style={{
                width: '2rem',
                height: '2rem',
                verticalAlign: 'middle',
                marginLeft: '2rem',
                marginRight: '1rem',
              }} />
              <Box sx={{
                display: 'inline-block',
                width: 'calc(100% - 10rem)',
                verticalAlign: 'middle',
              }}>
                <Typography component='span' sx={{
                  display: 'block',
                  textDecoration: 'line-through',
                  maxWidth: 'calc(100% - 10rem)',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  verticalAlign: 'middle'
                }}>
                  {siteconfig.origin}
                </Typography>
                <Typography component='span' sx={{
                  display: 'block',
                  textDecoration: 'line-through',
                  maxWidth: 'calc(100% - 10rem)',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  verticalAlign: 'middle'
                }}>
                  {siteconfig.title}
                </Typography>
              </Box>
              <CloseIcon sx={{ verticalAlign: 'middle', position: 'absolute', top: "50%",transform:"translateY(-50%)", right: '2rem', }} />
            </Box>))
        }
      </Box>
    </>
  );
}