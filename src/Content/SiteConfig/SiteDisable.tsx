import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Tooltip } from '@mui/material';
import { SiteConfigContext } from '../ContentPagenotes';
import { useContext } from 'react';

export default function SiteDisable(){
    const siteConfigContext=useContext(SiteConfigContext)
    if(siteConfigContext==null) return
    const {siteConfig,setSiteConfig}=siteConfigContext

    const handlerSiteDisable=()=>{
        setSiteConfig(siteConfig=>({
            ...siteConfig,
            onThisSite:!siteConfig.onThisSite,
        }))
    }

    return (
            <IconButton onClick={handlerSiteDisable} title={siteConfig.onThisSite?"pagenote启用":"pagenote禁用"} sx={{position:'relative'}}>
                {
                siteConfig.onThisSite ? <PlaylistRemoveIcon /> :
                    <>
                        <PlaylistRemoveIcon />
                        <CloseIcon sx={{ position: 'absolute',color:'success.main' }} />
                    </>
                }
            </IconButton>)
}