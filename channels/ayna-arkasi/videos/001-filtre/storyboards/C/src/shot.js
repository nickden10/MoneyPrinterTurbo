// Kullanım: node shot.js giriş.html çıkış.png [genişlik yükseklik]
const {chromium}=require('playwright');const path=require('path');
(async()=>{const [,,inp,out,w,h]=process.argv;const b=await chromium.launch();
 const p=await b.newPage({viewport:{width:+(w||1080),height:+(h||1920)}});
 await p.goto('file://'+path.resolve(inp));await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(400);
 await p.screenshot({path:out});await b.close();})();
