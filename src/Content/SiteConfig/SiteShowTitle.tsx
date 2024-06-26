import TitleIcon from '@mui/icons-material/Title';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Tooltip } from '@mui/material';
import { SiteConfigContext } from '../ContentPagenotes';
import { useContext } from 'react';

export default function SiteShowTitle(){
    const siteConfigContext=useContext(SiteConfigContext)
    if(siteConfigContext==null) return
    const {siteConfig,setSiteConfig}=siteConfigContext

    const handlerSiteShowTitle=()=>{
        setSiteConfig(siteConfig=>({
            ...siteConfig,
            showEditorTitle:!siteConfig.showEditorTitle,
        }))
    }

    return (
            <IconButton 
            onClick={handlerSiteShowTitle} 
            title={siteConfig.showEditorTitle?"显示标题":"隐藏标题"}
            sx={{position:'relative'}}
            >
                {
                siteConfig.showEditorTitle ? <TitleIcon /> :
                    <>
                        <TitleIcon />
                        <CloseIcon sx={{ position: 'absolute',color:'success.main' }} />
                    </>
                }
            </IconButton>)
}