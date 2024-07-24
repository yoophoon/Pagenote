import {  EOperation, EPosition, TSetContentPagenotes, TMessageToEditor} from "../pagenoteTypes";

export default function RegistMessageListener(setPagenotesInfo: TSetContentPagenotes)
{
  chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) 
  {
    if (message.operation == EOperation.addPagenote &&
        message.value.editorPosition == EPosition.inPage && sender) 
    {
      //如果编辑器已经打开了，就提前返回，并响应 editorStatus:true
      if (document.querySelector('#pagenoteeditor')?.innerHTML != '') {
        sendResponse({ editorStatus: 'opened' })
        return
      }
      const messageToEditor:TMessageToEditor = message
      setPagenotesInfo(pagenotesInfo=>{
        sendResponse({ editorStatus: pagenotesInfo })
        return [...pagenotesInfo,{contentPagenote:messageToEditor.value}]
      })
      return true
    } 
    //响应定位至目标pagenote的消息
    else if(message.operation==EOperation.scrollIntoView)
    {
      console.log(message)
      const targetEle=document.querySelector(`pagenoteicon[data-pagenoteid="${message.value.pagenoteID}"]`)
      if(targetEle){
        
        targetEle.scrollIntoView({behavior:'smooth',block:'start',inline:'center'})
      }
    }
  })
}