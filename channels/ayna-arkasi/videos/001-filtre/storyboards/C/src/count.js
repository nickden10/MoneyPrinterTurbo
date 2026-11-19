const {chromium}=require('playwright');const path=require('path');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920}});
await p.goto('file://'+path.resolve('f2.html'));await p.waitForTimeout(300);console.log('points:',await p.evaluate(()=>document.body.dataset.count));await b.close()})();
