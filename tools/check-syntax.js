// Extrai o script principal de index.html e confere a sintaxe com o Node.
const fs=require('fs'),path=require('path'),{execFileSync}=require('child_process'),os=require('os');
const h=fs.readFileSync(path.join(__dirname,'..','index.html'),'utf8');
const s=h.split('<script>\n')[1].split('</script>')[0];
const f=path.join(os.tmpdir(),'punched-card-check.js');fs.writeFileSync(f,s);
execFileSync(process.execPath,['--check',f],{stdio:'inherit'});console.log('sintaxe OK');
