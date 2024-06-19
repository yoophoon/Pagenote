import { Root } from 'hast'
import { Grammar } from '@wooorm/starry-night'

export type TPagenoteFragment = {
    prefix?: string,
    textStart: string,
    textEnd?: string,
    suffix?: string
}

export enum EOperation {
    addPagenote,
    openEditor,
    openNotesInSidepanel,
    savePagenote,
    getPagenotes,
    render,
    sidePanel
}

export enum EPosition {
    inPage,
    followPagenoteFragment,
    afterPagenoteFragment
}



export type TOpenEditor = {
    open: boolean,
    position: EPosition,
    initTitle: string,
    initContent: string,
}

//maybe used in the future
interface starryNight {
    flagToScope: (flag: string) => string | undefined;
    highlight: (value: string, scope: string) => Root;
    missingScopes: () => ReadonlyArray<string>;
    register: (grammars: ReadonlyArray<Readonly<Grammar>>) => Promise<undefined>;
    scopes: () => ReadonlyArray<string>;
}

export interface IEditorProps extends React.HTMLAttributes<HTMLElement> {
    openEditor: TOpenEditor;
    pagenoteID: number;
    pagenoteFragment: TPagenoteFragment;
    pagenoteTimestamp: number;
}

export enum ERenderTarget {
    hightlight,
    markup,
}

export type TPagenoteNodes = {
    startOffset: number,
    endOffset: number,
    startIndex:number,
    pagenoteNodes: Node[],
}

export interface TPagenoteStyle extends Partial<CSSStyleDeclaration>{
    color?: string,
    fontWeight?: string,
    fontStyle?: string,
    //文字装饰
    textDecorationColor?: string,
    textDecorationStyle?: string,
    textDecorationThickness?: string,
    textDecorationLine?: string,
    //显示样式
    display?: string,
    backgroundColor?: string,
}

export type TPagenote = {
    pagenoteID: number,
    pagenoteTimestamp: number,
    pagenoteTarget:string,
    pagenotePosition:EPosition,
    showTools:boolean,
    showEditor:boolean,
    showEditorTitle:boolean,
    showEditorTools:boolean,
    renderMarkdown:boolean,
    //pagenoteFragment在页面中的位置，如果pagenoteFragment不存在则为-1
    pagenoteIndex: number,
    pagenoteFragment?: TPagenoteFragment,
    pagenoteStyle?: TPagenoteStyle,
    pagenoteTitle?: string,
    pagenoteContent?: string,
}

export type TMessageToEditor = {
    operation: EOperation,
    value: TPagenote,
}

export type TContentPagenote=({pagenoteIcon?:HTMLElement,contentPagenote:TPagenote} | undefined)
export type TSetContentPagenotes=React.Dispatch<React.SetStateAction<TContentPagenote[]>>

export type TEditorStatus={
    pagenoteID:number,
    title:string,
    titleID:string,
    content:string,
    markupContent:string,
    contentID:string,
    selectStart:number,
    selectEnd:number,
    open:boolean,
    showTitle:boolean,
    showTools:boolean,
    renderMarkdown:boolean,
}
