import { renderToStaticMarkup } from 'react-dom/server';
import { Markdown } from '../lib/react-markdown-editor';


export default function markupRender(markdown: string) {
    return renderToStaticMarkup(<Markdown>{markdown}</Markdown>)
}