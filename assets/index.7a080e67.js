import{q as b,p as v,v as T,n as w,I as F,o as k,g as C,h as f,Y as B}from"./vue-1679627021.a934d265.js";import{u as S}from"./vue-router.66467d2c.js";import{a as A}from"./page-servers.e6b16c68.js";import{e as y,n as z,h as D,g as M,b as R}from"./utils.0f533082.js";import{u as V}from"./main.6b4bfbbc.js";import{u as N,i as I,a as q,b as E,c as L,f as W,e as j}from"./echarts.52838dc0.js";import{_ as O}from"./layout.0f849ecc.js";import"./page-access.8950e182.js";import"./element-plus.1d80007c.js";import"./tools.83bd328c.js";import"./main.1753c60c.js";import"./element-reset.0831d18a.js";const r={grid:{top:"80px",right:"0",bottom:"24px",left:"50px",show:!0,borderColor:"transparent"},title:{text:"Redis \u50A8\u5B58\u60C5\u51B5",subtext:"Redis storage situation"},tooltip:{trigger:"axis",extraCssText:"min-width: 200px;",formatter([t,n,s]){const a=t.axisValue,i=a.length>40?a.slice(0,40)+"...":a,e="display: flex;justify-content: space-between;",p="display: inline-block; width: 12px; height: 12px; border-radius: 50%; margin-right: 6px; background:";return`<div>${i}
        <p style='${e}'>
          <strong><span style='${p}#6767fd;'></span>${t.seriesName}</strong>
          <span>${t.value}</span>
        </p>
        <p style='${e}'>
          <strong><span style='${p}#67fdd8;'></span>${n.seriesName}</strong><span>${n.value}</span>
        </p>
        <p style='${e}'>
          <strong><span style='${p}#a567fd;'></span>${s.seriesName}</strong><span>${y(s.value)}</span>
        </p>
      </div>`}},xAxis:{type:"category",data:[],axisTick:{show:!1},axisLabel:{formatter(t){return t.length<9?t:t.slice(0,9)+"..."}}},yAxis:{type:"value"},series:[{name:"\u7F13\u5B58\u65F6\u95F4",type:"bar",stack:"total",symbol:"none",smooth:!0,data:[]},{name:"\u8FC7\u671F\u65F6\u95F4",type:"bar",stack:"total",symbol:"none",smooth:!0,data:[]},{name:"\u5927\u5C0F",type:"bar",stack:"total",symbol:"none",smooth:!0,data:[],itemStyle:{color:function(){return z()+"99"}}}]};N([q,E,L,W,j]);const U=()=>{const t=w(),n=S();let s=null;b(()=>{s=I(t.refs.chart),s.on("click",e=>{n.push({name:"ServersRedis",query:{path:e.name}})})});const a=V();v(()=>a.clientWidth,e=>{s.resize()});const i=T("0");return async function(){const[e,p]=await A();if(e)return;const{data:l,size:g}=p.data;i.value=y(g);const m=[],c=[],d=[],h=[];for(const u in l){const o=l[u];m.push(u),c.push(D(o)+u.length);const _=o.overTime?M(o.overTime/1e3):"\u4E0D\u8FC7\u671F";d.push(_);const $=o.overTime?R(o.createTime+o.overTime,"MM/DD hh:mm:ss"):"";h.push($)}const x=(Math.max(...c)+"0").length*10;r.grid.left=x+"px",r.xAxis.data=m,r.series[0].data=d,r.series[1].data=h,r.series[2].data=c,s.setOption(r)}(),{totalSize:i}};const Y=F({setup:U}),G={class:"wrap"},H={ref:"chart",class:"chart"},J={class:"total-size"};function K(t,n,s,a,i,e){return k(),C("div",G,[f("div",H,null,512),f("span",J,"\u5360\u7528\u5185\u5B58\uFF1A"+B(t.totalSize),1)])}const pt=O(Y,[["render",K],["__scopeId","data-v-90b0bd7c"]]);export{pt as default};
