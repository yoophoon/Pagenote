import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { TPagenote } from "../pagenoteTypes"
import { PagenoteGeneration } from "./PagenoteTools/pagenoteFragment/pagenoteGeneration"
import { EOperation } from "../pagenoteTypes"
import PagenoteIcon from "./PagenoteTools/PagenoteIcon"

export default function ContentPagenotes() 
{
    const [pagenotesInfo, setPagenotesInfo] = useState<({pagenoteIcon:HTMLElement,contentPagenote:TPagenote} | undefined)[]>([])
    useEffect(() => {
        //处理页面第一次加载，从后台获取数据
        initPagenotes(setPagenotesInfo)
        //处理页面选中事件
        document.onmouseup=(e)=>{
            e.preventDefault()
            e.stopPropagation()
            handlerContentMouseup(setPagenotesInfo)
        }
    },[])

    return (<>
        {pagenotesInfo.map(pagenoteInfo=>{
            return (
                pagenoteInfo&&
                createPortal(
                    <PagenoteIcon
                        key={pagenoteInfo.contentPagenote.pagenoteID}
                        pagenoteInfo={pagenoteInfo}
                        allPagenotesInfo={pagenotesInfo}
                        setAllPagenotesInfo={setPagenotesInfo}
                        >
                    </PagenoteIcon>,
                    pagenoteInfo.pagenoteIcon
                )
            )
        })}
    </>)
}

/*******************************************************************************
 * init
 */


function initPagenotes(setPagenoteIcons: React.Dispatch<React.SetStateAction<({
    pagenoteIcon: HTMLElement;
    contentPagenote: TPagenote;
} | undefined)[]>>)
{
    chrome.runtime.sendMessage({
        operation: EOperation.getPagenotes,
        value: {
            origin: window.location.origin+window.location.pathname
        }
    }, (response) => {
        const pagenoteIcons = presentPagenotes(response.pagenotes)
        setPagenoteIcons(pagenoteIcons)
    })
}

function presentPagenotes(contentPagenotes: TPagenote[])
{
    return contentPagenotes.map(contentPagenote => {
        //如果pagenoteFragment不存在，说明这个contentPagenote是与网页内容无关的附加笔记
        if (contentPagenote.pagenoteFragment == undefined) return 
        //开始处理页面内的pagenote
        const pagenoteGeneration = new PagenoteGeneration()
        const pagenoteNodes = pagenoteGeneration.getPagenoteNodes(contentPagenote.pagenoteFragment)
        //获取pagenoteFragment对应的元素
        const pagenoteEles = pagenoteGeneration.setPagenote(pagenoteNodes)
        //设置pagenoteFragment对应元素的pagenoteid属性
        pagenoteEles.forEach(pagenoteEle => pagenoteEle.setAttribute('pagenoteid', contentPagenote.pagenoteID.toString()))
        //添加末尾的图标
        const pagenoteIcon = document.createElement('pagenoteicon')
        pagenoteIcon.setAttribute('pagenoteid', contentPagenote.pagenoteID.toString())
        pagenoteEles[pagenoteEles.length - 1].parentElement?.insertBefore(pagenoteIcon, pagenoteEles[pagenoteEles.length - 1])
        pagenoteEles[pagenoteEles.length - 1].parentElement?.insertBefore(pagenoteEles[pagenoteEles.length - 1], pagenoteIcon)
        return {pagenoteIcon,contentPagenote}
    })
}



/*******************************************************************************
 * save
 */
import tryToGeneratePagenote , { selectEles } from "./PagenoteTools/pagenoteFragment"


function handlerContentMouseup(setPagenotesInfo: React.Dispatch<React.SetStateAction<({ pagenoteIcon: HTMLElement; contentPagenote: TPagenote; } | undefined)[]>>)
{
    const result = tryToGeneratePagenote()
    if (result == undefined) {
        return
    }
    const { pagenoteEles, messageToEditor } = result
    pagenoteEles.forEach(pagenoteEle=>pagenoteEle.setAttribute('pagenoteid',messageToEditor.value.pagenoteID.toString()))
    const pagenoteIcon=document.createElement('pagenoteIcon')
    pagenoteIcon.setAttribute('pagenoteid',messageToEditor.value.pagenoteID.toString())
    //调整位置
    pagenoteEles[pagenoteEles.length - 1].parentNode?.insertBefore(pagenoteIcon, pagenoteEles[pagenoteEles.length - 1])
    pagenoteEles[pagenoteEles.length - 1].parentNode?.insertBefore(pagenoteEles[pagenoteEles.length - 1], pagenoteIcon)
    

    setPagenotesInfo(pagenotesInfo => {
        //检查选中的内容是否已经在之前生成过pagenoe
        for (let i = 0; i < pagenotesInfo.length; i++) {
            if (pagenotesInfo[i]?.contentPagenote.pagenoteContent == messageToEditor.value.pagenoteContent) {
                pagenoteEles.forEach(pagenoteEle => pagenoteEle.outerHTML = pagenoteEle.innerHTML)
                pagenoteIcon.remove()
                selectEles(Array.from(document.querySelectorAll(`pagenoteanchor[pagenoteid="${pagenotesInfo[i]?.contentPagenote.pagenoteID}"]`)))
                return pagenotesInfo
            }
        }
        selectEles(Array.from(document.querySelectorAll(`pagenoteanchor[pagenoteid="${messageToEditor.value.pagenoteID}"]`)))
        return [...pagenotesInfo, {
            pagenoteIcon,
            contentPagenote: {
                pagenoteID: messageToEditor.value.pagenoteID,
                pagenoteTimestamp: messageToEditor.value.pagenoteTimestamp,
                showTools:true,
                pagenoteIndex: messageToEditor.value.startIndex,
                pagenoteTitle: messageToEditor.value.pagenoteTitle,
                pagenoteContent: messageToEditor.value.pagenoteContent,
                pagenoteFragment: messageToEditor.value.pagenoteFragment,
            }
        }]
    })
}