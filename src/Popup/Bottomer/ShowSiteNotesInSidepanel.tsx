import { Badge, IconButton, Tooltip } from "@mui/material";
import { Description } from "@mui/icons-material";
// import { EOperation } from "../../pagenoteTypes";
import Zoom from '@mui/material/Zoom'
import pagenoteDB from "../../lib/storeage/pagenoteDB";
const extensionURL = chrome.runtime.getURL('')
export function ShowSiteNotes() {
    const handleClick = () => {
        // chrome.runtime.sendMessage({
        //     operation: EOperation.openNotesInSidepanel,
        //     value: {
        //         origin: window.location.origin + window.location.pathname,
        //     }
        // });
        localStorage.setItem('closedSidepanel',JSON.stringify({origin:''}))

        let SidepanelPath = extensionURL + 'sidepanel.html'
        chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
            console.log(tab)
            console.log(extensionURL)
            if (tab.url) {
                const origin=new URL(tab.url)
                pagenoteDB.sitesConfig.update(origin.origin+origin.pathname,{openSidepanel:true}).then(
                    update=>{
                        if (update&&tab.id) {
                            //sidePanel.open有bug，链接给了一些解决方案
                            //https://stackoverflow.com/questions/77213045/error-sidepanel-open-may-only-be-called-in-response-to-a-user-gesture-re
                            chrome.sidePanel.open({ tabId: tab.id });
                            // SidepanelPath += '?currentTabURL=' + tab.url
                            chrome.sidePanel.setOptions({ tabId: tab.id,path: SidepanelPath, enabled: true });
                        }
                    }
                )
            }
        })
    }

    return (
        <Tooltip title="Show Site Notes in sidepanel" TransitionComponent={Zoom} arrow>
            <IconButton aria-label="show all notes" onClick={handleClick}>
                <Badge badgeContent='S' anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}>
                    <Description />
                </Badge>
            </IconButton>
        </Tooltip>

    )
}