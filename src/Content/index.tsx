import ReactDOM from "react-dom/client";
import ContentPagenotes from "./ContentPagenotes";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
// import { useRef } from "react";


//创建react管理容器
const pagenoteRoot = document.createElement('pagenoteroot')
pagenoteRoot.setAttribute('id', 'pagenoteroot')
document.documentElement.append(pagenoteRoot)

ReactDOM.createRoot(pagenoteRoot).render(<ContentPagenotes></ContentPagenotes>)




//---------------------------------------------------------------------------------------------
//页面编辑器：固定在整个页面中央，点击编辑器周边区域即退出
//这种显示方式是为了方便在任何网页进行笔记记录，响应popup的new pagenote按钮
//---------------------------------------------------------------------------------------------
//跟随pagenoteFragment编辑器，当编辑器最小宽度大于pagenoteFragment所在元素节点宽度时采用这种方式显示
//这种显示方式会遮挡pagenoteFragment后续文本
//---------------------------------------------------------------------------------------------
//内嵌在pagenoteFragment节点后方编辑器，当编辑器最小宽度大于pagenoteFragment所在元素节点宽度时采用这种方式显示
//当pagenoteFragment节点区域空间足够时这种显示方式最好


/*******************************************************************************
 * init
 */

const PagenoteEditor = document.querySelector('#pagenoteeditor') ?? document.createElement('div')
PagenoteEditor.id = 'pagenoteeditor'
document.documentElement.append(PagenoteEditor)




document.body.ondragstart=e=>{
    console.log(e)
}







// import { PagenoteTools } from "./PagenoteTools";
// //这里驱动pagenoteTools
// const pagenoteTools = document.createElement('span')
// pagenoteTools.style.position = 'relative'
// pagenoteTools.id = 'pagenotetools'
// document.documentElement.append(pagenoteTools)
// let PagenoteToolsRoot = ReactDOM.createRoot(pagenoteTools)



// import tryToGeneratePagenote, { selectEles } from "./PagenoteTools/pagenoteFragment";
// import PagenoteIcon from "./PagenoteTools/PagenoteIcon";
// window.onmousedown = (e) => {

// }
// window.onmouseup = (e) => {
//     const result = tryToGeneratePagenote()
//     if (result == undefined) {
//         return
//     }
//     const { pagenoteEles, messageToEditor } = result
//     // const rectInfo = pagenoteEles[pagenoteEles.length - 1].getBoundingClientRect()
//     // const cssInfo = window.getComputedStyle(pagenoteEles[pagenoteEles.length - 1])
//     const { pagenoteIcon, pagenoteIconRoot } = createPagenoteIcon(messageToEditor.value.pagenoteID, pagenoteTools)
//     pagenoteIconRoot.render(<PagenoteIcon
//         pagenoteID={messageToEditor.value.pagenoteID}
//         pagenoteIconRoot={pagenoteIconRoot}
//         pagenoteToolsRoot={PagenoteToolsRoot} />)
//     //更新pagenoteTools的pagenoteID属性
//     pagenoteTools.setAttribute('pagenoteid', messageToEditor.value.pagenoteID.toString())
//     //更新pagenoteIcon的pagenoteID属性
//     pagenoteIcon.setAttribute('pagenoteid', messageToEditor.value.pagenoteID.toString())
//     //在pagenoteEles末尾插入pagenoteTools和pagenoteIcon节点
//     //pagenoteTools节点用于选中文本之后的操作
//     //pagenoteIcon节点用于后续的操作
//     pagenoteEles[pagenoteEles.length - 1].parentNode?.insertBefore(pagenoteTools, pagenoteEles[pagenoteEles.length - 1])
//     pagenoteEles[pagenoteEles.length - 1].parentNode?.insertBefore(pagenoteIcon, pagenoteEles[pagenoteEles.length - 1])
//     pagenoteTools.parentNode?.insertBefore(pagenoteEles[pagenoteEles.length - 1], pagenoteTools)
//     //如果pagenotetools的innerHTML为空的话说明之前被卸载过了，这次需要重新创建React.Root
//     if (pagenoteTools.innerHTML == '') {
//         PagenoteToolsRoot = ReactDOM.createRoot(pagenoteTools)
//     }
//     //渲染PanogenoteToolsRoot
//     PagenoteToolsRoot.render(
//         <ThemeProvider theme={pagenoteConfig.theme}>
//             <CssBaseline />
//             <PagenoteTools
//                 pagenoteID={messageToEditor.value.pagenoteID}
//                 pagenoteIconRoot={pagenoteIconRoot}
//                 pagenoteToolsRoot={PagenoteToolsRoot}
//             />
//         </ThemeProvider>)
//     //选中当前pagenoteanchor元素，高亮选中的文本
//     selectEles(pagenoteEles)
// }

// window.ondblclick = (e) => {
//     // tryToGeneratePagenote()
// }


// chrome.runtime.onMessage.addListener(function (message: TMessageToEditor, sender, sendResponse) {
//     //在当前网站新加一个pagenote
//     console.log(message)
//     if (message.operation == EOperation.openEditor &&
//         message.value.pagenotePosition == EPosition.inPage && sender) {
//         //如果编辑器已经打开了，就提前返回，并响应 editorStatus:true
//         if (document.querySelector('#pagenoteEditor') != null) {
//             sendResponse({ editorStatus: 'open' })
//             return
//         }
        
//         PagenoteEditorRoot.render(<ThemeProvider theme={pagenoteConfig.theme}><Editor openEditor={openEditor} pagenoteID={pagenoteID} pagenoteFragment={pagenoteFragment} pagenoteTimestamp={pagenoteTimestamp} ></Editor></ThemeProvider>)
//         // openEditorInpage(openEditor, pagenoteID, pagenoteFragment, starryNight)
//         sendResponse({ editorStatus: 'open' })
//     }
// })



// import Editor from "../Editor";
// function openEditorInpage(openEditor: TOpenEditor, pagenoteID: string, pagenoteFragment: TPagenoteFragment, theme: starryNight) {

//     PagenoteEditorRoot.render(<Editor openEditor={openEditor} pagenoteID={pagenoteID} pagenoteFragment={pagenoteFragment} theme={theme}></Editor>)
// }

// function createPagenoteIcon(pagenoteID: number, pagenoteToolsEle: HTMLElement) {
//     const pagenoteIcon = document.createElement('pagenoteicon')
//     const pagenoteIconRoot = ReactDOM.createRoot(pagenoteIcon)
//     const pagenoteAnchors = document.querySelectorAll(`pagenoteanchor:not([pagenoteid])`).length == 0 ? document.querySelectorAll(`pagenoteanchor[pagenoteid="${pagenoteID}"]`) : document.querySelectorAll(`pagenoteanchor:not([pagenoteid])`)

//     pagenoteIcon.onclick = (e) => {
//         e.preventDefault()
//         //pagenoteToolsRoot需要在每次点击的时候重新生成
//         //后续离开面板又会立刻销毁
//         const pagenoteToolsRoot = ReactDOM.createRoot(pagenoteToolsEle)
//         pagenoteAnchors[pagenoteAnchors.length - 1].parentElement?.insertBefore(pagenoteToolsEle, pagenoteAnchors[pagenoteAnchors.length - 1])
//         pagenoteAnchors[pagenoteAnchors.length - 1].parentElement?.insertBefore(pagenoteAnchors[pagenoteAnchors.length - 1], pagenoteToolsEle)

//         pagenoteToolsRoot.render(
//             <ThemeProvider theme={pagenoteConfig.theme}>
//                 <CssBaseline />
//                 <PagenoteTools
//                     pagenoteID={pagenoteID}
//                     pagenoteIconRoot={pagenoteIconRoot}
//                     pagenoteToolsRoot={pagenoteToolsRoot}
//                 />
//             </ThemeProvider>)
//         alert('hello pagenoteIcon')
//     }
//     return { pagenoteIcon, pagenoteIconRoot }
// }


//不能跨源
const pnChannel=new BroadcastChannel('pagenoteChannel')
pnChannel.onmessage=e=>{
    console.log(e)
}

// const testUploadFile=document.createElement('div')
// document.documentElement.append(testUploadFile)
// ReactDOM.createRoot(testUploadFile).render(<>
//   <UpLoadImg></UpLoadImg>
// </>)

// function UpLoadImg(){
//   // const inputRef=useRef()
//   const handlerFileSelectClick = (e: React.MouseEvent) => {
//     const fileElem=document.querySelector('#fileElem') as HTMLElement
//     if (fileElem) {
//       fileElem.click();
//     }
//     e.preventDefault(); // 避免导航至“#”
//   }

//   const handleInputChange=()=>{

//     const fileElem = document.getElementById("fileElem") as HTMLInputElement,
//           fileList = document.getElementById("fileList")

//     if (fileList && fileElem && !fileElem.files?.length) {
//       fileList.innerHTML = "<p>没有选择任何文件！</p>";
//     } else if(fileList && fileElem &&fileElem.files) {
//       fileList.innerHTML = "";
//       const list = document.createElement("ul");
//       fileList.appendChild(list);
//       for (let i = 0; i < fileElem.files.length; i++) {
//         const li = document.createElement("li");
//         list.appendChild(li);
//         const img = document.createElement("img");
//         img.src = URL.createObjectURL(fileElem.files[i]);
//         chrome.runtime.sendMessage({
//           operation: 'imgfile',
//           fileURL: img.src
//         }
//         ,
//         async response=>{
//           const anotherIMG=document.createElement('img')
//           anotherIMG.src=URL.createObjectURL(await (await fetch(response.response)).blob())
//           // response.response
//           anotherIMG.alt='同一张图片不同的url'
//           anotherIMG.crossOrigin='anonymous'
//           document.documentElement.append(anotherIMG)
//         }
//         )
//         console.log(img.src)
//         console.log(fileElem.files[i])
//         img.height = 60;
//         // img.onload = () => {
//         //   URL.revokeObjectURL(img.src);
//         // };
//         li.appendChild(img);
//         const info = document.createElement("span");
//         info.innerHTML = `${fileElem.files[i].name}: ${fileElem.files[i].size} bytes`;
//         li.appendChild(info);
//       }
//     }
//   }

// return (<>
//     <input type="file" id="fileElem" multiple accept="image/*" style={{display:"none"}}
//       onChange={handleInputChange}></input>
//     <a href="#" id="fileSelect" onClick={e=>handlerFileSelectClick(e)}>选择一些文件</a>
//     <div id="fileList">
//       <p>没有选择文件</p>
//     </div>
//     <img src="blob:https://dexie.org/66098b08-4b4b-4e22-a5c1-cfe4ad78802b"></img>
//   </>)
// }



