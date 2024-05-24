import { CardActions } from "@mui/material";
import { GotoHomepage } from "./GotoHomepage";
import { ShowSiteNotes } from "./ShowSiteNotes";
import { AddNewNote } from "./AddNewNote";
import { GotoSettingpage } from "./GotoSettingpage";
import { GotoFavor } from "./GotoFavorpage";
import { ShareApp } from "./ShareApp";



export default function Bottom() {
    return (<CardActions disableSpacing>
        <GotoHomepage />
        <ShowSiteNotes />
        <AddNewNote />
        <GotoSettingpage />
        <GotoFavor />
        <ShareApp />
    </CardActions>)
}