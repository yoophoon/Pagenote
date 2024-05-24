import ReactDOM from "react-dom/client";
import { EOperation, EPosition, TMessageToEditor } from "../pagenoteTypes";
import Editor from '../Editor'
import './PagenoteTools/pagenoteFragment'



import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from "@mui/material/CssBaseline";
//pagenote配置初始化


const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const pagenoteConfig = {
    theme: darkTheme,
}

const gloableStatus = {
    // pagenoteToolsMount: false,
}


//Root初始化
//---------------------------------------------------------------------------------------------
//页面编辑器：固定在整个页面中央，点击编辑器周边区域即退出
//这种显示方式是为了方便在任何网页进行笔记记录，响应popup的new pagenote按钮
//---------------------------------------------------------------------------------------------
//跟随pagenoteFragment编辑器，当编辑器最小宽度大于pagenoteFragment所在元素节点宽度时采用这种方式显示
//这种显示方式会遮挡pagenoteFragment后续文本
//---------------------------------------------------------------------------------------------
//内嵌在pagenoteFragment节点后方编辑器，当编辑器最小宽度大于pagenoteFragment所在元素节点宽度时采用这种方式显示
//当pagenoteFragment节点区域空间足够时这种显示方式最好
const PagenoteEditor = document.querySelector('#pagenoteEditor') ?? document.createElement('div')
PagenoteEditor.id = 'pagenoteEditor'
document.documentElement.append(PagenoteEditor)
const PagenoteEditorRoot = ReactDOM.createRoot(PagenoteEditor)

//页面工具














import { PagenoteTools } from "./PagenoteTools";
//这里驱动pagenoteTools
const pagenoteTools = document.createElement('span')
pagenoteTools.style.position = 'relative'
pagenoteTools.id = 'pagenoteTools'
document.documentElement.append(pagenoteTools)
let PagenoteToolsRoot = ReactDOM.createRoot(pagenoteTools)



import tryToGeneratePagenote, { selectEles } from "./PagenoteTools/pagenoteFragment";
window.onmousedown = (e) => {

}
window.onmouseup = (e) => {
    console.log('mouse up')
    const result = tryToGeneratePagenote()
    console.log(result)
    if (result == undefined) {
        return
    }
    const { pagenoteEles, messageToEditor } = result
    console.log(pagenoteEles)
    //在pagenoteEles末尾插入pagenoteTools节点
    pagenoteEles[pagenoteEles.length - 1].parentNode?.insertBefore(pagenoteTools, pagenoteEles[pagenoteEles.length - 1])
    pagenoteTools.parentNode?.insertBefore(pagenoteEles[pagenoteEles.length - 1], pagenoteTools)
    const rectInfo = pagenoteEles[pagenoteEles.length - 1].getBoundingClientRect()
    const cssInfo = window.getComputedStyle(pagenoteEles[pagenoteEles.length - 1])
    if (pagenoteTools.innerHTML == '') {
        PagenoteToolsRoot = ReactDOM.createRoot(pagenoteTools)
    }
    //渲染PanogenoteToolsRoot
    PagenoteToolsRoot.render(
        <ThemeProvider theme={pagenoteConfig.theme}>
            <CssBaseline />
            <PagenoteTools
                messageToEditor={messageToEditor}
                rectInfo={rectInfo}
                currentPagenoteAnchor={pagenoteEles}
                currentRoot={PagenoteToolsRoot}
                currentCssInfo={cssInfo}
                currentRootEle={pagenoteTools}
            />
        </ThemeProvider>)
    selectEles(pagenoteEles)
}

window.ondblclick = (e) => {
    // tryToGeneratePagenote()
}


chrome.runtime.onMessage.addListener(function (message: TMessageToEditor, sender, sendResponse) {
    //在当前网站新加一个pagenote
    console.log(message)
    if (message.operation == EOperation.openEditor &&
        message.value.editorPosition == EPosition.inPage && sender) {
        //如果编辑器已经打开了，就提前返回，并响应 editorStatus:true
        if (document.querySelector('#pagenoteEditor') != null) {
            sendResponse({ editorStatus: 'open' })
            return
        }
        const openEditor = {
            open: true,
            position: message.value.editorPosition,
            initTitle: message.value.pagenoteTitle ? message.value.pagenoteTitle : (message.value.pagenoteFragment ? message.value.pagenoteFragment.textStart : 'pagenote'),
            initContent: message.value.pagenoteContent ? message.value.pagenoteContent : (message.value.pagenoteFragment ? message.value.pagenoteFragment.textStart : `# 留下你的\n想法、观点`),
        }
        const pagenoteID = message.value.pagenoteID
        const pagenoteFragment = message.value.pagenoteFragment
        const pagenoteTimestamp = message.value.pagenoteTimestamp

        PagenoteEditorRoot.render(<ThemeProvider theme={pagenoteConfig.theme}><Editor openEditor={openEditor} pagenoteID={pagenoteID} pagenoteFragment={pagenoteFragment} pagenoteTimestamp={pagenoteTimestamp} ></Editor></ThemeProvider>)
        // openEditorInpage(openEditor, pagenoteID, pagenoteFragment, starryNight)
        sendResponse({ editorStatus: 'open' })
    }
})



// import Editor from "../Editor";
// function openEditorInpage(openEditor: TOpenEditor, pagenoteID: string, pagenoteFragment: TPagenoteFragment, theme: starryNight) {

//     PagenoteEditorRoot.render(<Editor openEditor={openEditor} pagenoteID={pagenoteID} pagenoteFragment={pagenoteFragment} theme={theme}></Editor>)
// }

