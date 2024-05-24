import './Toper.css'
import pagenoteLog from './img/pagenoteLog.svg'
import githubSVG from './img/github.svg'
import reactSVG from './img/react.svg'
import viteSVG from './img/vite.svg'
function Toper() {
    let records = 0
    return <header>
        <img src={pagenoteLog} alt="pagenoteLog" className='ToperPagenoteLog' />
        <div className='pagenoteTitle'>
            <p className="ToperP">pagenote</p>
            <p className='records'>
                record<span className='numOfRecords'>{records}</span>pagenote, powered by
                <img src={githubSVG} alt="github" /><img src={reactSVG} alt="react" /><img src={viteSVG} alt="vite" />
            </p>
        </div>
    </header>
}

export default Toper