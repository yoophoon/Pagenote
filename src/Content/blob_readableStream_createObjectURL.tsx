fetch('blob:https://dexie.org/3265fec4-3bd7-4137-9dfa-0aa4f1b46b82').then(async res=>{
    const chunks=[]
    const reader=res.body?.getReader()
    if(!reader) return
    while(true){
        const {done, value}= await reader.read();
        if(done){
            break
        }else{
            chunks.push(value)
        }
    }
    const result = new Uint8Array(chunks.reduce((a, c) => a + c.length, 0)); 
    let offset = 0; 
    for (const chunk of chunks) { 
        result.set(chunk, offset); 
        offset += chunk.length; 
    }
    const url=URL.createObjectURL(new Blob([result.buffer],{type:"image/*"}))
    console.log(url)
    console.log(result)
    return result
})