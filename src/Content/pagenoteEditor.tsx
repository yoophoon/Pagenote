// import { styled } from '@mui/system'
// import { Markdown } from '../lib/react-markdown-editor'
// import remarkGfm from 'remark-gfm'
// import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism'
// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'



// const markdown = `Just a link: www.nasa.gov.`



// export default function PagenoteEditor() {

//     return (<Markdown
//         children={markdown}
//         components={{
//             code(props: any) {
//                 const { children, className, node, ...rest } = props
//                 const match = /language-(\w+)/.exec(className || '')
//                 return match ? (
//                     <SyntaxHighlighter
//                         {...rest}
//                         PreTag="div"
//                         children={String(children).replace(/\n$/, '')}
//                         language={match[1]}
//                         style={dark}
//                     />
//                 ) : (
//                     <code {...rest} className={className}>
//                         {children}
//                     </code>
//                 )
//             }
//         }}
//     />)



// };
