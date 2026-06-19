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
  function inline(t){ var p=t.split('**'),r=''; for(var i=0;i<p.length;i++){ r+=(i%2===1)?'<strong>'+p[i]+'</strong>':p[i]; } return r; }
  function initials(n){ var p=(n||'').split(' ').filter(Boolean); return ((p[0]||'?').charAt(0)+(p.length>1?p[p.length-1].charAt(0):'')).toUpperCase(); }
  function uniq(a){ var seen={},o=[]; a.forEach(function(x){ if(!seen[x]){ seen[x]=1; o.push(x); } }); return o; }
  function trimSep(s){ var k=0; while(k<s.length && ' —:-'.indexOf(s.charAt(k))>=0) k++; return s.slice(k); }

  function stripFM(md){
    if(md.indexOf('---')===0){ var end=md.indexOf(NL+'---',3); if(end>0){ return md.slice(end+4).trimStart(); } }
    return md;
  }
  function mdToHtml(md){
    var out=[], inList=false; function cl(){ if(inList){ out.push('</ul>'); inList=false; } }
    md.split(NL).forEach(function(raw){
      var line=raw.replace(/ +$/,'');
      if(line.charAt(0)==='#'){ cl(); var lv=0; while(line.charAt(lv)==='#') lv++; var t=line.slice(lv).trim();
        out.push(lv<=1 ? '<h2 class="tov-h">'+inline(esc(t))+'</h2>' : '<div class="sect">'+inline(esc(t))+'</div>'); }
      else if(line.charAt(0)==='>'){ cl(); out.push('<p class="ctx-note">'+inline(esc(trimSep(line.slice(1))))+'</p>'); }
      else if((line.charAt(0)==='-'||line.charAt(0)==='*') && line.charAt(1)===' '){ if(!inList){ out.push('<ul class="ilist">'); inList=true; } out.push('<li>'+inline(esc(line.slice(2)))+'</li>'); }
      else if(line===''){ cl(); }
      else { cl(); out.push('<p class="tov-p">'+inline(esc(line))+'</p>'); }
    });
    cl(); return out.join('');
  }
  function showTeam(){ selected=null; document.body.classList.remove('detail-open'); var p=document.getElementById('panel'); p.className='panel';
    p.innerHTML = TEAM ? mdToHtml(TEAM) : '<div class="loading">Add a team.md for the overview.</div>'; render(); }

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
  function legend(){
    return '<div class="legend">'+Object.keys(DCOL).map(function(d){
      return '<span><span class="sw" style="background:'+DCOL[d]+'"></span>'+d.replace('Technology – ','').replace(' (interface)','')+'</span>';
    }).join('')+'</div>';
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

  function select(id){
    selected=id; var s=byId[id]; if(!s) return;
    var p=document.getElementById('panel'); p.className='panel';
    document.body.classList.add('detail-open');
    var open=!s.owner||s.owner==='TBD';
    var head=header(s);
    if(MODE==='team'){
      var seatCtx='<details class="ctx ctxdoc seatctx" data-doc="'+esc(s.folder)+'/context.md"><summary>Seat context</summary><div class="ctxbody"><p class="rtbd">Loading…</p></div></details>';
      var respT=s.resp.map(function(r){
        var inner=grp('owns','Owns',r.owns)+grp('delivers','Delivers',r.delivers);
        var docPath = r.doc ? (r.doc.indexOf('/')>=0 ? r.doc : s.folder+'/'+r.doc) : null;
        var dd = docPath ? ' data-doc="'+esc(docPath)+'"' : '';
        var ph = r.doc ? '<p class="rtbd">Loading…</p>' : '<p class="rtbd">No context doc linked yet — add a doc: line to this responsibility in the card.</p>';
        var cd = '<details class="ctx ctxdoc"'+dd+'><summary>Context</summary><div class="ctxbody">'+ph+'</div></details>';
        return '<details class="resp" open style="--c:'+colorOf(s)+'"><summary>'+esc(r.title)+'</summary><div class="resp-body">'+inner+'</div>'+cd+'</details>';
      }).join('');
      p.innerHTML = head
        +seatCtx
        +'<div class="sect">Responsibilities</div>'+(respT||'<p class="rtbd">TBD</p>')
        +'<div class="sect">Key interfaces</div>'+ulist(s.interfaces)
        +'<div class="filebadge">'+esc(s.folder)+'/seat.md</div>';
    } else {
      var ctx=[]; s.resp.forEach(function(r){ ctx=ctx.concat(r.context); }); ctx=uniq(ctx);
      var resp=s.resp.map(function(r){
        var inner=grp('owns','Owns',r.owns)+grp('delivers','Delivers',r.delivers);
        return '<details class="resp" open style="--c:'+colorOf(s)+'"><summary>'+esc(r.title)+'</summary><div class="resp-body">'+inner+'</div></details>';
      }).join('');
      p.innerHTML = head
        +(open?('<div class="sect">Requirements</div>'+ulist(s.requirements)):'')
        +'<div class="sect">Responsibilities</div>'+(resp||'<p class="rtbd">TBD</p>')
        +(ctx.length?'<details class="ctx"><summary>Context</summary>'+ulist(ctx)+'</details>':'')
        +'<div class="sect">Key interfaces</div>'+ulist(s.interfaces)
        +(open?'<a class="apply js-noop" href="#">Apply for this seat</a>':'')
        +'<div class="filebadge">'+esc(s.folder)+'/seat.md</div>';
    }
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
    var html=legend()+'<ul class="tree">'+roots.map(function(r){return treeNode(r.id);}).join('')+'</ul>';
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
      fetch(RAW+'team.md').then(function(r){ return r.ok?r.text():''; }).catch(function(){ return ''; }),
      fetch('https://api.github.com/repos/'+REPO+'/git/trees/'+BRANCH+'?recursive=1')
        .then(function(r){ if(!r.ok) throw new Error('tree '+r.status); return r.json(); })
        .then(function(t){
          var paths=(t.tree||[]).filter(function(n){ return n.type==='blob' && n.path.indexOf(DIR+'/')===0 && n.path.indexOf(DIR+'/archive/')!==0 && n.path.slice(-8)==='/seat.md'; }).map(function(n){return n.path;});
          return Promise.all(paths.map(function(p){ return fetch(RAW+p).then(function(r){return r.text();}).then(function(txt){ return {path:p, text:txt}; }); }));
        })
    ]).then(function(out){
      TEAM=out[0]||'';
      var cards=out[1].map(function(o){ var c=parseCard(o.text); c.folder=o.path.slice(0,-8); return c; }).filter(function(s){return s.id;});
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
