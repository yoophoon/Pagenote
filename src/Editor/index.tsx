import EditorInPage from "./EditorInPage";
import EditorFollowPagenoteFragment from "./EditorFollowPagenoteFragment";
import EditorAfterPagenoteFragment from "./EditorAfterPagenoteFragment";

import { EPosition, IEditorProps, TOpenEditor, TPagenoteFragment } from "../pagenoteTypes";
import { createContext, useState, useEffect } from "react";

//const starryNight = await createStarryNight(common)


export const EditorContext = createContext({
    openEditor: { open: false, position: EPosition.inPage, initTitle: '', initContent: '' },
    //@ts-ignore
    setOpenEditor: (openEditor: TOpenEditor) => { },
    pagenoteID: -1,
    pagenoteFragment: { textStart: '' },
})

export default function Editor(props: IEditorProps): JSX.Element {
    const [openEditor, setOpenEditor] = useState({
        open: props.openEditor.open,
        position: props.openEditor.position,
        initTitle: props.openEditor.initTitle,
        initContent: props.openEditor.initContent,
    })

    useEffect(() => {
        if (props.openEditor.open != openEditor.open && openEditor.open == false)
            setOpenEditor({
                ...openEditor,
                open: props.openEditor.open
            })
    }, [props.pagenoteTimestamp])

    const pagenoteID: number = props.pagenoteID
    const pagenoteFragment: TPagenoteFragment = props.pagenoteFragment

    let targetEditor
    if (openEditor.position == EPosition.inPage) {
        console.log('open editor inPageee')
        console.log(props)
        console.log('incomponent', openEditor)
        targetEditor = (<EditorContext.Provider value={{
            openEditor,
            setOpenEditor,
            pagenoteID,
            pagenoteFragment,
        }}>
            <EditorInPage></EditorInPage>
        </EditorContext.Provider >)
    } else if (openEditor.position == EPosition.followPagenoteFragment) {
        console.log('open editor followPagenoteFragment')
        targetEditor = (<EditorContext.Provider value={{
            openEditor,
            setOpenEditor,
            pagenoteID,
            pagenoteFragment,
        }}>
            <EditorFollowPagenoteFragment ></EditorFollowPagenoteFragment>
        </EditorContext.Provider >)
    } else {
        console.log('open editor afterPagenoteFragment')
        targetEditor = (<EditorContext.Provider value={{
            openEditor,
            setOpenEditor,
            pagenoteID,
            pagenoteFragment,
        }}>
            <EditorAfterPagenoteFragment></EditorAfterPagenoteFragment>
        </EditorContext.Provider >)
    }
    return targetEditor
}

