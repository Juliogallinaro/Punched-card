// Exporta os modelos 3D do jogo para .glb (Blender: File ▸ Import ▸ glTF 2.0).
// Uso: node tools/export-glb.js   → assets/*.glb
// Unidade: 1 = 1 polegada (como nos manuais da IBM). No Blender, importe e escale 0.0254 para metros, se quiser.
// As peças que o jogo usa (teclas, knob, alimentadores, painéis…) recebem o nome da variável do código,
// para que um modelo editado possa ser religado depois pelo nome.
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');
const R=path.join(__dirname,'..'),OUT=path.join(R,'assets');fs.mkdirSync(OUT,{recursive:true});
const TH=path.join(R,'node_modules','three');
const THREE_URL='https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.min.js';
(async()=>{const b=await chromium.launch();const p=await b.newPage();
  p.on('pageerror',e=>console.log('pageerror',e.message));
  await p.route('**/three.module.min.js',r=>r.fulfill({body:fs.readFileSync(path.join(TH,'build/three.module.min.js'),'utf8'),contentType:'application/javascript',headers:{'access-control-allow-origin':'*'}}));
  await p.route('https://exporter.local/GLTFExporter.js',r=>r.fulfill({body:fs.readFileSync(path.join(TH,'examples/jsm/exporters/GLTFExporter.js'),'utf8').replace("from 'three'",`from '${THREE_URL}'`),contentType:'application/javascript',headers:{'access-control-allow-origin':'*'}}));
  await p.route('**/fonts.googleapis.com/**',r=>r.fulfill({body:'',contentType:'text/css'}));
  await p.setContent('<!doctype html><html><head><meta charset="utf-8"></head><body>'+fs.readFileSync(path.join(R,'index.html'),'utf8')+'</body></html>');
  await p.waitForFunction(()=>typeof V!=='undefined'&&V.R&&V.m&&V.m.srt,null,{timeout:30000});
  await p.evaluate(()=>{hideTitle&&hideTitle();try{renderAll()}catch(e){}});
  await p.waitForTimeout(800);
  const files=await p.evaluate(async()=>{
    const {GLTFExporter}=await import('https://exporter.local/GLTFExporter.js');
    // nomes a partir das variáveis do código
    const isO=o=>o&&o.isObject3D,nm=(o,n)=>{if(isO(o)&&!o.name)o.name=n};
    const walk=(obj,pre,d)=>{if(!obj||d>2)return;for(const [k,v] of Object.entries(obj)){if(k==='click'||k==='scene'||k==='cam')continue;if(isO(v))nm(v,pre+k);else if(v&&typeof v==='object'&&!Array.isArray(v)&&!v.isTexture&&!v.isMaterial&&d<2)walk(v,pre+k+'_',d+1);else if(Array.isArray(v))v.forEach((x,i)=>nm(x,pre+k+'_'+i))}};
    walk(V.m,'',1);walk(V,'',1);
    Object.entries(V.panels||{}).forEach(([k,P])=>nm(P.mesh,'painel_'+k));
    (V.click||[]).forEach((o,i)=>nm(o,(o.material&&o.material.visible===false?'area_clique_':'clicavel_')+i));
    const groups={'083-classificadora':V.m.srt,'514-reprodutora':V.m.p514,'407-contabilizadora':V.m.t4,'summa-15':V.calcG,'sala-completa':V.scene};
    // áreas de clique invisíveis ficam fora do arquivo (no Blender apareceriam como blocos brancos)
    const hid=[];(V.click||[]).forEach(o=>{if(o.material&&o.material.visible===false&&o.parent){hid.push([o,o.parent]);o.parent.remove(o)}});
    const out={};const ex=new GLTFExporter();
    for(const [k,g] of Object.entries(groups)){if(!g)continue;
      // conta peças sem nome e numera
      let i=0;g.traverse(o=>{if(o.isMesh&&!o.name)o.name=k+'_peca_'+(i++)});
      const save={pos:g.position.clone(),rot:g.rotation.clone()};
      if(g!==V.scene){g.position.set(0,0,0);g.rotation.set(0,0,0);g.updateMatrixWorld(true)}
      const buf=await ex.parseAsync(g,{binary:true,onlyVisible:false,maxTextureSize:2048});
      if(g!==V.scene){g.position.copy(save.pos);g.rotation.copy(save.rot);g.updateMatrixWorld(true)}
      out[k]=btoa(Array.from(new Uint8Array(buf),c=>String.fromCharCode(c)).join(''))}
    hid.forEach(([o,par])=>par.add(o));
    return out});
  for(const [k,v] of Object.entries(files)){const f=path.join(OUT,k+'.glb');fs.writeFileSync(f,Buffer.from(v,'base64'));console.log(k+'.glb',(fs.statSync(f).size/1024).toFixed(0)+' KB')}
  await b.close()})().catch(e=>{console.log('FAIL',e.message);process.exit(1)});
