import { IconButton, Tooltip } from "@mui/material";
import { Tune } from "@mui/icons-material";
import Zoom from '@mui/material/Zoom'

export function GotoSettingpage() {
    return (
        <Tooltip title="Setting" TransitionComponent={Zoom} arrow>
            <IconButton aria-label="personal setting">
                <Tune />
            </IconButton>
        </Tooltip>

    )
}