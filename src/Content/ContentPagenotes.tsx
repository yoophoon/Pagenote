import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { PagenoteGeneration } from "./PagenoteTools/pagenoteFragment/pagenoteGeneration"
import { TPagenote, EOperation, TContentPagenote, TSetContentPagenotes } from "../pagenoteTypes"
import PagenoteIcon from "./PagenoteTools/PagenoteIcon"
import RegistMessageListener from "./RegistMessageListener"

export default function ContentPagenotes() 
{
    const [pagenotesInfo, setPagenotesInfo] = useState<TContentPagenote[]>([])
    useEffect(() => {
        //处理页面第一次加载，从后台获取数据
        // initPagenotes(setPagenotesInfo)
        RegistMessageListener(setPagenotesInfo)
        //处理页面选中事件
        document.onmouseup=(e)=>{
            console.log(e)
            if(e.button==0){
                e.preventDefault()
                e.stopPropagation()
                handlerContentMouseup(setPagenotesInfo)
            }
        }
    },[])
    console.log(pagenotesInfo)
    return (<>
        {pagenotesInfo.map(pagenoteInfo=>{
            console.log(pagenoteInfo&&
                pagenoteInfo.pagenoteIcon==undefined&&
                pagenoteInfo.contentPagenote.showEditor)
            return (
                pagenoteInfo&&
                pagenoteInfo.pagenoteIcon&&
                createPortal(
                    <PagenoteIcon
                        key={pagenoteInfo.contentPagenote.pagenoteID}
                        pagenoteInfo={pagenoteInfo.contentPagenote}
                        setAllPagenotesInfo={setPagenotesInfo}
                        >
                    </PagenoteIcon>,
                    pagenoteInfo.pagenoteIcon
                )
            )||(pagenoteInfo&&
                pagenoteInfo.pagenoteIcon==undefined&&
                pagenoteInfo.contentPagenote.showEditor&&
                createPortal(
                    // <EditorInPage
                    //     key={pagenoteInfo.contentPagenote.pagenoteID}
                    //     pagenoteInfo={pagenoteInfo.contentPagenote}
                    //     setAllPagenotesInfo={setPagenotesInfo}
                    //     >
                    // </EditorInPage>
                    <div>hello world</div>,
                    document.body
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
import EditorInPage from "../Editor/EditorInPage"


function handlerContentMouseup(setPagenotesInfo: TSetContentPagenotes)
{
    const result = tryToGeneratePagenote()
    if (result == undefined) {
        return
    }
    const { pagenoteEles, contentPagenote } = result
    pagenoteEles.forEach(pagenoteEle=>pagenoteEle.setAttribute('pagenoteid',contentPagenote.pagenoteID.toString()))
    const pagenoteIcon=document.createElement('pagenoteIcon')
    pagenoteIcon.setAttribute('pagenoteid',contentPagenote.pagenoteID.toString())
    //调整位置
    pagenoteEles[pagenoteEles.length - 1].parentNode?.insertBefore(pagenoteIcon, pagenoteEles[pagenoteEles.length - 1])
    pagenoteEles[pagenoteEles.length - 1].parentNode?.insertBefore(pagenoteEles[pagenoteEles.length - 1], pagenoteIcon)
    

    setPagenotesInfo(pagenotesInfo => {
        //检查选中的内容是否已经在之前生成过pagenoe
        for (let i = 0; i < pagenotesInfo.length; i++) {
            if (pagenotesInfo[i]?.contentPagenote.pagenoteContent == contentPagenote.pagenoteContent) {
                pagenoteEles.forEach(pagenoteEle => pagenoteEle.outerHTML = pagenoteEle.innerHTML)
                pagenoteIcon.remove()
                selectEles(Array.from(document.querySelectorAll(`pagenoteanchor[pagenoteid="${pagenotesInfo[i]?.contentPagenote.pagenoteID}"]`)))
                return pagenotesInfo
            }
        }
        selectEles(Array.from(document.querySelectorAll(`pagenoteanchor[pagenoteid="${contentPagenote.pagenoteID}"]`)))
        return [...pagenotesInfo, {
            pagenoteIcon,
            contentPagenote: {
                ...contentPagenote,
                showTools:true,
            }
        }]
    })
}


/*******************************************************************************
 * tools
 */

function getPagenoteEditorContainer():Element{
    const PagenoteEditor = document.querySelector('#pagenoteeditor') ?? document.createElement('div')
    PagenoteEditor.id = 'pagenoteeditor'
    document.documentElement.append(PagenoteEditor)
    return PagenoteEditor
}