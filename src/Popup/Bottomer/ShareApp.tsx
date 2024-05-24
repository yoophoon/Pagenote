import { IconButton, Tooltip } from "@mui/material";
import { Share } from "@mui/icons-material";
import Zoom from '@mui/material/Zoom'

export function ShareApp() {
    return (
        <Tooltip title="Share" TransitionComponent={Zoom} arrow>
            <IconButton aria-label="share">
                <Share />
            </IconButton>
        </Tooltip>

    )
}