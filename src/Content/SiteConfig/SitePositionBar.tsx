import ViewSidebarIcon from '@mui/icons-material/ViewSidebar';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton} from '@mui/material';
import { useContext } from 'react';
import { SiteConfigContext } from '../ContentPagenotes';

export default function SitePositionBar(){
        
    const siteConfigContext=useContext(SiteConfigContext)
    if(siteConfigContext==null) return
    const {siteConfig,setSiteConfig}=siteConfigContext

    const handlerSitePositionBar=()=>{
        setSiteConfig(siteConfig=>({
            ...siteConfig,
            showPositionBar:!siteConfig.showPositionBar,
        }))
    }

    return (
            <IconButton onClick={handlerSitePositionBar} title={siteConfig.showPositionBar ?"显示笔记位置":"隐藏笔记位置"} sx={{position:'relative'}}>
                {
                siteConfig.showPositionBar ? <ViewSidebarIcon /> :
                    <>
                        <ViewSidebarIcon />
                        <CloseIcon sx={{ position: 'absolute',color:'success.main' }} />
                    </>
                }
            </IconButton>)
}