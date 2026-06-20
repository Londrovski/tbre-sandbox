var TBRE=(function(){
  var REPO="Londrovski/tbre-sandbox", DIR="AI", BRANCH="main";
  var NL=String.fromCharCode(10);
  var RAW="https://raw.githubusercontent.com/"+REPO+"/"+BRANCH+"/";
  var SEATS=[], byId={}, selected=null, TEAM='', MODE='recruitment';
  var ctxCache={};

  function childrenOf(id){ return SEATS.filter(function(s){return s.reports_to===id;}); }

  var DCOL={ "Leadership":"var(--d-lead)","Technology – Software":"var(--d-soft)",
    "Technology – Electrical":"var(--d-elec)","Technology – Mechanical":"var(--d-mech)",
    "Operations":"var(--d-ops)","Outside AI (interface)":"var(--d-out)" };
  var DORD={ "Leadership":0,"Technology – Software":1,"Technology – Electrical":2,"Technology – Mechanical":3,"Operations":4,"Outside AI (interface)":5 };
  // Blocks floated below the tree, in render order. A card joins one via its front-matter group:.
  var OUTSIDE=[
    {key:"spare", label:"Outside the AI team"},
    {key:"gdbp",  label:"Project groups"}
  ];
  function isOutsideGroup(g){ for(var i=0;i<OUTSIDE.length;i++){ if(OUTSIDE[i].key===g) return true; } return false; }
  function colorOf(s){ return DCOL[s.domain]||"var(--brand)"; }
  function esc(t){ return (t==null?'':''+t).replace(/[<>&]/g,function(c){return {'<':'&lt;','>':'&gt;','&':'&amp;'}[c];}); }
  function inline(t){ var parts=t.split('`'),r=''; for(var i=0;i<parts.length;i++){ if(i%2===1){ r+='<code>'+parts[i]+'</code>'; } else { var b=parts[i].split('**'),s=''; for(var j=0;j<b.length;j++){ s+=(j%2===1)?'<strong>'+b[j]+'</strong>':b[j]; } r+=s; } } return r; }
  function initials(n){ var p=(n||'').split(' ').filter(Boolean); return ((p[0]||'?').charAt(0)+(p.length>1?p[p.length-1].charAt(0):'')).toUpperCase(); }
  function uniq(a){ var seen={},o=[]; a.forEach(function(x){ if(!seen[x]){ seen[x]=1; o.push(x); } }); return o; }
  function trimSep(s){ var k=0; while(k<s.length && ' —:-'.indexOf(s.charAt(k))>=0) k++; return s.slice(k); }
  function stripComments(s){ var i; while((i=s.indexOf('<!--'))>=0){ var j=s.indexOf('-->',i+4); if(j<0){ s=s.slice(0,i); break; } s=s.slice(0,i)+s.slice(j+3); } return s; }

  function stripFM(md){
    if(md.indexOf('---')===0){ var end=md.indexOf(NL+'---',3); if(end>0){ return md.slice(end+4).trimStart(); } }
    return md;
  }
  function mdCells(s){ var t=s.replace(/^ +/,'').replace(/ +$/,''); if(t.charAt(0)==='|'){ t=t.slice(1); } if(t.charAt(t.length-1)==='|'){ t=t.slice(0,t.length-1); } return t.split('|').map(function(x){ return x.replace(/^ +/,'').replace(/ +$/,''); }); }
  function mdIsTableSep(s){ var seen=false; for(var k=0;k<s.length;k++){ var c=s.charAt(k); if(c==='-'){ seen=true; } else if(c!=='|' && c!==':' && c!==' '){ return false; } } return seen; }
  function mdToHtml(md){
    var lines=md.split(NL), out=[], i=0, para=[], inList=false;
    function fp(){ if(para.length){ out.push('<p class="tov-p">'+inline(esc(para.join(' ')))+'</p>'); para=[]; } }
    function cl(){ if(inList){ out.push('</ul>'); inList=false; } }
    while(i<lines.length){
      var raw=lines[i], line=raw.replace(/ +$/,''), t=line.replace(/^ +/,'');
      if(t.charAt(0)==='|' && (i+1)<lines.length && mdIsTableSep(lines[i+1].replace(/ +$/,'').replace(/^ +/,''))){
        fp(); cl();
        var head=mdCells(t); i+=2; var rows=[];
        while(i<lines.length && lines[i].replace(/^ +/,'').charAt(0)==='|'){ rows.push(mdCells(lines[i])); i++; }
        var th='<tr>'+head.map(function(c){ return '<th>'+inline(esc(c))+'</th>'; }).join('')+'</tr>';
        var tb=rows.map(function(r){ return '<tr>'+r.map(function(c){ return '<td>'+inline(esc(c))+'</td>'; }).join('')+'</tr>'; }).join('');
        out.push('<table class="md-tbl"><thead>'+th+'</thead><tbody>'+tb+'</tbody></table>'); continue;
      }
      if(line===''){ fp(); cl(); i++; continue; }
      if(line.charAt(0)==='#'){ fp(); cl(); var lv=0; while(line.charAt(lv)==='#') lv++; var ht=line.slice(lv).trim();
        out.push(lv<=1 ? '<h2 class="tov-h">'+inline(esc(ht))+'</h2>' : '<div class="sect">'+inline(esc(ht))+'</div>'); i++; continue; }
      if(t.charAt(0)==='>'){ fp(); cl(); var notes=[];
        while(i<lines.length && lines[i].replace(/^ +/,'').charAt(0)==='>'){ notes.push(trimSep(lines[i].replace(/^ +/,'').slice(1))); i++; }
        out.push('<p class="ctx-note">'+inline(esc(notes.join(' ')))+'</p>'); continue; }
      if((t.charAt(0)==='-'||t.charAt(0)==='*') && t.charAt(1)===' '){ fp(); if(!inList){ out.push('<ul class="ilist">'); inList=true; }
        var item=t.slice(2); i++;
        while(i<lines.length){ var nx=lines[i].replace(/ +$/,''), nt=nx.replace(/^ +/,'');
          if(nx===''||nt.charAt(0)==='#'||nt.charAt(0)==='>'||nt.charAt(0)==='|'||((nt.charAt(0)==='-'||nt.charAt(0)==='*')&&nt.charAt(1)===' ')){ break; }
          item+=' '+nt; i++; }
        out.push('<li>'+inline(esc(item))+'</li>'); continue; }
      para.push(t); i++;
    }
    fp(); cl(); return out.join('');
  }
  function showTeam(){ selected=null; document.body.classList.remove('detail-open'); var p=document.getElementById('panel'); p.className='panel';
    p.innerHTML = TEAM ? mdToHtml(TEAM) : '<div class="loading">Add an AI/team.md for the overview.</div>'; render(); }

  function parseResp(lines){
    var res=[], cur=null;
    lines.forEach(function(raw){
      var t=raw.replace(/^ +/,''); var indent=raw.length-t.length;
      if(t.slice(0,2)!=='- ') return;
      var b=t.slice(2);
      if(indent===0){
        var title=b, desc='', a=b.indexOf('**');
        if(a>=0){ var e=b.indexOf('**',a+2); if(e>a){ title=b.slice(a+2,e); desc=trimSep(b.slice(e+2)); } }
        cur={title:title, desc:desc, context:[], owns:[], delivers:[], doc:null};
        res.push(cur);
      } else if(cur){
        var ci=b.indexOf(':');
        if(ci>0){ var key=b.slice(0,ci).trim().toLowerCase(); var val=b.slice(ci+1).trim();
          if(key==='doc'){ cur.doc=val; }
          else if(cur[key] && cur[key].push) cur[key].push(val); }
      }
    });
    return res;
  }

  function parseCard(md){
    var fm={}, body=md;
    if(md.indexOf('---')===0){
      var end=md.indexOf(NL+'---',3);
      if(end>0){
        md.slice(3,end).trim().split(NL).forEach(function(line){
          var i=line.indexOf(':'); if(i<0) return;
          fm[line.slice(0,i).trim()]=(line.slice(i+1).trim()||null);
        });
        body=md.slice(end+4).trimStart();
      }
    }
    var sec={}, cur='_intro'; sec[cur]=[];
    body=stripComments(body);
    body.split(NL).forEach(function(raw){
      var line=raw.replace(/ +$/,'');
      if(line.slice(0,2)==='##'){ cur=line.replace(/^#+/,'').trim().toLowerCase(); sec[cur]=[]; }
      else if(line.charAt(0)==='#'){ /* title */ }
      else sec[cur].push(line);
    });
    function items(name){ return (sec[name]||[]).filter(function(l){return l.slice(0,2)==='- ';}).map(function(l){return l.slice(2);}); }
    return {
      id:fm.id, seat:fm.seat||fm.id, domain:fm.domain||'', owner:fm.owner||'TBD', tag:fm.tag||null, course:fm.course||null, photo:fm.photo||null,
      reports_to:fm.reports_to||null, hrs:fm.hrs||'?', group:fm.group||null, order:(fm.order!=null?parseInt(fm.order,10):null),
      purpose:(sec['_intro']||[]).join(' ').trim(),
      resp:parseResp(sec['responsibilities']||[]),
      interfaces:items('key interfaces'),
      requirements:items('requirements')
    };
  }

  function block(s){
    var open=!s.owner||s.owner==='TBD';
    var cls='blk'+(open?' open':'')+(selected===s.id?' sel':'');
    return '<div class="'+cls+'" data-id="'+esc(s.id)+'" style="--c:'+colorOf(s)+'">'
      +'<div class="nm">'+esc(s.seat)+'</div>'
      +'<div class="mt"><span class="odot '+(open?'open':'filled')+'"></span>'+(open?'Open':esc(s.owner))+' · ~'+esc(s.hrs)+'h</div></div>';
  }
  function leafGrid(kids){
    var rows='';
    for(var i=0;i<kids.length;i+=2){
      var left='<div class="lcell left">'+block(kids[i])+'</div>';
      var right=(i+1<kids.length)?'<div class="lcell right">'+block(kids[i+1])+'</div>':'<div></div>';
      rows+='<div class="lrow">'+left+right+'</div>';
    }
    return '<div class="leafwrap"><div class="spine"></div><div class="leafrows">'+rows+'</div></div>';
  }
  function sortKids(id){ return childrenOf(id).sort(function(a,b){ var oa=(a.order==null?99:a.order), ob=(b.order==null?99:b.order); if(oa!==ob) return oa-ob; var da=(DORD[a.domain]==null?9:DORD[a.domain]), db=(DORD[b.domain]==null?9:DORD[b.domain]); return da-db || a.seat.localeCompare(b.seat); }); }
  function treeNode(id){
    var kids=sortKids(id);
    var h='<li>'+block(byId[id]);
    if(kids.length){
      var deep=kids.some(function(k){return childrenOf(k.id).length>0;});
      if(deep){ h+='<ul>'+kids.map(function(k){return treeNode(k.id);}).join('')+'</ul>'; }
      else { h+=leafGrid(kids); }
    }
    return h+'</li>';
  }
  function ulist(arr){ return arr.length? '<ul class="ilist">'+arr.map(function(x){return '<li>'+inline(esc(x))+'</li>';}).join('')+'</ul>' : '<p class="rtbd">TBD</p>'; }
  function grp(cls,label,arr){
    var body = arr.length ? '<ul class="rlist">'+arr.map(function(x){return '<li>'+inline(esc(x))+'</li>';}).join('')+'</ul>'
                          : '<p class="rtbd">TBD</p>';
    return '<div class="rg '+cls+'"><span class="rl">'+label+'</span>'+body+'</div>';
  }

  function header(s){
    var rep=s.reports_to&&byId[s.reports_to]?byId[s.reports_to].seat:'—';
    var open=!s.owner||s.owner==='TBD';
    var who = open ? (MODE==='team' ? '<span style="color:#c0392b;font-weight:600">Open · unfilled</span>' : '<span style="color:#b8860b;font-weight:600">Open · recruiting</span>')
                   : esc(s.owner)+(s.tag?' · <span style="color:var(--muted)">'+esc(s.tag)+'</span>':'');
    var phbg = open ? (MODE==='team'?'#e23b3b':'var(--gold)') : colorOf(s);
    var phfg = (open && MODE!=='team') ? '#3a2c00' : '#fff';
    var photo = s.photo
      ? '<img src="'+esc(s.photo)+'" alt="'+esc(s.owner)+'">'
      : '<div class="ph" style="background:'+phbg+';color:'+phfg+'">'+(open?'?':esc(initials(s.owner)))+'</div>';
    var pur=s.purpose||''; if(pur.length>250){ var cut=pur.slice(0,250); var sp=cut.lastIndexOf(' '); if(sp>200){ cut=cut.slice(0,sp); } pur=cut+'…'; }
    return '<button class="mback js-back">‹ Back to map</button>'
      +'<a class="back js-back" href="#">‹ Team overview</a>'
      +'<div class="phead"><div class="ptext">'
      +'<h2>'+esc(s.seat)+'</h2>'
      +'<div class="pdomain" style="--c:'+colorOf(s)+'">'+esc(s.domain)+'</div>'
      +'<div class="kv"><b>Owner</b><span>'+who+'</span></div>'
      +(s.course?'<div class="kv"><b>Course</b><span>'+esc(s.course)+'</span></div>':'')
      +'<div class="kv"><b>Reports to</b><span>'+esc(rep)+'</span></div>'
      +(MODE==='recruitment'?'<div class="kv"><b>Commitment</b><span>~'+esc(s.hrs)+' hrs/week</span></div>':'')
      +(pur?'<p class="purpose">'+inline(esc(pur))+'</p>':'')
      +'</div><div class="pphoto">'+photo+'</div></div>';
  }

  function docPathOf(s,r){ return r.doc ? (r.doc.indexOf('/')>=0 ? r.doc : s.folder+'/'+r.doc) : null; }
  // Split a self-contained responsibility doc into: summary (intro), Owns, Delivers, and the rest (-> Context box).
  function parseRespDoc(md){
    var lines=stripFM(md).split(NL), desc=[], owns=[], delivers=[], rest=[], cur='_intro';
    lines.forEach(function(raw){
      var line=raw.replace(/ +$/,'');
      if(line.slice(0,2)==='##'){ cur=line.replace(/^#+/,'').trim().toLowerCase(); if(cur!=='owns'&&cur!=='delivers'&&cur!=='background') rest.push(line); return; }
      if(cur==='_intro'){ if(line!==''){ var L=line; if(L.charAt(0)==='>'){ L=trimSep(L.slice(1)); } desc.push(L); } }
      else if(cur==='owns'){ if(line.slice(0,2)==='- ') owns.push(line.slice(2)); }
      else if(cur==='delivers'){ if(line.slice(0,2)==='- ') delivers.push(line.slice(2)); }
      else rest.push(line);
    });
    return { desc:desc.join(' ').trim(), owns:owns, delivers:delivers, rest:rest.join(NL).trim() };
  }
  // Front-matter (title, order) + parsed body for a self-contained responsibility file.
  function parseRespFull(md){
    var fm={};
    if(md.indexOf('---')===0){ var end=md.indexOf(NL+'---',3);
      if(end>0){ md.slice(3,end).trim().split(NL).forEach(function(line){ var i=line.indexOf(':'); if(i<0) return; fm[line.slice(0,i).trim()]=(line.slice(i+1).trim()||null); }); } }
    var b=parseRespDoc(md);
    return { title:fm.title||'(untitled)', order:(fm.order!=null?parseInt(fm.order,10):null), desc:b.desc, owns:b.owns, delivers:b.delivers, rest:b.rest };
  }
  // A responsibility rendered from its own file: title → summary → Owns/Delivers chips → Context (Team view).
  function respDocBlock(s,r){
    var html=(r.desc?'<p class="resp-d">'+inline(esc(r.desc))+'</p>':'')
      +'<div class="resp-body">'+grp('owns','Owns',r.owns)+grp('delivers','Delivers',r.delivers)+'</div>';
    if(MODE==='team' && r.rest){ html+='<details class="ctx ctxdoc"><summary>More info</summary><div class="ctxbody">'+mdToHtml(r.rest)+'</div></details>'; }
    return '<details class="resp" open style="--c:'+colorOf(s)+'"><summary>'+esc(r.title)+'</summary>'+html+'</details>';
  }
  // Fetch a seat's responsibility files, order by their front-matter order, and fill the slot.
  function renderSeatResps(s,slot){
    if(!slot) return;
    Promise.all(s.respDocs.map(function(path){ return fetchCtx(path).then(function(txt){ return txt; }); })).then(function(texts){
      var parsed=texts.filter(Boolean).map(parseRespFull)
        .sort(function(a,b){ var oa=(a.order==null?99:a.order), ob=(b.order==null?99:b.order); return oa-ob || a.title.localeCompare(b.title); });
      slot.innerHTML = parsed.length ? parsed.map(function(r){return respDocBlock(s,r);}).join('') : '<p class="rtbd">TBD</p>';
    });
  }
  // Legacy: a responsibility listed on the card with inline owns/delivers (Team view shows its doc as a dropdown).
  function respBlock(s,r){
    var docPath=docPathOf(s,r);
    var inner=grp('owns','Owns',r.owns)+grp('delivers','Delivers',r.delivers);
    var cd='';
    if(MODE==='team'){
      var dd=docPath ? ' data-doc="'+esc(docPath)+'"' : '';
      var ph=docPath ? '<p class="rtbd">Loading…</p>' : '<p class="rtbd">No context doc linked yet — add a doc: line to this responsibility in the card.</p>';
      cd='<details class="ctx ctxdoc"'+dd+'><summary>More info</summary><div class="ctxbody">'+ph+'</div></details>';
    }
    return '<details class="resp" open style="--c:'+colorOf(s)+'"><summary>'+esc(r.title)+'</summary><div class="resp-body">'+inner+'</div>'+cd+'</details>';
  }

  function select(id){
    selected=id; var s=byId[id]; if(!s) return;
    var p=document.getElementById('panel'); p.className='panel';
    document.body.classList.add('detail-open');
    var open=!s.owner||s.owner==='TBD';
    var head=header(s);
    var useDocs=s.respDocs && s.respDocs.length;
    var respHtml=useDocs ? '<div class="resp-list"><p class="rtbd">Loading…</p></div>'
                         : (s.resp.map(function(r){return respBlock(s,r);}).join('')||'<p class="rtbd">TBD</p>');
    if(MODE==='team'){
      var seatCtx='<details class="ctx ctxdoc seatctx" data-doc="'+esc(s.folder)+'/context.md"><summary>Seat context</summary><div class="ctxbody"><p class="rtbd">Loading…</p></div></details>';
      p.innerHTML = head
        +seatCtx
        +'<div class="sect">Responsibilities</div>'+respHtml
        +'<div class="sect">Key interfaces</div>'+ulist(s.interfaces)
        +'<div class="filebadge">'+esc(s.folder)+'/seat.md</div>';
    } else {
      var ctx=[]; s.resp.forEach(function(r){ ctx=ctx.concat(r.context); }); ctx=uniq(ctx);
      p.innerHTML = head
        +(open?('<div class="sect">Requirements</div>'+ulist(s.requirements)):'')
        +'<div class="sect">Responsibilities</div>'+respHtml
        +(ctx.length?'<details class="ctx"><summary>Context</summary>'+ulist(ctx)+'</details>':'')
        +'<div class="sect">Key interfaces</div>'+ulist(s.interfaces)
        +(open?'<a class="apply js-noop" href="#">Apply for this seat</a>':'')
        +'<div class="filebadge">'+esc(s.folder)+'/seat.md</div>';
    }
    if(useDocs){ renderSeatResps(s, p.querySelector('.resp-list')); }
    render();
  }

  function render(){
    var qel=document.getElementById('q'); var q=(qel&&qel.value||'').toLowerCase();
    var chart=document.getElementById('chart');
    if(q){
      var hits=SEATS.filter(function(s){return ((s.seat||'')+(s.domain||'')+(s.owner||'')+(s.purpose||'')).toLowerCase().indexOf(q)>=0;});
      chart.innerHTML='<div class="row">'+hits.map(block).join('')+'</div>'; return;
    }
    var roots=SEATS.filter(function(s){return !s.reports_to && !isOutsideGroup(s.group);});
    var html='<ul class="tree">'+roots.map(function(r){return treeNode(r.id);}).join('')+'</ul>';
    var groups=[];
    OUTSIDE.forEach(function(g){
      var members=SEATS.filter(function(s){return s.group===g.key;}).sort(function(a,b){ var oa=(a.order==null?99:a.order), ob=(b.order==null?99:b.order); return oa-ob || a.seat.localeCompare(b.seat); });
      if(members.length){
        groups.push('<div class="outside-grp"><div class="spare-label">'+esc(g.label)+'</div><div class="row">'+members.map(block).join('')+'</div></div>');
      }
    });
    if(groups.length){ html+='<div class="outside-wrap">'+groups.join('')+'</div>'; }
    html+='<p class="hint">Add a seat: create a folder under AI/ with a seat.md inside — it shows up here automatically.</p>';
    chart.innerHTML=html;
  }

  function fetchCtx(path){
    if(ctxCache[path]!=null) return Promise.resolve(ctxCache[path]);
    return fetch(RAW+path).then(function(r){ return r.ok?r.text():''; }).catch(function(){ return ''; }).then(function(txt){ ctxCache[path]=txt; return txt; });
  }

  function load(){
    Promise.all([
      fetch(RAW+'AI/team.md').then(function(r){ return r.ok?r.text():''; }).catch(function(){ return ''; }),
      fetch('https://api.github.com/repos/'+REPO+'/git/trees/'+BRANCH+'?recursive=1')
        .then(function(r){ if(!r.ok) throw new Error('tree '+r.status); return r.json(); })
        .then(function(t){
          var md=(t.tree||[]).filter(function(n){ return n.type==='blob' && n.path.indexOf(DIR+'/')===0 && n.path.indexOf(DIR+'/archive/')!==0 && n.path.slice(-3)==='.md'; }).map(function(n){return n.path;});
          var seatPaths=md.filter(function(p){ return p.slice(-8)==='/seat.md'; });
          return Promise.all(seatPaths.map(function(p){
            var folder=p.slice(0,-8);
            // a responsibility = any .md directly in the seat folder that isn't seat.md or context.md
            var respDocs=md.filter(function(m){
              if(m===p || m.slice(0,folder.length+1)!==folder+'/') return false;
              var base=m.slice(folder.length+1);
              return base.indexOf('/')<0 && base!=='context.md';
            });
            return fetch(RAW+p).then(function(r){return r.text();}).then(function(txt){ return {path:p, text:txt, folder:folder, respDocs:respDocs}; });
          }));
        })
    ]).then(function(out){
      TEAM=out[0]||'';
      var cards=out[1].map(function(o){ var c=parseCard(o.text); c.folder=o.folder; c.respDocs=o.respDocs; return c; }).filter(function(s){return s.id;});
      byId={}; SEATS=[];
      cards.forEach(function(s){ if(!byId[s.id]){ byId[s.id]=s; SEATS.push(s); } });
      render(); showTeam();
    }).catch(function(e){
      document.getElementById('chart').innerHTML="<p class='loading'>Couldn't load ("+esc(e.message)+"). Reads AI/ live via the GitHub API — if rate-limited, wait a minute and reload.</p>";
    });
  }

  function init(mode){
    MODE=(mode==='team')?'team':'recruitment';
    var qel=document.getElementById('q'); if(qel){ qel.addEventListener('input', render); }
    var panel=document.getElementById('panel');
    document.getElementById('chart').addEventListener('click', function(e){ var b=e.target.closest('.blk'); if(b) select(b.getAttribute('data-id')); else showTeam(); });
    panel.addEventListener('click', function(e){
      if(e.target.closest('.js-back')){ e.preventDefault(); showTeam(); return; }
      if(e.target.closest('.js-noop')){ e.preventDefault(); return; }
    });
    panel.addEventListener('toggle', function(e){
      var d=e.target; if(!d.classList || !d.classList.contains('ctxdoc')) return;
      if(!d.open || d.getAttribute('data-loaded')) return;
      var path=d.getAttribute('data-doc'); if(!path) return;
      d.setAttribute('data-loaded','1');
      var body=d.querySelector('.ctxbody');
      fetchCtx(path).then(function(txt){
        if(!txt){ body.innerHTML='<p class="rtbd">No context doc yet ('+esc(path)+').</p>'; return; }
        body.innerHTML=mdToHtml(stripFM(txt));
      });
    }, true);
    load();
  }

  return { init:init };
})();
