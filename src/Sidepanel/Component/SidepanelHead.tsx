import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { TPagenote } from '../../pagenoteTypes';
import SettingsIcon from '@mui/icons-material/Settings';
import { Menu, MenuItem } from '@mui/material';

type TSidepanelHead ={
  pagenotesOnCurrentSite: TPagenote[] | undefined,
  activeTab:string,
}

export default function SidepanelHead({ pagenotesOnCurrentSite, activeTab }: TSidepanelHead) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);
  const handlerSettingClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <Box sx={{ flexGrow: 1,position:'sticky',top:0 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Typography variant='h5' component='span' sx={{
              color: theme => theme.palette.warning.main,
              textAlign: 'center',
              marginRight: 2,
            }}>{`${pagenotesOnCurrentSite?.length}`}
            </Typography>
            {(pagenotesOnCurrentSite?.length ?? 0) > 1 ? 'pagenotes' : 'pagenote'}
            <Typography sx={{
              width: 'calc(100vw - 72px)',
              fontSize: 10,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
            }}>
              on
              <Typography component='span'
                sx={{
                  fontSize: 'unset',
                  color:theme=>theme.palette.warning.main,
                  ml:1,
                  mr:1,
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                }}>
                {activeTab}
              </Typography>
            </Typography>
          </Typography>
          <IconButton onClick={handlerSettingClick}>
            <SettingsIcon />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={() => setAnchorEl(null)}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={() => setAnchorEl(null)}>Profile</MenuItem>
            <MenuItem onClick={() => setAnchorEl(null)}>My account</MenuItem>
            <MenuItem onClick={() => setAnchorEl(null)}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
}