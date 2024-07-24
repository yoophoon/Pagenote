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
    //因为sidepanel的主题需要和扩展在网页的主题保持立即响应，
    //该操作在每次修改siteConfig.siteTheme之后执行
    siteConfigTheme,
    getSiteConfig,
    //定位到目标页面的pagenote
    scrollIntoView,
    //如果页面内容发生改变导致pagenoteFragment匹配不上页面内容
    missAnchor,
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

export enum EPagenoteOrder{
    creation,
    modification,
    position,
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
    fragment:TPagenoteFragment,
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

export enum EHighlightStyle{
    bg,
    underLine,
}


export type TSiteConfig={
    origin:string,
    title:string,
    siteTheme:ESiteTheme,
    showPagenote:boolean,
    showPositionBar:boolean,
    onThisSite:boolean,
    showEditorTitle:boolean,
    showEditorTools:boolean,
    shortcutsOn:boolean,
    shortcuts:TShortcut[],
    highLightStyle:EHighlightStyle,
    openSidepanel:boolean,
}

export type TSetSiteConfig=React.Dispatch<React.SetStateAction<TSiteConfig>>

export enum ESection{
    extension,
    page,
    sidepanel,
    markdown,
    backup,
}

export enum EShortcut {
    //是否启用sidepanel boolean
    toggleSidepanel,
    //页面跳转 boolean
    //TODO home 仅做展示用，是否需要为其添加快捷键跳转
    // home,    
    list,
    options,
    //是否将当前网页的笔记展示在页面内 boolean
    pagenotesInpage,
    //hightlight高亮设置 enum
    toggleHightlightStyle,

}

export type TShortcut={
    on:boolean,
    leadingKey:'Shift'|'Alt'|'Ctrl',
    key:string,
    type:EShortcut,
    title?:string,
    description:string,
}

export type TExtensionConfig={
    extensionTheme:ESiteTheme,
    shortcutsOn:boolean,
    shortcuts:TShortcut[],
}