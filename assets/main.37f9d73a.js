(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))c(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const r of e.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&c(r)}).observe(document,{childList:!0,subtree:!0});function s(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerpolicy&&(e.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?e.credentials="include":t.crossorigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function c(t){if(t.ep)return;t.ep=!0;const e=s(t);fetch(t.href,e)}})();const h="modulepreload",_=function(i){return"/wide/"+i},d={},u=function(o,s,c){if(!s||s.length===0)return o();const t=document.getElementsByTagName("link");return Promise.all(s.map(e=>{if(e=_(e),e in d)return;d[e]=!0;const r=e.endsWith(".css"),m=r?'[rel="stylesheet"]':"";if(!!c)for(let l=t.length-1;l>=0;l--){const a=t[l];if(a.href===e&&(!r||a.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${e}"]${m}`))return;const n=document.createElement("link");if(n.rel=r?"stylesheet":h,r||(n.as="script",n.crossOrigin=""),n.href=e,document.head.appendChild(n),r)return new Promise((l,a)=>{n.addEventListener("load",l),n.addEventListener("error",()=>a(new Error(`Unable to preload CSS for ${e}`)))})})).then(()=>o())},f=location.pathname;/^\/wide\/admin/.test(f)?u(()=>import("./main.117b4dd9.js").then(i=>i.m),["assets/main.117b4dd9.js","assets/vue-1679627298.c4db9afc.js","assets/utils.93ae7c0e.js","assets/element-plus.077029b0.js","assets/tools.d490154e.js","assets/element-plus.cbc2892a.css","assets/layout.9d4d40c9.js","assets/vue-router.e93c7b34.js","assets/layout.385f7e54.css","assets/element-reset.f5779363.js","assets/main.ee4f8b0f.css"]):/^\/wide\/permissions/.test(f)?u(()=>import("./main.acd1c409.js"),["assets/main.acd1c409.js","assets/vue-1679627298.c4db9afc.js","assets/layout.9d4d40c9.js","assets/vue-router.e93c7b34.js","assets/utils.93ae7c0e.js","assets/element-plus.077029b0.js","assets/tools.d490154e.js","assets/element-plus.cbc2892a.css","assets/layout.385f7e54.css","assets/page-access.17907827.js","assets/page-access.9ac0dfa2.css","assets/element-reset.f5779363.js","assets/main.2fa22669.css"]):/^\/wide\/www/.test(f)?u(()=>import("./main.05235b6f.js"),["assets/main.05235b6f.js","assets/vue-1679627298.c4db9afc.js","assets/layout.9d4d40c9.js","assets/vue-router.e93c7b34.js","assets/utils.93ae7c0e.js","assets/element-plus.077029b0.js","assets/tools.d490154e.js","assets/element-plus.cbc2892a.css","assets/layout.385f7e54.css"]):location.href="/wide/admin";export{u as _};
