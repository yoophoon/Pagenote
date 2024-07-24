import ReactDOM from 'react-dom/client'
import PagenotesList from './PagenotesList'


const listRootEle=document.querySelector('#root') as HTMLElement
const sidePanelRoot=ReactDOM.createRoot(listRootEle)
sidePanelRoot.render(<PagenotesList/>)