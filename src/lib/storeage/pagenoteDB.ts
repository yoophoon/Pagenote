import Dexie, { type EntityTable } from 'dexie'
import { TSiteConfig, TPagenote, ESiteTheme, EHighlightStyle } from '../../pagenoteTypes';
import { pagenoteShortcuts } from '../common';

const pagenoteDB = new Dexie("pagenote") as Dexie & {
    sitesConfig: EntityTable<TSiteConfig, 'origin'>,
    pagenote:EntityTable<TPagenote, 'pagenoteID'>,
};

pagenoteDB.version(1).stores({
    sitesConfig: "&origin, siteTheme",
    pagenote:"&pagenoteID, pagenoteTarget"
});



export default pagenoteDB




export function initSiteConfig(origin:string,title:string){
    const _initSiteConfig:TSiteConfig={
        origin,
        title,
        siteTheme:ESiteTheme.dark,
        showPagenote:false,
        showEditorTitle:true,
        showEditorTools:true,
        showPositionBar:false,
        onThisSite:true,
        shortcutsOn:false,
        shortcuts:[...pagenoteShortcuts],
        highLightStyle:EHighlightStyle.bg, 
        openSidepanel:false
    }
    pagenoteDB.sitesConfig.put(_initSiteConfig)
    return _initSiteConfig
}