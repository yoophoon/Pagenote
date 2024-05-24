import { Root } from 'hast'
import { Grammar } from '@wooorm/starry-night'

export type TPagenoteFragment = {
    prefix?: string,
    textStart: string,
    textEnd?: string,
    suffix?: string
}

export enum EOperation {
    openEditor,
    openNotesInSidepanel,
    saveContent,
    render,
}

export enum EPosition {
    inPage,
    followPagenoteFragment,
    afterPagenoteFragment
}

export type TMessageToEditor = {
    operation: EOperation,
    value: {
        editorPosition: EPosition,
        pagenoteID: number,
        pagenoteTitle: string,
        pagenoteContent: string,
        pagenoteTimestamp: number,
        pagenoteFragment: TPagenoteFragment
    }
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
    pagenoteNodes: Node[],
}