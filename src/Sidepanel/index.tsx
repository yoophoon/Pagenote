// import React from 'react'
import ReactDOM from 'react-dom/client'
import {Markdown} from '../lib/react-markdown-editor'
import remarkGfm from 'remark-gfm'
// import { renderToStaticMarkup } from 'react-dom/server';
// function PagenoteList() {
//     const searchParams = new URLSearchParams(window.location.search)
//     const origin = searchParams.get('currentTabURL')
//     return <p>{"获取pagenote来自" + origin}</p>
// }

const markdown = `# liuxia nide 
    opinion`
// console.log(renderToStaticMarkup(<Markdown>{markdown}</Markdown>))



ReactDOM.createRoot(document.getElementById('root')!).render(
    // <React.StrictMode>
        <Markdown remarkPlugins={[remarkGfm]}>{markdown}</Markdown>
    // </React.StrictMode>,
)