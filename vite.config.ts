import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { crx, defineManifest } from '@crxjs/vite-plugin'
import path from 'path'

const manifest = defineManifest({
  "manifest_version": 3,
  "name": "pagenote",
  "version": "1.0.0",
  "description": "record your idea&opinion",
  "permissions": [
    "sidePanel",
    "tabs",
    "runtime",
  ],
  "action": {
    "default_popup": "index.html",
    "default_title": "Record your idea&opinion"
  },
  "content_scripts": [{
    "js": [
      "src/Content/index.tsx"
    ],
    "matches": [
      "<all_urls>"
    ]
  }],
  "options_page": "options.html",
  "side_panel": {
    "default_path": "sidepanel.html"
  },
  "background": {
    "service_worker": "src/Background/background.ts"
  },
   "content_security_policy": {
    "extension_pages": "script-src 'self' 'wasm-unsafe-eval'; object-src 'self';"
  },
})

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    crx({ manifest }),
  ],
  build: {
    target: ['edge90', 'chrome90', 'firefox90', 'safari15'],
    rollupOptions: {
      input: {
        Home: path.resolve(__dirname, 'home.html'),
      },
    },
  },
  server: { port: 3000, hmr: { port: 3000 } }
})


