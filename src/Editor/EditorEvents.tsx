// import { Markdown } from "../lib/react-markdown-editor"

let vfile: string[] = []

export function editorKeyUp(event: KeyboardEvent) {
    event.preventDefault()
    // event.stopPropagation()
    // console.log(event)
    const selection = window.getSelection()

    // console.log('keyup', event)
    // console.log('keyupSelection', selection)
    if (event.key == 'Enter' && event.target && event.target instanceof HTMLElement) {
        const contents = event.target.childNodes

        //避免生成新的div
        if (selection?.isCollapsed &&
            selection.focusNode?.nodeType == Node.ELEMENT_NODE &&
            selection.focusNode.nodeName == 'DIV' &&
            (selection.focusNode as HTMLElement).innerHTML == '<br>') {



            //如果当前行是顶级纯文本行想要换行则需要两个<br />
            (selection.focusNode as HTMLElement).outerHTML = '<br><br>'
        }

        // const currentLine = window.getSelection()
        vfile.push('asd')
        for (let i = 0; i < contents.length; i++) {
            // contents[i].setAttribute('pagenoteeditorcontentline', i + 1 + '')
        }


    }

}

export function editorKeyDown(event: KeyboardEvent) {
    // event.preventDefault()
    // event.stopPropagation()
    // console.log(event)
    const selection = window.getSelection()

    // console.log('keyup', event)
    // console.log('keyupSelection', selection)
    if (event.key == 'Enter' && event.target && event.target instanceof HTMLElement) {
        const contents = event.target.childNodes
        //focusnode is the top textnode, wrap it
        //
        if (selection?.focusNode &&
            selection.focusNode.nodeValue != '' &&
            selection.focusNode.nodeValue != null &&
            Array.from(contents).indexOf((selection.focusNode as HTMLElement)) != -1
        ) {
            // const wraper = document.createElement('p')
            // selection.focusNode.parentNode?.insertBefore(wraper, selection.focusNode)
            // wraper.appendChild(selection.focusNode)
        }


        // const currentLine = window.getSelection()
        vfile.push('asd')
        for (let i = 0; i < contents.length; i++) {
            // contents[i].setAttribute('pagenoteeditorcontentline', i + 1 + '')
        }
    }
}

// export function editorSelect(event: any) {
//     // console.log(event)
//     // //console.log(event, document.getSelection())
//     // const focusnode = document.getSelection()?.focusNode


//     // console.log(focusnode)
//     // if (focusnode && focusnode.nodeType == Node.TEXT_NODE && focusnode.nodeName == '#text') {
//     //     markUp(focusnode.nodeValue ?? '', focusnode)
//     // } else if (focusnode && focusnode.nodeType == Node.ELEMENT_NODE) {

//     // }

// }





// const pagenoteEditorContentEle = document.querySelector('#pagenoteEditorContent')
//     if (pagenoteEditorContentEle) {
//         pagenoteEditorContentEle.addEventListener('keydown', (event) => {
//             if (event.key == 'Enter') {
//                 const contents = pagenoteEditorContentEle.children
//                 for (let i = 0; i < contents.length; i++) {
//                     contents[i].setAttribute('pagenoteeditorcontentline', i + 1 + '')
//                 }
//             }
//         })
//     }



// export function editorClick(event: MouseEvent) {
//     // event.preventDefault()
//     // event.stopPropagation()
//     // console.log(event)
//     // console.log(window.getSelection())
// }