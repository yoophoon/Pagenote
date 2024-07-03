
import { IconButton} from '@mui/material';
import { memo, useContext } from 'react';
import { SiteConfigContext } from '../ContentPagenotes';
import { ESiteTheme } from '../../pagenoteTypes';
import ContrastIcon from '@mui/icons-material/Contrast';
import NightlightIcon from '@mui/icons-material/Nightlight';
import LightModeIcon from '@mui/icons-material/LightMode';

const SiteTheme=memo(()=>{
    {
            
        const siteConfigContext=useContext(SiteConfigContext)
        if(siteConfigContext==null) return
        const {siteConfig,setSiteConfig}=siteConfigContext
    
        const handlerSiteTheme=()=>{
            setSiteConfig(siteConfig=>({
                ...siteConfig,
                siteTheme:siteConfig.siteTheme==ESiteTheme.systemDefault?0:siteConfig.siteTheme+1,
            }))
        }
    console.log('siteConfig...',siteConfig)
        return (
                <IconButton onClick={handlerSiteTheme} title="设置主题">
                    {
                        siteConfig.siteTheme==ESiteTheme.systemDefault && <ContrastIcon />||
                        siteConfig.siteTheme==ESiteTheme.dark && <NightlightIcon />||
                        siteConfig.siteTheme==ESiteTheme.light && <LightModeIcon />
                    }
                </IconButton>)
    }
})

export default SiteTheme