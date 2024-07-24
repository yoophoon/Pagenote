// import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
import './index.css'
// import Popup from './Popup/Popup.tsx'
import Popup from './Popup/index.tsx'

import { ThemeProvider, createTheme } from '@mui/material/styles/index';
import CssBaseline from '@mui/material/CssBaseline/index';


// import { EPosition } from './pagenoteTypes.ts';
// import { common, createStarryNight } from '@wooorm/starry-night'



const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

// const openEditor = {
//   open: true,
//   position: EPosition.inPage,
//   initTitle: 'test main',
//   initContent: 'just a test'
// }
// const pagenoteID = crypto.randomUUID()
// const pagenoteFragment = { textStart: '1' }
// const theme = await createStarryNight(common)

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    {/* //popup页 */}
    <Popup />
  </ThemeProvider>
  // </React.StrictMode>,
)



