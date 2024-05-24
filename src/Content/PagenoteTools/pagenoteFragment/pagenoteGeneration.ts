import { TPagenoteFragment, TPagenoteNodes } from '../../../pagenoteTypes'

export class PagenoteGeneration {
    private _pagenoteRange: Range | null = null
    private _pagenoteFragment: TPagenoteFragment = {
        prefix: '',
        textStart: '',
        textEnd: '',
        suffix: '',
    }
    constructor(selection: Selection) {
        if (selection.toString() != '' && selection.getRangeAt(0)) {
            this._pagenoteRange = selection.getRangeAt(0)
        }
    }

    /**
     * 查询字符串在容器字符串中出现的次数
     * @param query 查询字符串是否是body文本中的唯一字符串
     * @param containerStr 容器字符串
     * @returns count 查询的字符串在容器字符串中出现的次数
     */
    timesInDocument(query: string, containerStr: string): number {
        let position = 0, index = 0, count = 0
        while (index > -1) {
            index = containerStr.indexOf(query, position)
            if (index != -1) count++
            position = index + 1
        }
        return count
    }
    /**
     * 
     * @param root 获取文本节点的顶层元素，默认为document.body
     * @returns 被查询元素下的所有文本节点
     */
    getAllTextNodes(root: HTMLElement = document.body): Node[] {
        const textNodes: Node[] = []
        const visibleTextTreeWalker = document.createTreeWalker(
            root,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode(node) {
                    const container = node.parentElement
                    if (container == null) return NodeFilter.FILTER_REJECT
                    const containerStyle = window.getComputedStyle(container)
                    let isVisibleEle =
                        //
                        containerStyle.getPropertyValue('height') != '' ||
                        containerStyle.getPropertyValue('height') != '0px' ||
                        containerStyle.getPropertyValue('width') != '' ||
                        containerStyle.getPropertyValue('width') != '0px' ||
                        containerStyle.getPropertyValue('visibility') != 'hidden' ||
                        containerStyle.getPropertyValue('display') != 'none'
                    // window.getComputedStyle()
                    let isNonTargetedEle = NonTargetedEle.find(target => target == container.nodeName)
                    if (isVisibleEle && !isNonTargetedEle) {
                        return NodeFilter.FILTER_ACCEPT;
                    } else {
                        return NodeFilter.FILTER_SKIP
                    }
                },
            },
        );
        //treewalker的current节点默认为root节点，将current节点定位到firstchild并推入textNodes数组
        if (visibleTextTreeWalker.firstChild() != null) textNodes.push(visibleTextTreeWalker.currentNode)
        //取出文本节点
        while (visibleTextTreeWalker.nextSibling() != null) {
            textNodes.push(visibleTextTreeWalker.currentNode)
        }
        return textNodes
    }
    /**
     * 
     * @param range 选区范围用于生成pagenoteFragment
     * @returns pagenoteFragment对象
     */
    getPagenoteFragmentFromRange(selectedRange: Range) {
        const range = selectedRange.cloneRange()
        //如果range里面没内容就直接返回
        if (range.toString() == '' ||
            this.normalizeStr(range.toString()) == '' ||
            this.normalizeStr(range.toString()) == ' '
        ) return
        let startContainer = range.startContainer
        let startOffset = range.startOffset
        let endContainer = range.endContainer
        let endOffset = range.endOffset

        //所有文本节点的内容拼接之后的字符串，用于查询textStart是否时唯一的
        let allTextStr = ''
        let allWords: Intl.SegmentData[] = []
        //range中的文本节点
        let textNodesInRange: Node[] = [], textNodesInBody = this.getAllTextNodes()
        //range中的文本节点在body中的位置
        let startNodeIndexInBody = -1, endNodeIndexInBody = -1
        let pagenoteStartBoundary = -1, pagenoteEndBoundary = -1
        let segment: Intl.Segmenter | undefined = this.makeNewSegmenter()
        for (let i = 0; i < textNodesInBody.length; i++) {
            allTextStr += this.normalizeStr(textNodesInBody[i].nodeValue)
            if (segment) {
                allWords.push(...Array.from(segment?.segment(this.normalizeStr(textNodesInBody[i].nodeValue))))
            }
            if (range.intersectsNode(textNodesInBody[i])) {
                textNodesInRange.push(textNodesInBody[i])
                //第一次满足条件既能确定startNodeIndexInBody的值，后续无需进行更新
                if (startNodeIndexInBody == -1) startNodeIndexInBody = i
                //每次满足条件都对endNodeIndexInBody的值进行更新，最后一次更新的值即为endNodeIndexInBody的真实的值
                endNodeIndexInBody = i
            }
            //对由文本节点拼接而成的字符串再次处理，防止由于行头和行尾的空格符号拼接而成的连续两个空白符号
            //allTextStr = this.normalizeStr(allTextStr)

            //获取startContainer之前节点的单词个数
            //pagenoteEndBoundary应该为pagenoteStartBoundary+Array.from(this.normalizeStr(textStart)).length
            if (startNodeIndexInBody == -1 && segment)
                pagenoteStartBoundary = allWords.length
            // if (startNodeIndexInBody == -1 && segment)
            //     pagenoteEndBoundary += Array.from(segment.segment(this.normalizeStr(textNodesInBody[i].nodeValue))).length
        }

        // 处理textStart
        let textStart = ''
        // 如果选择的文本在1个textNode内
        if (textNodesInRange.length == 1) {
            //处理textStart的开始边界
            startOffset = this.getWordBoundaryStartIndex(textNodesInRange[0].nodeValue, startOffset)
            startOffset = this.normalizeStr((textNodesInRange[0].nodeValue ?? '').substring(0, startOffset)).length
            pagenoteEndBoundary = pagenoteStartBoundary
            if (segment) {
                pagenoteStartBoundary += Array.from(segment.segment(this.normalizeStr(textNodesInRange[0].nodeValue).substring(0, startOffset))).length
            }
            //处理textStart的结束边界
            endOffset = this.getWordBoundaryEndIndex(textNodesInRange[0].nodeValue, endOffset)
            endOffset = this.normalizeStr((textNodesInRange[0].nodeValue ?? '').substring(0, endOffset)).length
            textStart = this.normalizeStr(textNodesInRange[0].nodeValue).substring(startOffset, endOffset)
            if (segment) {
                pagenoteEndBoundary += Array.from(segment.segment(this.normalizeStr(textNodesInRange[0].nodeValue).substring(0, endOffset))).length
            }
        } else {
            // 如果选择的文本在多个textNode内

            // 处理第一个节点
            startOffset = this.getWordBoundaryStartIndex(textNodesInRange[0].nodeValue, startOffset)
            startOffset = this.normalizeStr((textNodesInRange[0].nodeValue ?? '').substring(0, startOffset)).length
            textStart += this.normalizeStr(textNodesInRange[0].nodeValue ?? '').substring(startOffset)
            pagenoteEndBoundary = pagenoteStartBoundary

            if (segment) {
                pagenoteStartBoundary += Array.from(segment?.segment(this.normalizeStr(textNodesInRange[0].nodeValue).substring(0, startOffset))).length
                pagenoteEndBoundary += Array.from(segment?.segment(this.normalizeStr(textNodesInRange[0].nodeValue))).length
            }
            //处理开始节点和结束节点中间的文本节点
            for (let i = 1; i < textNodesInRange.length - 1; i++) {
                textStart += this.normalizeStr(textNodesInRange[i].nodeValue)
                if (segment)
                    pagenoteEndBoundary += Array.from(segment?.segment(this.normalizeStr(textNodesInRange[i].nodeValue))).length
            }

            //如果结束节点
            endOffset = this.getWordBoundaryEndIndex(textNodesInRange[textNodesInRange.length - 1].nodeValue, endOffset)
            endOffset = this.normalizeStr((textNodesInRange[textNodesInRange.length - 1].nodeValue ?? '').substring(0, endOffset)).length
            textStart += this.normalizeStr(textNodesInRange[textNodesInRange.length - 1].nodeValue).substring(0, endOffset)
            if (segment) {
                pagenoteEndBoundary += Array.from(segment?.segment(this.normalizeStr(textNodesInRange[textNodesInRange.length - 1].nodeValue).substring(0, endOffset))).length
            }
        }
        //如果textStart在allTextStr中出现不止一次的话就说明存在重复的textStart
        //需要精确定位textStart的话就需要使用pagenoteFragment中的prefix和suffix属性了
        //这里采用每次增加三次词或者整个文本节点的文本测试prefix和suffix是否时唯一的
        //查询的内容类似于prefix+textStart+suffix
        if (this.timesInDocument(textStart, allTextStr) != 1) {
            let tempPrefix = '', tempSuffix = ''
            let expandDist = 0

            //获取所有文本单词

            //开始处理prefix和suffix
            while (this.timesInDocument(tempPrefix + textStart + tempSuffix, allTextStr) != 1) {

                tempPrefix = this.additionalWords(allWords, pagenoteStartBoundary - expandDist - 1, false) + tempPrefix
                tempSuffix += this.additionalWords(allWords, pagenoteEndBoundary + expandDist, true)
                if (pagenoteStartBoundary - expandDist < 0 && (allWords && pagenoteEndBoundary + expandDist >= allWords.length)) {
                    break
                }
                expandDist = expandDist + 3
            }
            this._pagenoteFragment.prefix = tempPrefix
            this._pagenoteFragment.suffix = tempSuffix
        }
        this._pagenoteFragment.textStart = textStart
        return this._pagenoteFragment
    }

    /**
     * 
     * @param text 确定开始单词边界的字符串
     * @param originOffset 原始的位置，这个位置可能是在单词内部
     * @returns 返回一个指定单词边界的位置
     */
    getWordBoundaryStartIndex(text: string | null, originOffset: number): number {
        let boundaryStart = originOffset
        if (text == '' || text == null) return 0
        const segment = this.makeNewSegmenter()
        if (segment) {
            let words = Array.from(segment?.segment(text))
            for (let i = 0; i < words.length; i++) {
                if (words[i].index >= originOffset) {
                    if (i - 1 < 0) return 0
                    return boundaryStart = words[i - 1].isWordLike ? words[i - 1].index : words[i - 1].index + words[i - 1].segment.length
                }
            }
            //处理originOffset大于最后一个单词的下标的情况
            if (originOffset > words[words.length - 1].index) {
                return boundaryStart = words[words.length - 1].isWordLike ? words[words.length - 1].index : words[words.length - 1].index + words[words.length - 1].segment.length
            }
        }
        return boundaryStart
    }

    /**
     * 
     * @param text 确定结束单词边界的字符串
     * @param originOffset 原始的位置，这个位置可能是在单词的内部
     * @returns 返回一个指定单词边界的位置
     */
    getWordBoundaryEndIndex(text: string | null, originOffset: number): number {
        let boundaryEnd = originOffset
        if (text == '' || text == null) return 0
        const segment = this.makeNewSegmenter()
        if (segment) {
            let words = Array.from(segment?.segment(text))
            for (let i = 0; i < words.length; i++) {
                if (words[i].index >= originOffset) {
                    if (i - 1 < 0) return 0
                    return boundaryEnd = words[i - 1].isWordLike ? words[i - 1].index + words[i - 1].segment.length : words[i - 1].index
                }
            }
            //处理originOffset大于最后一个单词的下标的情况
            if (originOffset > words[words.length - 1].index) {
                return boundaryEnd = words[words.length - 1].isWordLike ? words[words.length - 1].index + words[words.length - 1].segment.length : words[words.length - 1].index
            }
        }
        return boundaryEnd
    }

    /**
     * 
     * @returns 返回将文本分割为词的Intl.Segmenter 对象
     */
    makeNewSegmenter() {
        if (Intl.Segmenter) {
            let lang = document.documentElement.lang;
            if (!lang) {
                lang = navigator.languages[0];
            }
            return new Intl.Segmenter(lang, { granularity: 'word' });
        }
        return undefined;
    };

    /**
     * 
     * @param text 需要格式化的字符串
     * @returns 返回移除重复空格或换行的字符串
     */
    normalizeStr(text: string | null) {
        return (text ?? '').replace(/[\n\t\r ]+/g, ' ')
    }

    //

    /**
     * 
     * @param target 用于增加额外文本的segments
     * @param index 用于定位
     * @param forward 是否向前增加文本
     * @returns 增加的文本
     */
    additionalWords(target: Intl.SegmentData[] | undefined, index: number, forward: boolean): string {
        if (!target || target.length == 0) return ''
        let additionalWords = ''
        //如果额外的单词下标超过allWords下标则返回空字符串
        if (forward) {
            for (let i = index; i < (index + 3 < target.length ? index + 3 : target.length); i++) {
                additionalWords += target[i].segment
            }
        } else {
            for (let i = index; i > (index - 3 > -1 ? index - 3 : -1); i--) {
                additionalWords = target[i].segment + additionalWords
            }
        }
        return additionalWords
    }

    /**
     * 
     * @param pagenoteFragment pagenote片段用于索引pagenote的文本
     * @returns 返回TPagenoteNodes对象，这个对象有三个属性{
     *      startOffset:开始节点的偏移,
     *      endOffset:结束节点的偏移,
     *      pagenoteNodes:包含pagenote的所有文本节点
     * }
     */
    getPagenoteNodes(pagenoteFragment: TPagenoteFragment | undefined): TPagenoteNodes | undefined {
        if (!pagenoteFragment) return
        let pagenoteNodes: Node[] = []
        let pagenoteFragmentStr = (pagenoteFragment.prefix ?? '') +
            pagenoteFragment.textStart +
            (pagenoteFragment.textEnd ?? '') +
            (pagenoteFragment.suffix ?? '')
        let allTextNodes = this.getAllTextNodes(), allTextNodesIndex: number[] = []
        let allTextStr = ''
        let pagenoteTextStartIndex, pagenoteTextEndIndex
        let startOffset = -1, endOffset = -1
        for (let i = 0; i < allTextNodes.length; i++) {
            allTextStr += this.normalizeStr(allTextNodes[i].nodeValue)
            allTextNodesIndex.push(allTextStr.length)
        }
        //如果当前页面不止一处pagenote的文本则提前返回
        if (this.timesInDocument(pagenoteFragmentStr, allTextStr) != 1) return

        pagenoteTextStartIndex = allTextStr.indexOf(pagenoteFragmentStr) + (pagenoteFragment.prefix ?? '').length
        pagenoteTextEndIndex = pagenoteTextStartIndex + pagenoteFragment.textStart.length
        for (let i = 0; i < allTextNodes.length; i++) {
            //处理包含pagenoteFragment文本的第一个节点，并将分割之后的节点数组赋值给pagenoteNodes
            if (pagenoteTextStartIndex >= allTextNodesIndex[i] - this.normalizeStr(allTextNodes[i].nodeValue).length && pagenoteTextStartIndex < allTextNodesIndex[i]) {
                pagenoteNodes = allTextNodes.slice(i)
                startOffset = pagenoteTextStartIndex + this.normalizeStr(allTextNodes[i].nodeValue).length - allTextNodesIndex[i]
            }
            //处理包含pagenoteFragment文本的最后一个节点，并将分割后的pagenoteNodes重新赋值给pagenoteNodes
            if (pagenoteTextEndIndex > allTextNodesIndex[i] - this.normalizeStr(allTextNodes[i].nodeValue).length && pagenoteTextEndIndex <= allTextNodesIndex[i]) {
                pagenoteNodes = pagenoteNodes.slice(0, i + pagenoteNodes.length - allTextNodes.length + 1)
                endOffset = pagenoteTextEndIndex + this.normalizeStr(allTextNodes[i].nodeValue).length - allTextNodesIndex[i]
            }
        }
        if (pagenoteNodes.length == 1) {
            [startOffset, endOffset] = this.getIndexInNode(pagenoteNodes[0].nodeValue ?? '', pagenoteFragment.textStart, startOffset, endOffset)
        } else if (pagenoteNodes.length > 1) {
            startOffset = this.getIndexInNodes(pagenoteNodes[0].nodeValue ?? '', pagenoteFragment.textStart, startOffset, true)
            endOffset = this.getIndexInNodes(pagenoteNodes[0].nodeValue ?? '', pagenoteFragment.textStart, endOffset, false)
        }
        return { startOffset, endOffset, pagenoteNodes }
    }

    /**
     * pagenoteFragment文本节点数量大于1时使用这个方法获取textStart在nodeValue中的正真偏移值
     * @param query 查询字符串，传入node.nodeValue
     * @param container 传入textStart
     * @param originIndex normalize之后的原始偏移值
     * @param isStart 是获取开始节点的偏移值还是结束节点的偏移值
     * @returns 真正的偏移值
     */
    getIndexInNodes(query: string, container: string, originIndex: number, isStart: boolean) {
        if (isStart) {
            while (originIndex < query.length && !container.startsWith(this.normalizeStr(query.substring(originIndex)))) {
                originIndex++
            }
        } else {
            while (originIndex < query.length && !container.endsWith(this.normalizeStr(query.substring(0, originIndex)))) {
                originIndex++
            }
        }
        return originIndex
    }
    /**
     * pagenoteFragment文本节点数量为1时使用这个方法获取textStart在nodeValue中的正真偏移值
     * @param query 查询字符串，传入node.nodeValue
     * @param container 传入textStart
     * @param originStart normalize之后的原始开始偏移值
     * @param originEnd normalize之后的原始结束偏移值
     * @returns 一个包含开始偏移和结束偏移的数组
     * 如果获取失败的话方法返回的数组两个值均为-1
     */
    getIndexInNode(query: string, container: string, originStart: number, originEnd: number) {
        for (originStart; originStart <= query.length; originStart++) {
            for (originEnd; originEnd <= query.length; originEnd++) {
                if (container == this.normalizeStr(query.substring(originStart, originEnd))) {
                    return [originStart, originEnd]
                }
            }
        }
        return [-1, -1]
    }

    /**
     * 
     * @param pagenoteNodes 设置pagenoteNodes的TPagenoteNodes对象
     * @returns 包含所有pagenoteNodes的pagenoteEle数组
     */
    setPagenote(pagenoteNodes: TPagenoteNodes | undefined): HTMLElement[] {
        if (!pagenoteNodes) return []
        let pagenoteEles: HTMLElement[] = []
        //如果pagenoteNodes的文本节点只有一个，则需要使用startOffset和endOffset同时对这个文本节点的值进行分割
        if (pagenoteNodes.pagenoteNodes.length == 1) {
            pagenoteEles.push(this.markupPagenoteNode(
                pagenoteNodes.pagenoteNodes[0],
                pagenoteNodes.startOffset,
                pagenoteNodes.endOffset))
        }
        //如果pagenoteNodes的文本节点大于一个，则需要使用startOffset和endOffset分别对开始节点和结束节点进行处理
        //如果还有中间节点的话，直接将中间节点的全部内容加入到pagenoteEle
        else if (pagenoteNodes.pagenoteNodes.length >= 2) {
            for (let i = 0; i < pagenoteNodes.pagenoteNodes.length; i++) {
                if (i == 0) {
                    pagenoteEles.push(this.markupPagenoteNode(
                        pagenoteNodes.pagenoteNodes[i],
                        pagenoteNodes.startOffset,
                        this.normalizeStr(pagenoteNodes.pagenoteNodes[i].nodeValue).length))
                } else if (i == pagenoteNodes.pagenoteNodes.length - 1) {
                    pagenoteEles.push(this.markupPagenoteNode(
                        pagenoteNodes.pagenoteNodes[i],
                        0,
                        pagenoteNodes.endOffset))
                } else if (i != 0 && i != pagenoteNodes.pagenoteNodes.length - 1) {
                    pagenoteEles.push(this.markupPagenoteNode(
                        pagenoteNodes.pagenoteNodes[i],
                        0,
                        this.normalizeStr(pagenoteNodes.pagenoteNodes[i].nodeValue).length))
                }
            }
        }
        return pagenoteEles
    }
    /**
     * 
     * @param node 需要设置pagenote的节点
     * @param startIndex pagenote在当前节点开始的偏移值
     * @param endIndex pagenote在当前节点结束的偏移值
     * @returns 返回pagenoteEle，这个元素记录了pagenote的文本
     */
    markupPagenoteNode(node: Node, startIndex: number, endIndex: number) {
        let pagenoteEle = document.createElement('pagenoteanchor')
        if (node.nodeType == Node.TEXT_NODE) {
            let nodeStr = this.normalizeStr(node.nodeValue)
            //设置pagenoteEle的文本
            pagenoteEle.innerText = nodeStr.substring(startIndex, endIndex)
            //设置pagenoteEle前后的节点
            let starter = node.cloneNode()
            let ender = node.cloneNode()
            starter.nodeValue = nodeStr.substring(0, startIndex)
            ender.nodeValue = nodeStr.substring(endIndex)
            //调整这三个节点的位置并移除原先的节点
            node.parentElement?.insertBefore(starter, node)
            node.parentElement?.insertBefore(pagenoteEle, node)
            node.parentElement?.insertBefore(ender, node)
            node.parentElement?.removeChild(node)
        }
        return pagenoteEle
    }
}


//非目标标签元素和目标标签元素，用于过滤标签
const NonTargetedEle: string[] = ['SCRIPT', 'LINK', 'STYLE']
const TargetedEle: string[] = []



