import {  renderToString } from 'react-dom/server';
import { Markdown } from '../lib/react-markdown-editor';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import remarkToc from 'remark-toc';


export default function MarkupRender({markdown}:{markdown:string}) {
    const rehypePlugins = [rehypeRaw, rehypeSlug, rehypeHighlight]
    const remarkPlugins = [remarkGfm, remarkToc]
    return (
        <Markdown
            remarkPlugins={remarkPlugins}
            rehypePlugins={rehypePlugins}
        >{markdown}</Markdown>)
}

export function getStaticMarkUp(markdown:string){
    const rehypePlugins = [rehypeRaw, rehypeSlug, rehypeHighlight]
    const remarkPlugins = [remarkGfm, remarkToc]
    return renderToString(<Markdown remarkPlugins={remarkPlugins}
        rehypePlugins={rehypePlugins}>{markdown}</Markdown>)
}