import ReactDOM from 'react-dom/client'

// Copyright 2023 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// Once the message has been posted from the service worker, checks are made to
// confirm the message type and target before proceeding. This is so that the
// module can easily be adapted into existing workflows where secondary uses for
// the document (or alternate offscreen documents) might be implemented.

// Registering this listener when the script is first executed ensures that the
// offscreen document will be able to receive messages when the promise returned
// by `offscreen.createDocument()` resolves.
chrome.runtime.onMessage.addListener((message,sender,response)=>{
    console.log(message)
    if(message.operation=='generateObjectURL'){
        console.log(message.fileURL)
    }
    getIMGData(message.fileURL,response)
    return true
});


function getIMGData(url: string,response:(response:any)=>void) {
    fetch(url).then(async res => {
        const chunks = []
        const reader = res.body?.getReader()
        if (!reader) return
        while (true) {
            const { done, value } = await reader.read();
            if (done) {
                break
            } else {
                chunks.push(value)
            }
        }
        const result = new Uint8Array(chunks.reduce((a, c) => a + c.length, 0));
        let offset = 0;
        for (const chunk of chunks) {
            result.set(chunk, offset);
            offset += chunk.length;
        }
        const url = URL.createObjectURL(new Blob([result.buffer], { type: "image/*" }))
        console.log(url)
        console.log(result)
        response({response123:url})
        return url
    })
}

// function getIMGBase64(url: string,response:(response:any)=>void) {
//     fetch(url).then(async res => {
//         const chunks = []
//         const reader = res.body?.getReader()
//         if (!reader) return
//         while (true) {
//             const { done, value } = await reader.read();
//             if (done) {
//                 break
//             } else {
//                 chunks.push(value)
//             }
//         }
//         const result = new Uint8Array(chunks.reduce((a, c) => a + c.length, 0));
//         let offset = 0;
//         for (const chunk of chunks) {
//             result.set(chunk, offset);
//             offset += chunk.length;
//         }
//         const base64Reader=new FileReader()
//         base64Reader.addEventListener(
//             "load",
//             () => { // 将图像文件转换为 Base64 字符串 
//                 const imgBase64 = base64Reader.result;
//                 console.log(imgBase64)
//                 console.log(result)
//                 response({response:imgBase64})
//             },
//             false,
//         )
//         base64Reader.readAsDataURL(new Blob([result.buffer], { type: "image/*" }))
//     })
// }

const rootEle=document.createElement('div')
document.body.appendChild(rootEle)

console.log('fuck u')

ReactDOM.createRoot(rootEle).render(
    <>
    <h1>fuck u</h1>
    <img src="#" alt="tupian" />
    </>
)