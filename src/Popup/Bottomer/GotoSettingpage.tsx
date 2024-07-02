import { IconButton, Tooltip } from "@mui/material";
import { Tune } from "@mui/icons-material";
import Zoom from '@mui/material/Zoom'

export function GotoSettingpage() {
    const handleClick = () => {
        window.open(window.location.origin + '/options.html', '_blank')
    }
    
    return (
        <Tooltip title="Setting" TransitionComponent={Zoom} arrow>
            <IconButton aria-label="personal setting" onClick={handleClick}>
                <Tune />
            </IconButton>
        </Tooltip>

    )
}