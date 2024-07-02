import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import PagenoteAppBar from '../Components/PagenoteAppBar'



ReactDOM.createRoot(document.getElementById('root')!).render(<Options />)


function Options() {
  return (<>
    <PagenoteAppBar page='options'/>
    <div>
      <div>extension setting</div>
      <div>default siteConfig</div>
      <div>default sidepanelsetting</div>
      <div>markdown setting</div>
      <div>sync to onedrive</div>
    </div>
    
  </>)
}

