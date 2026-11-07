"""Monta o dicionário EN a partir de i18n/*.txt e embute em index.html.
Uso: python3 tools/build_en.py"""
import json,re,os
D=os.path.join(os.path.dirname(__file__),'..');I=os.path.join(D,'i18n')
ks=json.load(open(os.path.join(I,'keys_all.json')))
en={}
for f in sorted(x for x in os.listdir(I) if x.startswith('en_') and x.endswith('.txt')):
  for line in open(os.path.join(I,f),encoding='utf8'):
    line=line.rstrip('\n')
    if not line.strip():continue
    i,t=line.split('\t',1)
    k=ks[int(i)] if i.isdigit() else json.loads(i)
    lead=k[:len(k)-len(k.lstrip())];trail=k[len(k.rstrip()):]
    t=lead+t.strip()+trail
    if sorted(re.findall(r'\{\d+\}',k))!=sorted(re.findall(r'\{\d+\}',t)):print('placeholders diferentes:',k[:60])
    en[k]=t
p=os.path.join(D,'index.html');h=open(p,encoding='utf8').read()
h=re.sub(r'const EN=\{.*?\};const TRCAP',lambda m:'const EN='+json.dumps(en,ensure_ascii=False)+';const TRCAP',h,count=1,flags=re.S)
open(p,'w',encoding='utf8').write(h);print(len(en),'traduções')
