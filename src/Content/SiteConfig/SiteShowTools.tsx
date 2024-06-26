import PanToolAltIcon from '@mui/icons-material/PanToolAlt';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Tooltip } from '@mui/material';
import { SiteConfigContext } from '../ContentPagenotes';
import { useContext } from 'react';

export default function SiteShowTools(){
    const siteConfigContext=useContext(SiteConfigContext)
    if(siteConfigContext==null) return
    const {siteConfig,setSiteConfig}=siteConfigContext

    const handlerSiteShowTools=()=>{
        setSiteConfig(siteConfig=>({
            ...siteConfig,
            showEditorTools:!siteConfig.showEditorTools,
        }))
    }

    return (
            <IconButton 
            onClick={handlerSiteShowTools} 
            title={siteConfig.showEditorTools?"显示编辑器工具栏":"隐藏编辑器工具栏"}
            sx={{position:'relative'}}
            >
                {
                siteConfig.showEditorTools ? <PanToolAltIcon /> :
                    <>
                        <PanToolAltIcon />
                        <CloseIcon sx={{ position: 'absolute',color:'success.main' }} />
                    </>
                }
            </IconButton>)
}