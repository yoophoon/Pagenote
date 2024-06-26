import { common, createStarryNight } from '@wooorm/starry-night'
import { toHtml } from 'hast-util-to-html'
import { EOperation, ERenderTarget, TPagenote } from '../pagenoteTypes'
import { nodesInline } from './lib'
import pagenoteDB from './storeage/pagenoteDB'
import markupRender, { getStaticMarkUp } from './MarkdownRender'
// import markupRender from './MarkdownRender'


//background
//  1.无法使用window对象

//这个是设置后持续生效的
// chrome.sidePanel
//     .setPanelBehavior({ openPanelOnActionClick: false })
//     .catch((error) => console.error(error));

// chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
//     if (!tab.url) return;
//     const url = new URL(tab.url);
//     // Enables the side panel on google.com
//     if (true) {
//         await chrome.sidePanel.setOptions({
//             tabId,
//             path: 'sidepanel.html',
//             enabled: true
//         });
//     } else {
//         // Disables the side panel on all other sites
//         await chrome.sidePanel.setOptions({
//             tabId,
//             enabled: false
//         });
//     }


// });

// chrome.runtime.onMessage.addListener(async function (message, sender, sendResponse) {
//     let { showSidepanel } = message
//     if (showSidepanel) {
//         chrome.sidePanel.setOptions({
//             // tabId,
//             path: '/Sidepanel',
//             enabled: true
//         });
//     }
// })

// const bg = chrome.extension.getBackgroundPage();'bg',bg,
// const views=chrome.extension.getViews();
// console.log('views',views)


pagenoteDB.open().catch(function (e) {
    console.error("Open siteConfigDB failed: " + e.stack);
})


const pnChannel=new BroadcastChannel('pagenoteChannel')
pnChannel.onmessage=e=>{
    console.log(e)
}

const extensionURL = chrome.runtime.getURL('')


chrome.runtime.onMessage.addListener(async function (message, sender, sendResponse) {
    const { operation } = message
    await setupOffscreenDocument('offScreenHTML.html',()=>{
            
    })
    
    if (operation == EOperation.openNotesInSidepanel) {
        //background无法使用window对象，这里通过message获取其他区域脚本传过来的origin
        //方便作为sidepanel的地址
        // let SidepanelPath = extensionURL + 'sidepanel.html'
        // chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
        //     console.log(tab)
        //     if (tab.id && sender) {
        //         //sidePanel.open有bug，链接给了一些解决方案
        //         //https://stackoverflow.com/questions/77213045/error-sidepanel-open-may-only-be-called-in-response-to-a-user-gesture-re
        //         chrome.sidePanel.open({ tabId: tab.id });
        //         SidepanelPath += '?currentTabURL=' + tab.url
        //         chrome.sidePanel.setOptions({ path: SidepanelPath, enabled: true });
        //         sendResponse({})
        //     }
        // })
    } else if (operation == EOperation.openEditor) {

    } else if (operation == EOperation.render) {
        console.log(message)
        console.log(message.value && message.value.target == ERenderTarget.hightlight && message.value.content != '')
        if (message.value && message.value.target == ERenderTarget.hightlight && message.value.content != '') {
            createStarryNight(common).then(starryNight => {
                const renderedContentHTML = toHtml(nodesInline(starryNight.highlight(message.value.content, 'text.md')))
                sendResponse({ renderedContent: renderedContentHTML })
            })
            return true
        }else if(message.value&&message.value.target==ERenderTarget.markup&&message.value.content!=''){
            console.log(message)
            // console.log(getStaticMarkUp(message.value.content))
            //console.log(markupRender(message.value.content))
            //.then(result=>{
            //     console.log('markup',result)
            //     sendResponse({ renderedContent: result })
            // })
            // return true
        }
        // console.log(renderedNode)
    }  else if(operation=='imgfile'){
        console.log(message)
        await chrome.offscreen.createDocument({
            url:`offScreenHTML.html`,
            reasons:[chrome.offscreen.Reason.BLOBS],
            justification:"generate objectURL"
        })
        
        chrome.runtime.sendMessage({
            operation: 'generateObjectURL',
            fileURL: message.fileURL,
        },response=>{
            console.log(response)
            sendResponse(response)
        })
        return true
    } 


    // if (message.type === 'open_side_panel' && activeTab.id) {
    //     // This will open a tab-specific side panel only on the current tab.
    //     await chrome.sidePanel.open({ tabId: activeTab.id });

    // }

})


chrome.runtime.onMessage.addListener(function (message,sender,sendResponse){
    const { operation } = message
    if (operation == EOperation.savePagenote) {
        const contentPagenote:TPagenote=message.value
        console.log('store pagenote',message)
        pagenoteDB.transaction('rw', pagenoteDB.pagenote, ()=>{
            pagenoteDB.pagenote.put(contentPagenote,contentPagenote.pagenoteID)
        }).catch(function (e) {
            console.error(e);
        })
    }  else if(operation==EOperation.deletePagenote){
        pagenoteDB.pagenote.delete(message.value.pagenoteID)
    } else if (operation == EOperation.getPagenotes) {
        console.log(message.value.origin)
        pagenoteDB.pagenote
        //get获取第一个匹配的值
        //.get({'pagenoteTarget':message.value.origin})
        
        .where({'pagenoteTarget':message.value.origin})
        //where语句本质也是filter，上面where语句和下面的filter语句等价
        // filter(pagenote=>{
        //     return pagenote.pagenoteTarget==message.value.origin
        // })
        .toArray().then(res=>{
            console.log('message...',message,'pagenote...',res)
            sendResponse(res)
        })
        return true
    }
})

/**
 * 保存和获取网页设置 如主题、侧栏位置、笔记显示的设置
 */
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    const { operation } = message
    if(operation==EOperation.siteConfig){
        console.log(message)
        pagenoteDB.transaction('rw', pagenoteDB.sitesConfig, ()=>{
            pagenoteDB.sitesConfig.put(message.value,message.value.origin)
        }).catch(function (e) {
            console.error(e);
        })
    } else if(operation==EOperation.getSiteConfig){
            pagenoteDB.sitesConfig.get(message.value.origin).then(res=>{
                console.log('message...',message,'siteConfig...',res)
                sendResponse(res)
            })
            
           
            // .then(res=>{
            //     console.log(message,res)
            //     // sendResponse(JSON.stringify(res))
            //     sendResponse({siteConfig:'fuck u'})
            // })
            // sendResponse({siteConfig:'fuck u'})
            return true
    }
})


let creating:Promise<void>|null; // A global promise to avoid concurrency issues
async function setupOffscreenDocument(path: string,callBack:()=>void) {
    // Check all windows controlled by the service worker to see if one
    // of them is the offscreen document with the given path
    const offscreenUrl = chrome.runtime.getURL(path);
    const existingContexts = await chrome.runtime.getContexts({
        contextTypes: [chrome.runtime.ContextType.OFFSCREEN_DOCUMENT],
        documentUrls: [offscreenUrl]
    });

    if (existingContexts.length > 0) {
        callBack()
        return;
    }

    // create offscreen document
    if (creating) {
        await creating;
        callBack()
    } else {
        creating = chrome.offscreen.createDocument({
            url: path,
            reasons: [chrome.offscreen.Reason.BLOBS],
            justification: 'generate object URL',
        });
        await creating;
        callBack()
        creating = null;
    }
}



chrome.runtime.onConnect.addListener(function (port) {
    port.onMessage.addListener(function (message) {
        if (message.operation === EOperation.render) {
            createStarryNight(common).then(starryNight => {
                const renderedContentHTML = toHtml(nodesInline(starryNight.highlight(message.value.content, 'text.md')))
                port.postMessage({
                    content: message.value.content,
                    renderedContent: renderedContentHTML,
                });
                console.log({
                    content: message.value.content,
                    renderedContent: renderedContentHTML,
                })
            })
        }
    });
})


// import Dexie, { type EntityTable } from 'dexie'

// interface user {
//     id:number;
//     name:string;
//     username:string;
//     email:string[],
//     address:{
//         city:string,
//         country:string,
//     }
    
// }

// var db = new Dexie("FriendsAndPetsDatabase") as Dexie & {
//     users:EntityTable<
//     user,
//     'id'
//     >
// };
// db.version(1).stores({
//     users: "++id, name, &username, *email, address.city",
//     relations: "++, userId1, userId2, [userId1+userId2], relation",
// });
// db.open().catch(function (e) {
//     console.error("Open failed: " + e.stack);
// })
// db.transaction('rw', db.users, function () {
//     db.users.add({
//             name: "Zlatan",
//             username: "ibra",
//             email: ["zlatan@ibrahimovic.se", "zlatan.ibrahimovic@gmail.com"],
//             address: {
//                 city: "Malmö",
//                 country: "Sweden"
//             }
//         });
//     db.users.where("email")
//         .startsWith("zlatan")
//         .or("address.city")
//         .anyOf(["Malmö", "Stockholm", "Barcelona"])
//         .each(function (user) {
//             console.log("Found user: " + user.name);
//         });
// }).catch(function (e) {
//     console.error(e);
// })


