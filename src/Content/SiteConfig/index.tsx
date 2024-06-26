import { Box, ClickAwayListener, Divider, IconButton, Stack, Tooltip } from "@mui/material";
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { Fragment, useContext, useState } from "react";
import { TSiteConfig, TSetSiteConfig, EOperation} from "../../pagenoteTypes";
import SiteTheme from "./SiteTheme";
import SitePositionBar from "./SitePositionBar";
import SitePagenote from "./SitePagenote";
import SiteDisable from "./SiteDisable";
import { useTheme } from "@emotion/react";
import { Padding } from "@mui/icons-material";
import zIndex from "@mui/material/styles/zIndex";
import { SiteConfigContext } from "../ContentPagenotes";
import SiteShowTitle from "./SiteShowTitle";
import SiteShowTools from "./SiteShowTools";


export default function SiteConfig() {
  const siteConfigContext=useContext(SiteConfigContext)
  if(siteConfigContext==null) return
  
  const {siteConfig}=siteConfigContext
  
  const [showSiteConfig, setShowSiteConfig] = useState(false)

  const handlerShowSiteConfig = () => {
    setShowSiteConfig(true)
  }

  const handlerClickAway = () => {
    setShowSiteConfig(false)
    console.log('click away')
    chrome.runtime.sendMessage({
      operation:EOperation.siteConfig,
      value:siteConfig
    })
  }

  return (
    <Stack
      direction="row"
      sx={{ ...style }}
    >
      {
        showSiteConfig ?
          <ClickAwayListener onClickAway={handlerClickAway}>
            <Box>
              <SiteTheme />
              <Divider flexItem />
              <SitePositionBar />
              <Divider flexItem />
              <SitePagenote />
              <Divider flexItem />
              <SiteShowTitle/>
              <Divider flexItem />
              <SiteShowTools />
              <Divider flexItem />
              <SiteDisable />
            </Box>
          </ClickAwayListener> :
          <Tooltip title="设置">
            <IconButton onClick={handlerShowSiteConfig} >
              <DragIndicatorIcon />
            </IconButton>
          </Tooltip>
      }
    </Stack>
  )
}

const style = {
  position: 'fixed',
  //因为部分网站的导航栏也为fixed定位，为了显示正常，设置按钮放置在右下角
  bottom: 5,
  right: 25,
  opacity: 0.35,
  color:'primary.main',
  backgroundColor:'',
  zIndex:999,
  "&:hover": {
    opacity: 1,
    backgroundColor:'warning.main'
  }
}