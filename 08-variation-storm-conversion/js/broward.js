/* Broward Impact — vanilla JS (~3KB). Progressive enhancement only: all content is already in the HTML. */
(function(){
var d=document,h=d.documentElement;h.classList.add('js');
window.dataLayer=window.dataLayer||[];
function push(e,p){var o={event:e};for(var k in p)o[k]=p[k];window.dataLayer.push(o)}
/* mobile menu */
var mb=d.querySelector('.menu-btn'),mn=d.getElementById('mnav');
if(mb&&mn)mb.addEventListener('click',function(){var o=mn.classList.toggle('is-open');mb.setAttribute('aria-expanded',o)});
/* attribution capture */
var F=['utm_source','utm_medium','utm_campaign','utm_term','utm_content','gclid','wbraid','gbraid','fbclid'],q=new URLSearchParams(location.search),S={};
try{S=JSON.parse(sessionStorage.getItem('bw_attr')||'{}')}catch(e){}
F.forEach(function(k){if(q.get(k))S[k]=q.get(k)});
function ck(n){var m=d.cookie.match('(?:^|; )'+n+'=([^;]*)');return m?decodeURIComponent(m[1]):''}
S.fbp=ck('_fbp')||S.fbp||'';S.fbc=ck('_fbc')||(S.fbclid?'fb.1.'+Date.now()+'.'+S.fbclid:S.fbc||'');
S.landing_page=S.landing_page||location.href.split('#')[0];S.referrer=S.referrer||d.referrer||'';
try{sessionStorage.setItem('bw_attr',JSON.stringify(S))}catch(e){}
d.querySelectorAll('form[data-bw-form] input[type=hidden][name]').forEach(function(i){if(S[i.name]!==undefined)i.value=S[i.name]});
/* click events */
d.addEventListener('click',function(e){var a=e.target.closest('a[href]');if(!a)return;var u=a.getAttribute('href');
if(u.indexOf('tel:')===0)push('call_click',{link_url:u});else if(u.indexOf('sms:')===0)push('sms_click',{link_url:u})});
/* multi-step form */
d.querySelectorAll('form[data-bw-form]').forEach(function(f){
var st=[].slice.call(f.querySelectorAll('fieldset[data-step]')),i=0,pr=f.querySelectorAll('.form__prog li'),back=f.querySelector('[data-back]'),next=f.querySelector('[data-next]'),sub=f.querySelector('[data-submit]');
function show(n){i=n;st.forEach(function(s,k){s.classList.toggle('is-on',k===n)});pr.forEach(function(p,k){p.classList.toggle('on',k<=n)});
back.hidden=n===0;next.hidden=n===st.length-1;sub.hidden=n!==st.length-1}
function ok(){var bad=null;st[i].querySelectorAll('[required]').forEach(function(x){if(!bad&&!x.checkValidity())bad=x});
if(!bad&&st[i].querySelector('input[type=radio][required]')&&!st[i].querySelector('input[type=radio]:checked'))bad=st[i].querySelector('input[type=radio]');
if(bad){bad.reportValidity();bad.focus();return false}return true}
next.addEventListener('click',function(){if(ok())show(i+1)});
back.addEventListener('click',function(){show(i-1)});
f.addEventListener('change',function(e){if(e.target.type==='radio'&&i<2&&e.target.closest('[data-auto]'))setTimeout(function(){show(i+1)},180)});
f.addEventListener('submit',function(e){e.preventDefault();if(!ok())return;
var data={};new FormData(f).forEach(function(v,k){data[k]=v});
push('lead_form_submit',{form_id:f.getAttribute('data-ghl-id'),test_mode:f.hasAttribute('data-test-mode')});
if(f.hasAttribute('data-test-mode')){f.querySelector('.form__done').hidden=false;f.querySelectorAll('fieldset,.form__nav').forEach(function(x){x.hidden=true});
f.querySelector('.form__done pre').textContent=JSON.stringify(data,null,2);return}
/* LIVE: mount GHL embed (form id in data-ghl-id) here; never in test mode. */
});
show(0)});
/* before/after */
d.querySelectorAll('.ba').forEach(function(b){var r=b.querySelector('input');r.addEventListener('input',function(){b.style.setProperty('--pos',r.value+'%')})});
/* video facade: load iframe only on click */
d.querySelectorAll('.vid[data-yt]').forEach(function(v){v.addEventListener('click',function(){var f=d.createElement('iframe');f.src='https://www.youtube-nocookie.com/embed/'+v.getAttribute('data-yt')+'?autoplay=1&rel=0';f.allow='autoplay;encrypted-media;fullscreen';f.title=v.getAttribute('aria-label')||'Video';v.innerHTML='';v.appendChild(f)})});
})();
