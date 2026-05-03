import { readFileSync, writeFileSync, mkdirSync } from 'fs';
const htmlPath = 'src/pages/index.html';
let html = readFileSync(htmlPath, 'utf8');
const re = /<style[^>]*>([\s\S]*?)<\/style>/gi;
let i = 0;
let css = '/* Extracted from index.html <style> blocks */\n';
const newHtml = html.replace(re, (_, body) => {
  i++;
  css += `\n/* ===== block ${i} ===== */\n` + body.replace(/^\t+/gm, '').trim() + '\n';
  return '';
});
if (i === 0) throw new Error('No style blocks found');
mkdirSync('src/css', { recursive: true });
writeFileSync('src/css/dop.css', css, 'utf8');
const link = '\t\t<link rel="stylesheet" href="css/dop.css" />\n';
const anchor = '<link rel="stylesheet" href="files/page-dump/css/default(3).css" type="text/css" />';
if (!newHtml.includes(anchor)) throw new Error('Anchor not found: default(3).css');
writeFileSync(htmlPath, newHtml.replace(anchor, anchor + '\n' + link), 'utf8');
console.log('Extracted', i, 'blocks; dop.css bytes', Buffer.byteLength(css));
