import Dexie, { type EntityTable } from 'dexie'
import { TSiteConfig, TPagenote } from '../../pagenoteTypes';

const pagenoteDB = new Dexie("pagenote") as Dexie & {
    sitesConfig: EntityTable<TSiteConfig, 'origin'>,
    pagenote:EntityTable<TPagenote, 'pagenoteID'>,
};

pagenoteDB.version(1).stores({
    sitesConfig: "&origin",
    pagenote:"&pagenoteID, pagenoteTarget"
});

export default pagenoteDB