import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'


function PagenoteList() {

    return <p>hello pagenote home</p>
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <PagenoteList />
        <Header />

    </React.StrictMode>,
)

function Header() {
    return <header className='header'>

    </header>
}

