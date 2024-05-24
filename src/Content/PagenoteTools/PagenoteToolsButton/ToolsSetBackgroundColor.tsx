import { FormatColorFill } from "@mui/icons-material";
import { IconButton, Tooltip, Zoom } from "@mui/material";

export default function ToolsSetBackgroundColor() {
    return (
        <Tooltip title="设置背景颜色" TransitionComponent={Zoom} arrow>
            <IconButton edge="start" color='secondary'>
                <FormatColorFill />
            </IconButton>
        </Tooltip>)
}