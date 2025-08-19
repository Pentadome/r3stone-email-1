//@ts-check

import fs from 'node:fs'
import path from 'node:path'
import mjml2html from 'mjml'
import htmlminifier from 'html-minifier'

// https://github.com/actions/upload-pages-artifact#:~:text=true-,_site,-/
const outputDir = path.join(import.meta.dirname,'_site')
fs.mkdirSync(outputDir, {recursive: true})
const images = path.join(import.meta.dirname, 'images')
fs.cpSync(images, path.join(outputDir, 'images'), {recursive: true, force: true})

const sourceCode = fs.readFileSync('index.mjml', {encoding: 'utf-8'})
const result = mjml2html(sourceCode, {})
const minified =  htmlminifier.minify(result.html);

fs.writeFileSync(path.join(outputDir, 'index.html'), minified, { encoding: 'utf-8'})