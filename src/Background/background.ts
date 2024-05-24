import { common, createStarryNight } from '@wooorm/starry-night'
import { toHtml } from 'hast-util-to-html'
import { EOperation, ERenderTarget } from '../pagenoteTypes'
import { nodesInline } from './lib'
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

const extensionURL = chrome.runtime.getURL('')


chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    const { operation } = message
    if (operation == 'openNotesInSidepanel') {
        //background无法使用window对象，这里通过message获取其他区域脚本传过来的origin
        //方便作为sidepanel的地址
        let SidepanelPath = extensionURL + 'sidepanel.html'
        chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
            console.log(tab)
            if (tab.id && sender) {
                //sidePanel.open有bug，链接给了一些解决方案
                //https://stackoverflow.com/questions/77213045/error-sidepanel-open-may-only-be-called-in-response-to-a-user-gesture-re
                chrome.sidePanel.open({ tabId: tab.id });
                SidepanelPath += '?currentTabURL=' + tab.url
                chrome.sidePanel.setOptions({ path: SidepanelPath, enabled: true });
                sendResponse({})
            }
        })
    } else if (operation == 'openEditor') {

    } else if (operation == 'render') {
        console.log(message)
        console.log(message.value && message.value.target == ERenderTarget.hightlight && message.value.content != '')
        if (message.value && message.value.target == ERenderTarget.hightlight && message.value.content != '') {
            createStarryNight(common).then(starryNight => {
                const renderedContentHTML = toHtml(nodesInline(starryNight.highlight(message.value.content, 'text.md')))
                sendResponse({ renderedContent: renderedContentHTML })
            })
            return true

        }
        // console.log(renderedNode)
    } else if (operation == 'saveContent') {
        console.log(message)
    }


    // if (message.type === 'open_side_panel' && activeTab.id) {
    //     // This will open a tab-specific side panel only on the current tab.
    //     await chrome.sidePanel.open({ tabId: activeTab.id });

    // }

})

chrome.runtime.onConnect.addListener(function (port) {
    port.onMessage.addListener(function (message) {
        if (message.operation === EOperation.render) {
            createStarryNight(common).then(starryNight => {
                const renderedContentHTML = toHtml(nodesInline(starryNight.highlight(message.value.content, 'text.md')))
                port.postMessage({
                    content:message.value.content,
                    renderedContent: renderedContentHTML,
                });
            })
        }
    });
})
