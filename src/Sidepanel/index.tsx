// import React from 'react'
import ReactDOM from 'react-dom/client'
import {Markdown} from '../lib/react-markdown-editor'
import remarkGfm from 'remark-gfm'
import { EOperation } from '../pagenoteTypes'
// import { renderToStaticMarkup } from 'react-dom/server';
// function PagenoteList() {
//     const searchParams = new URLSearchParams(window.location.search)
//     const origin = searchParams.get('currentTabURL')
//     return <p>{"获取pagenote来自" + origin}</p>
// }

// const markdown = `# liuxia nide 
//     opinion`
// // console.log(renderToStaticMarkup(<Markdown>{markdown}</Markdown>))



// ReactDOM.createRoot(document.getElementById('root')!).render(
//     // <React.StrictMode>
//         <Markdown remarkPlugins={[remarkGfm]}>{markdown}</Markdown>
//     // </React.StrictMode>,
// )


chrome.runtime.onMessage.addListener((message,sender,sendResponse)=>{
    if(message.operation==EOperation.sidePanel){
        console.log(message.value)
    }
    sendResponse({value:"roger fuck u"})
})

const pnChannel=new BroadcastChannel('pagenoteChannel')
pnChannel.postMessage('hi there')