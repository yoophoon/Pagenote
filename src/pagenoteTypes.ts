// import { Root } from 'hast'
// import { Grammar } from '@wooorm/starry-night'

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
    deletePagenote,
    getPagenotes,
    render,
    sidePanel,
    siteConfig,
    getSiteConfig,
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
// interface starryNight {
//     flagToScope: (flag: string) => string | undefined;
//     highlight: (value: string, scope: string) => Root;
//     missingScopes: () => ReadonlyArray<string>;
//     register: (grammars: ReadonlyArray<Readonly<Grammar>>) => Promise<undefined>;
//     scopes: () => ReadonlyArray<string>;
// }

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
    //记录pagenoe的网址
    pagenoteTarget:string,
    //editor该显示的位置
    editorPosition:EPosition,
    showTools:boolean,
    showEditor:boolean,
    showEditorTitle:boolean,
    showEditorTools:boolean,
    renderMarkdown:boolean,
    //pagenoteFragment在页面中的位置，如果pagenoteFragment不存在则为-1
    pagenoteIndex: number,
    pagenoteFragment?: TPagenoteFragment,
    pagenoteStyle?: TPagenoteStyle,
    pagenoteTitle: string,
    pagenoteContent: string,
    //anchorPosition为笔记插入点的绝对位置，为了使pagenote的元素独立于页面元素，需要使用这些数据记录位置信息
    anchorPositionX?:number,
    anchorPositionY?:number,
    editorContentScrollTop:number,
    editorWidth:string,
    editorHeight:string,
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
    //editorPosition为editor在页面的位置
    editorPosition:EPosition,
    //editorPositionX、editorPositionY是editor在页面绝对定位用的
    editorPositionX:number,
    editorPositionY:number,
    editorContentScrollTop:number,
    editorWidth:string,
    editorHeight:string,
}

export enum ESiteTheme{
    dark,
    light,
    systemDefault,
}

export type TSiteConfig={
    origin:string,
    siteTheme:ESiteTheme,
    showPagenote:boolean,
    showPositionBar:boolean,
    onThisSite:boolean,
    showEditorTitle:boolean,
    showEditorTools:boolean,
}

export type TSetSiteConfig=React.Dispatch<React.SetStateAction<TSiteConfig>>

export enum ESection{
    extension,
    page,
    sidepanel,
    markdown,
    backup,
}


export type TExtensionConfig={
    extensionTheme:ESiteTheme,
}