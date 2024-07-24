import { Badge, IconButton, Tooltip } from "@mui/material";
import { Description } from "@mui/icons-material";
// import { EOperation } from "../../pagenoteTypes";
import Zoom from '@mui/material/Zoom'
const extensionURL = chrome.runtime.getURL('')
export function ShowAllNotes() {
    const handleClick = () => {
        window.open(window.location.origin+'/list.html')
    }

    return (
        <Tooltip title="Show All Notes in new tab" TransitionComponent={Zoom} arrow>
            <IconButton aria-label="show all notes" onClick={handleClick}>
                <Badge badgeContent='A' anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}>
                    <Description />
                </Badge>
            </IconButton>
        </Tooltip>

    )
}