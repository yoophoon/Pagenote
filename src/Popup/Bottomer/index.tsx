import { CardActions } from "@mui/material";
import { GotoHomepage } from "./GotoHomepage";
import { ShowSiteNotes } from "./ShowSiteNotesInSidepanel";
import { AddNewNote } from "./AddNewNote";
import { GotoSettingpage } from "./GotoSettingpage";
import { GotoFavor } from "./GotoFavorpage";
import { ShareApp } from "./ShareApp";
import { ShowAllNotes } from "./ShowAllNotesInNewTab";



export default function Bottom() {
    return (<CardActions disableSpacing>
        <GotoHomepage />
        <ShowAllNotes/>
        <ShowSiteNotes />
        <AddNewNote />
        <GotoSettingpage />
        <GotoFavor />
        <ShareApp />
    </CardActions>)
}