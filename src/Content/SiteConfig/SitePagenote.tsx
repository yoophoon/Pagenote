import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import { useContext } from 'react';
import { SiteConfigContext } from '../ContentPagenotes';

export default function SitePagenote(){
    
    const siteConfigContext=useContext(SiteConfigContext)
    if(siteConfigContext==null) return
    const {siteConfig,setSiteConfig}=siteConfigContext

    const handlerSitePagenote=()=>{
        setSiteConfig(siteConfig=>({
            ...siteConfig,
            showPagenote:!siteConfig.showPagenote,
        }))
    }

    return (
            <IconButton onClick={handlerSitePagenote} title={siteConfig.showPagenote ?"显示笔记":"隐藏笔记"} sx={{position:'relative'}}>
                {
                siteConfig.showPagenote ? <FormatListBulletedIcon /> :
                    <>
                        <FormatListBulletedIcon />
                        <CloseIcon sx={{ position: 'absolute',color:'success.main' }} />
                    </>
                }
            </IconButton>)
}