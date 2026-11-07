const {chromium}=require('playwright');const fs=require('fs');const mode=process.argv[2];
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1100,height:700}});
const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{window.__cap=true});
await p.route('**/three.module.min.js',r=>r.fulfill({body:require('fs').readFileSync(require('path').join(__dirname,'..','node_modules','three','build','three.module.min.js'),'utf8'),contentType:'application/javascript',headers:{'access-control-allow-origin':'*'}}));
await p.setContent('<!doctype html><html><head><meta charset="utf-8"></head><body>'+fs.readFileSync(require('path').join(__dirname,'..','index.html'),'utf8')+'</body></html>');
await p.waitForTimeout(800);await p.evaluate(()=>{window.__cap=true;LANG='en';V.R.render=()=>{};trNode(document.body);renderAll();renderMachines()});
const save=async()=>fs.writeFileSync('capen_'+mode+'.json',JSON.stringify(await p.evaluate(()=>[...TRCAP])));
if(mode==='A'){await p.evaluate(()=>{openOv(manualHTML(true));trNode(document.body);openOv(progManualHTML(false));trNode(document.body);openOv(rackHTML());trNode(document.body);
  openWiring('vendas');trNode(document.body);closeOv();hideTitle();
  S.started=true;openMenu();trNode(document.body);['new','redo','tutor'].forEach(k=>{S.menuConfirm=k;$('#sheet').innerHTML=menuHTML();trNode(document.body)});closeOv();
  showTitle();trNode(document.body);hideTitle();
  ['sala','mesa','cartao','teclado','pedido','tabela','somadora','escaninho','arquivo','parede','maquinas','classificadora','407','514','painel407','estante'].forEach(v=>setView(v));renderAll();renderMachines();
  gameOver();trNode(document.body);closeOv();S.phase='sales';S.slips.forEach(s=>s.status='bandeja');mainAction();trNode(document.body);closeOv();
  calcOn(true);renderMachine();trNode(document.body);calcOn(false);});await save()}
if(mode==='B'){await p.click('[data-ti="tutor"]');await p.click('[data-tu="all"]');await p.evaluate(()=>{AUTO.speed=40;setInterval(()=>{const ov=document.querySelector('#ov:not([hidden])');if(ov)trNode(ov);trNode($('#mstatus'));if(AUTO.wait){trNode($('#narr'));AUTO.wait.res()}},25)});
  await p.waitForFunction(()=>!AUTO.on,null,{timeout:1500000});await p.evaluate(()=>trNode(document.body));await save()}
if(mode==='C'){await p.click('[data-ti="start"]');await p.evaluate(()=>{AUTO.speed=40;setInterval(()=>{const ov=document.querySelector('#ov:not([hidden])');if(ov)trNode(ov);trNode($('#mstatus'));trNode($('#narr'))},40)});
  for(let d=1;d<=3;d++){await p.evaluate(()=>{closeOv();S.paused=false;toggleAuto()});await p.waitForFunction(()=>!AUTO.on,null,{timeout:1500000});
    await p.evaluate(()=>{trNode(document.body);const b=document.querySelector('[data-ov="endday"]');if(b)b.click();renderAll();trNode(document.body);const n=document.querySelector('[data-ov="next"]');if(n)n.click();renderAll();trNode(document.body)});await save();console.log('day',d)}}
console.log(mode,(await p.evaluate(()=>TRCAP.size)),errs);await b.close()})().catch(e=>{console.log('FAIL',e);process.exit(1)});
