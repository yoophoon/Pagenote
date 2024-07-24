//import { PagenoteFragmentPresentation } from "./pagenoteFragmentPresentation";
// import { generateFragment } from "./pagenoteFragmentGeneration"

import {  EPosition,  TPagenote, TPagenoteFragment } from "../../../pagenoteTypes"
import { PagenoteGeneration } from "./pagenoteGeneration"
import { getPagenotePosition } from "../../../lib/DOMOperation"








export default function tryToGeneratePagenote(): { pagenoteEles: HTMLElement[], contentPagenote: TPagenote } | undefined {
    const pagenoteID = new Date().getTime()
    const selection = window.getSelection()
    //如果选区不存在或者是未选中状态或者选中的内容只包含换行制表或者空格符号，提前返回
    if (!selection || selection.type == 'Caret' || selection.toString().replace(/[\n\r\t ]*/g, '') == '') {
        console.log('错误的选区产生了，这个选区是空的')
        return
    }

    

    const pagenote = new PagenoteGeneration(selection)

    //生成pagenoteFragment，如果pagenoteFragment未定义则提前返回
    let pagenoteFragment = pagenote.getPagenoteFragmentFromRange(selection.getRangeAt(0))
    if (pagenoteFragment == undefined) {
        console.log('生成pagenoteFragment失败,似乎是因为选区是空的')
        return
    }

    //获取pagenoteNodes，如果pagenoteFragment未定义则提前返回
    let pagenoteNodes = pagenote.getPagenoteNodes(pagenoteFragment)
    if (pagenoteNodes == undefined) {
        console.log('pagenoteFragment:', pagenoteFragment)
        console.log('pagenoteFragment为空,或者其对应不止一处文本,生成pagenoteNodes失败')
        return
    }
    console.log('pagenoteFragment:', pagenoteFragment)
    console.log('pagenoteNodes', pagenoteNodes)
    //获取pagenote
    let pagenoteEles = pagenote.setPagenote(pagenoteNodes)


    const pagenotePosition = getPagenotePosition(pagenoteEles)
    if (pagenotePosition == 'error') {
        console.log('或去pagenote最后一个元素所在块元素宽度失败')
        return
    }

    //开始处理选中的文本（修改页面中的显示状态）

    //添加笔记
    const contentPagenote: TPagenote = {

        editorPosition: pagenotePosition.position,
        pagenoteID,
        pagenoteIndex: pagenoteNodes.startIndex,
        pagenoteTitle: pagenoteFragment.textStart,
        pagenoteContent: (pagenoteFragment.prefix ?? '') + pagenoteFragment.textStart + (pagenoteFragment.textEnd??'') + (pagenoteFragment.suffix ?? ''),
        pagenoteTimestamp: new Date().getTime(),
        pagenoteFragment,
        pagenoteTarget: window.location.origin + window.location.pathname,
        showTools: false,
        showEditor: false,
        showEditorTitle:true,
        showEditorTools:true,
        renderMarkdown:false,
        editorContentScrollTop:0,
        editorWidth:pagenotePosition.position==EPosition.afterPagenoteFragment?`${pagenotePosition.width}px`:"300px",
        editorHeight:"200px",
    }

    return { pagenoteEles, contentPagenote }
}

export function selectEles(target: HTMLElement[]) {
    //重新选中选区
    const selection = window.getSelection()
    if (selection == null || target.length==0) return
    const newSelectedRange = new Range()
    newSelectedRange.setStart(target[0], 0)
    newSelectedRange.setEnd(target[target.length - 1], 1)
    selection.removeAllRanges()
    selection.addRange(newSelectedRange)
}


export function getPagenoteFragmentEleAnchor(pagenoteFragment:TPagenoteFragment){
    const pagenote = new PagenoteGeneration()
    const pagenoteNodes=pagenote.getPagenoteNodes(pagenoteFragment)
    if (pagenoteNodes == undefined) {
        console.log('pagenoteFragment:', pagenoteFragment)
        console.log('pagenoteFragment为空,或者其对应不止一处文本,生成pagenoteNodes失败')
        return
    }
    console.log('pagenoteFragment:', pagenoteFragment)
    console.log('pagenoteNodes', pagenoteNodes)
    //获取pagenote
    return pagenote.setPagenote(pagenoteNodes)
}
