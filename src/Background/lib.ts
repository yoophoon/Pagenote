/******************************************************************************************
 * editor
 */


import { Root } from 'hast'
/**
 * starryNight仓库提供了一个样例用于添加行号，测试发现这个仅对行第一个元素为element类型时才生效
 * 如果时textNode似乎是不生效的
 * @https://github.com/wooorm/starry-night?tab=readme-ov-file#example-adding-line-numbers
 * @param ele 需要添加行号的目标hast树
 * @returns 返回转化后的hast树，每一行用p元素外套一层
 */
export function nodesInline(ele: Root): Root {
    const newChildInline = []
    for (let i = 0; i < ele.children.length; i++) {
        let processedTextNodes: string[] = []
        if (ele.children[i].type === 'text') {
            processedTextNodes = processTextNode((ele.children[i] as HTMLInputElement).value)
        }
        //如果这个节点是元素节点，processedTextNodes则为空
        if (processedTextNodes.length === 0) {
            if (newChildInline.length === 0) {
                newChildInline.push({
                    type: 'element',
                    tagName: 'p',
                    children: [ele.children[i]]
                })
            } else {
                //@ts-ignore
                newChildInline
                    .at(-1)
                    //@ts-ignore
                    .children.push(ele.children[i])
            }
            continue
        }//如果这个节点是文本节点，且其中不存在换行符
        else if (processedTextNodes.length === 1) {
            if (newChildInline.length == 0) {
                newChildInline.push({
                    type: 'element',
                    tagName: 'p',
                    children: [ele.children[i]]
                })
            } else {
                //@ts-ignore
                newChildInline
                    .at(-1)
                    //@ts-ignore
                    .children.push(ele.children[i])
            }
            continue
        }//如果这个节点是文本节点，且存在换行符
        else if (processedTextNodes.length > 1) {
            // 处理当前节点
            for (const [newline, processedTextNode] of processedTextNodes.entries()) {
                //如果newChildInline里面没有数据，需要创建第一个数据
                if (newChildInline.length == 0) {
                    //如果第一个processedTextNode为空，那么创建一个空白p
                    if (newline === 0 && processedTextNode === '') {
                        //@ts-ignore
                        newChildInline.push({
                            type: 'element',
                            tagName: 'p',
                            children: [{
                                type: 'text',
                                value: ' '.replace(' ', '\u200B')
                            }]
                        })
                        continue
                    } //如果第一个processedTextNode为空，那么创建一个包含第一个processedTextNode的值的p
                    else if (newline === 0 && processedTextNode !== '') {
                        //@ts-ignore
                        newChildInline.push({
                            type: 'element',
                            tagName: 'p',
                            children: [{
                                type: 'text',
                                value: processedTextNode
                            }]
                        })
                        continue
                    }
                }//newChildInline已经有值了，则将第一个processedTextNode的值添加到已有值得末尾
                else if (newChildInline.length != 0 && newline == 0) {
                    //@ts-ignore
                    newChildInline
                        .at(-1)
                        //@ts-ignore
                        .children.push({
                            type: 'text',
                            value: processedTextNode,
                        })
                    continue
                } else if (newChildInline.length != 0 && newline > 0) {
                    if (processedTextNode === '') {
                        newChildInline.push({
                            type: 'element',
                            tagName: 'p',
                            children: [{
                                type: 'text',
                                value: ' '.replace(' ', '\u200B')
                            }]
                        })
                    } else {
                        newChildInline.push({
                            type: 'element',
                            tagName: 'p',
                            children: [{
                                type: 'text',
                                value: processedTextNode
                            }]
                        })
                    }
                }
            }
        }
    }
    return {
        type: 'root',
        //@ts-ignore
        children: newChildInline
    }
}

function processTextNode(text: string) {
    const splitedText = text.split('\n')
    const recordLine = []
    for (const element of splitedText) {
        recordLine.push(element)
    }
    return recordLine
}


/******************************************************************************************
 * store
 */


import Dexie from 'dexie'
export function savePagenote(){

}

export function getPagenotes(){
    
}