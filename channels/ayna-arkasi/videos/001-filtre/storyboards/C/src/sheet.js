const {chromium}=require('playwright');const path=require('path');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:2360,height:1000}});
await p.goto('file://'+path.resolve(__dirname,'sheet.html'));await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(300);
await p.screenshot({path:path.resolve(__dirname,'../storyboard.png'),fullPage:true});await b.close();})();
