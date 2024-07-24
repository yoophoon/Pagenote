import Toper from './Toper/Toper'
import Middler from './Middler/Middler'
import Description from './Description/Description'
import './Popup.css'
import { EOperation } from '../pagenoteTypes'




function Popup() {
    return <>
        <Toper></Toper>
        <hr />
        <Description></Description>
        <Middler></Middler>
        <hr />
    </>
}

export default Popup