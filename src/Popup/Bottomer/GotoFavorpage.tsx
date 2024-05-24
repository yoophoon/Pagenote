import { IconButton, Tooltip } from "@mui/material";
import { Favorite } from "@mui/icons-material";
import Zoom from '@mui/material/Zoom'

export function GotoFavor() {
    return (
        <Tooltip title="Favor" TransitionComponent={Zoom} arrow>
            <IconButton aria-label="add to favorites">
                <Favorite />
            </IconButton>
        </Tooltip>

    )
}