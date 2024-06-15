import { IconButton, SvgIcon, Tooltip, Zoom } from '@mui/material'
import SetHead from '../../../assets/svg/Head'
export default function EditorSetHead() {
    const handlerSetHeadClick=()=>{
        console.log(window.getSelection())
    }
    
    return (
        <Tooltip title="标题" TransitionComponent={Zoom} arrow>
            <IconButton 
            edge="start" 
            color='secondary' 
            onClick={handlerSetHeadClick}>
                <SvgIcon component={SetHead} inheritViewBox fontSize="small" />
            </IconButton>
        </Tooltip>)
}