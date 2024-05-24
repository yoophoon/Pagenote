import './Middler.css'
import home from './img/home.svg'
import pagenotes from './img/note.svg'
import newpagenote from './img/new.svg'
import setting from './img/setting.svg'
import sharing from './img/sharing.svg'
function Middler() {
    return <ul className="Middler">
        <OpenHome />
        <OpenNotesInSidepanel></OpenNotesInSidepanel>
        <li><img className='new' src={newpagenote} alt="新建" /></li>
        <OpenSetting />
        <li><img className='sharing' src={sharing} alt="分享" /></li>
    </ul>
}
function OpenHome() {
    const showHome = () => {
        window.open(window.location.origin + '/home.html', '_blank')
    }
    return <li><img className='home' src={home} alt="主页" onClick={showHome} /></li>
}

function OpenNotesInSidepanel() {
    //const SIDEPAGE = window.location.origin + '/src/Sidepanel'
    const showNotesInSidepanel = () => {
        chrome.runtime.sendMessage({ operation: 'OpenNotesInSidepanel', origin: window.location.origin });
    }
    return <li>
        <img className='pagenotes' src={pagenotes} alt="笔记" onClick={showNotesInSidepanel} />
    </li>
}

function OpenSetting() {
    const showSetting = () => {
        window.open(window.location.origin + '/options.html', '_blank')
    }
    return <li><img className='setting' src={setting} alt="设置" onClick={showSetting} /></li>
}

export default Middler