// 块级元素，用于尝试在页面生成position为afterPagenoteFragment的editor

import { EPosition } from "../pagenoteTypes"

// https://developer.mozilla.org/en-US/docs/Web/HTML/Block-level_elements#Elements
const BLOCK_ELEMENTS = [
  'ADDRESS', 'ARTICLE', 'ASIDE', 'BLOCKQUOTE', 'BR', 'DETAILS',
  'DIALOG', 'DD', 'DIV', 'DL', 'DT', 'FIELDSET',
  'FIGCAPTION', 'FIGURE', 'FOOTER', 'FORM', 'H1', 'H2',
  'H3', 'H4', 'H5', 'H6', 'HEADER', 'HGROUP',
  'HR', 'LI', 'MAIN', 'NAV', 'OL', 'P',
  'PRE', 'SECTION', 'TABLE', 'UL', 'TR', 'TH',
  'TD', 'COLGROUP', 'COL', 'CAPTION', 'THEAD', 'TBODY',
  'TFOOT',
]

//用于判断显示在pagenoteFragment后面的编辑器的最小宽度
const minWidthAfterPagenoteFragment = 800

/**
 * 
 * @param pagenoteNodes 选区的文本节点信息
 * @returns error:一些意料之外的情况，
 * 根据向上查找到的第一个块级元素的宽度是否大于800返回
 * 块级元素大于或等于800 => EPosition.afterPagenoteFragment
 * 块级元素小于800      => EPosition.followPagenoteFragment
 */
export function getPagenotePosition(pagenoteEles: HTMLElement[]) {
  let parentElement = pagenoteEles[pagenoteEles.length - 1].parentElement
  while (parentElement && !BLOCK_ELEMENTS.includes(parentElement.tagName) && parentElement != document.body) {
    parentElement = parentElement.parentElement
  }
  console.log(parentElement)
  if (parentElement == null) return 'error'

  const parentElementWidth = parentElement.getBoundingClientRect().width
  console.log(parentElementWidth)
  if (parentElementWidth >= minWidthAfterPagenoteFragment) {
    return {
      width: parentElementWidth,
      position: EPosition.afterPagenoteFragment
    }
  }
  return {
    width: parentElementWidth,
    position: EPosition.followPagenoteFragment
  }
}

/**
 * 
 * @param currentEle 当前元素
 * @returns 最近的块元素
 */
export function getClosestBlock(currentEle: Element) {
  let parentElement = currentEle.parentElement
  while (parentElement && !BLOCK_ELEMENTS.includes(parentElement.tagName) && parentElement != document.body) {
    parentElement = parentElement.parentElement
  }
  return parentElement
}