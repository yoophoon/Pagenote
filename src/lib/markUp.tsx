import { renderToStaticMarkup } from "react-dom/server";
import { Markdown } from "./react-markdown-editor";
import remarkGfm from "remark-gfm";



export function markUp(markdown: string, node: Node) {
    chrome.runtime.sendMessage({ operation: 'render', value: markdown });
    const markUp = renderToStaticMarkup(<Markdown remarkPlugins={[remarkGfm]}>{markdown}</Markdown>)
    const markUpNode = new DOMParser().parseFromString(markUp, 'text/html')
    if (node.nodeValue == null ||
        markUpNode.body.innerText == node.nodeValue) {
        return
    }
    const newFocus = document.createTextNode('')
    markUpNode.body.childNodes[0].appendChild(newFocus)

    node.parentElement?.insertBefore(markUpNode.body.childNodes[0], node)
    node.parentElement?.removeChild(node)


    document.getSelection()?.modify('move', "forward", "word")



}

export function markUpStr(markdown: string) {
    return renderToStaticMarkup(<Markdown remarkPlugins={[remarkGfm]}>{markdown}</Markdown>)
}