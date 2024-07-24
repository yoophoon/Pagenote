import { EShortcut, TShortcut } from "../pagenoteTypes";

export const pagenoteShortcuts: TShortcut[] = [
  {
    on: true,
    leadingKey: 'Alt',
    key: '1',
    title:'home',
    description: 'goto pagenote list page',
    type: EShortcut.list,
  }, {
    on: true,
    leadingKey: 'Alt',
    key: '2',
    title:'options',
    description: 'goto pagenote options page',
    type: EShortcut.options,
  }, {
    on: true,
    leadingKey: 'Alt',
    key: '3',
    title:'S',
    description: 'show notes in current page',
    type: EShortcut.pagenotesInpage,
  }, {
    on: true,
    leadingKey: 'Alt',
    key: '4',
    description: 'toggle pagenote highlight style',
    type: EShortcut.toggleHightlightStyle,
  }, {
    on: true,
    leadingKey: 'Alt',
    key: '5',
    description: 'toggle sidepanel in current window',
    type: EShortcut.toggleSidepanel,
  }]