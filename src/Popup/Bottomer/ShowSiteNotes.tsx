import { IconButton, Tooltip } from "@mui/material";
import { Description } from "@mui/icons-material";
import Zoom from '@mui/material/Zoom'

export function ShowSiteNotes() {
    const handleClick = () => {
        chrome.runtime.sendMessage({ operation: 'openNotesInSidepanel', value: window.location.origin });
    }

    return (
        <Tooltip title="Show Site Notes" TransitionComponent={Zoom} arrow>
            <IconButton aria-label="show all notes" onClick={handleClick}>
                <Description />
            </IconButton>
        </Tooltip>

    )
}