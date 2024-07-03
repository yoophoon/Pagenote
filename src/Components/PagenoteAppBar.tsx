import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import GitHubIcon from '@mui/icons-material/GitHub';
import IconPagenote from '../assets/svg/Note';
import { styled, useTheme } from '@mui/material';

const pages = ['home', 'list', 'options'];

type TPagenoteAppBar={
  page?:'home'|'list'|'options'
}

function PagenoteAppBar(props:TPagenoteAppBar) {
  const theme=useTheme()
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (page?:string) => {
    if(page){
      window.open(window.location.origin+'/'+page+'.html' , '_blank')
    }
    setAnchorElNav(null);
  };

  const handlerGotoGithub = () => {
    window.open('https://github.com/yoophoon/Pagenote' , '_blank')
  };

  const IconPagenoteStyled=(<IconPagenote
    width='2rem'
    height='2rem'
    fileContent={theme.palette.text.secondary}
    fileShadow={theme.palette.primary.main}
    cardColor={theme.palette.info.main}
    dogEarColor={theme.palette.success.main}
    plusSymbolColor={theme.palette.error.main}
    oSymbolColor={theme.palette.warning.main}
    style={{
      marginRight: '0.5rem',
    }}
  />)

  return (
    <AppBar position='sticky' sx={{top:0}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          
          <Typography
            variant="h6"
            noWrap
            component="a"
            href={window.location.origin+'/home.html'}
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            {IconPagenoteStyled}
            PAGENOTE
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={()=>handleCloseNavMenu()}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={()=>handleCloseNavMenu(page)}>
                  <Typography textAlign="center" >
                    {page}
                    </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          
          <Typography
            variant="h5"
            noWrap
            component="a"
            href={window.location.origin+'/home.html'}
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            {IconPagenoteStyled}
            PAGENOTE
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={()=>handleCloseNavMenu(page)}
                sx={{ 
                  my: 2, 
                  color: 'white', 
                  display: 'block' ,
                  backgroundColor:page==props.page?theme.palette.info.main:'none',
                  '&:hover':{
                    backgroundColor:page==props.page?theme.palette.info.main:'none',
                  }
                }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="goto github">
              <IconButton onClick={handlerGotoGithub} sx={{ p: 0 ,color:'inherit',}}>
                <GitHubIcon/>
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default PagenoteAppBar;