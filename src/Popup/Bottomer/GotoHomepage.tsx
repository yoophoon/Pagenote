import { IconButton, Tooltip } from "@mui/material";
import { HomeWork } from "@mui/icons-material"
import Zoom from '@mui/material/Zoom'

export function GotoHomepage() {

    const handleClick = () => {
        window.open(window.location.origin + '/home.html', '_blank')
    }

    return (
        <Tooltip title="HomePage" TransitionComponent={Zoom} arrow>
            <IconButton aria-label="go to homepage" onClick={handleClick}>
                <HomeWork />
            </IconButton>
        </Tooltip>
    )
}