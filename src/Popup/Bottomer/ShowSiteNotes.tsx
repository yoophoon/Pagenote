import { IconButton, Tooltip } from "@mui/material";
import { Description } from "@mui/icons-material";
// import { EOperation } from "../../pagenoteTypes";
import Zoom from '@mui/material/Zoom'
const extensionURL = chrome.runtime.getURL('')
export function ShowSiteNotes() {
    const handleClick = () => {
        // chrome.runtime.sendMessage({
        //     operation: EOperation.openNotesInSidepanel,
        //     value: {
        //         origin: window.location.origin + window.location.pathname,
        //     }
        // });
        let SidepanelPath = extensionURL + 'sidepanel.html'
        chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
            console.log(tab)
            if (tab.id) {
                //sidePanel.open有bug，链接给了一些解决方案
                //https://stackoverflow.com/questions/77213045/error-sidepanel-open-may-only-be-called-in-response-to-a-user-gesture-re
                chrome.sidePanel.open({ tabId: tab.id });
                SidepanelPath += '?currentTabURL=' + tab.url
                chrome.sidePanel.setOptions({ path: SidepanelPath, enabled: true });
            }
        })
    }

    return (
        <Tooltip title="Show Site Notes" TransitionComponent={Zoom} arrow>
            <IconButton aria-label="show all notes" onClick={handleClick}>
                <Description />
            </IconButton>
        </Tooltip>

    )
}