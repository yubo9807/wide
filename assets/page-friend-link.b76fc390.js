import{L as F}from"./page-access.df1773ed.js";import{c as k,b}from"./utils.3435bab1.js";import{r as p,_ as h}from"./layout.36fecf86.js";import{s as B,ar as o,o as C,S as w,T as a,Z as e,X as u,Y as d}from"./vue-1679628516.2a56736c.js";import{c as E,b as g}from"./element-plus.0cdd3ca0.js";import"./vue-router.7340dcac.js";import"./tools.1734dbbc.js";function y(){return p({url:"/friendLink",method:"get"})}function L(t){return p({url:"/friendLink",method:"delete",data:t})}let i=null;const x={};class D extends k{constructor(){super(x,y),this.initData(),i=this.initData,B(()=>{i=null})}}const T=()=>{function t(l){E.confirm("\u786E\u8BA4\u5220\u9664\u8BE5\u53CB\u94FE\uFF1F","\u8B66\u544A",{confirmButtonText:"\u786E\u8BA4",cancelButtonText:"\u53D6\u6D88",type:"warning"}).then(async()=>{const[s]=await L({id:l.id});s||(g.success("\u5220\u9664\u6210\u529F"),i())}).catch(()=>{})}return{deleteFriendLink:t}},A={components:{LayoutContainer:F},setup(){return{dateFormater:b,...new D,...T()}}};function $(t,l,s,m,N,v){const n=o("el-table-column"),c=o("el-link"),_=o("el-table"),f=o("LayoutContainer");return C(),w(f,{class:"blacklist"},{default:a(()=>[e(_,{data:t.tableData},{default:a(()=>[e(n,{label:"\u5E8F\u53F7",type:"index",width:"60"}),e(n,{label:"\u53CB\u94FE\u540D\u79F0",prop:"name"}),e(n,{label:"\u53CB\u94FE\u5730\u5740",prop:"link","min-width":"160"},{default:a(r=>[e(c,{type:"primary",href:r.row.link,target:"_blank"},{default:a(()=>[u(d(r.row.link),1)]),_:2},1032,["href"])]),_:1}),e(n,{label:"\u4ECB\u7ECD",prop:"introduce","min-width":"160"}),e(n,{label:"\u5907\u6CE8",prop:"remark","min-width":"140"}),e(n,{label:"\u521B\u5EFA\u65F6\u95F4",prop:"create_time","min-width":"160"},{default:a(r=>[u(d(m.dateFormater(r.row.create_time*1e3)),1)]),_:1}),e(n,{label:"\u64CD\u4F5C"},{default:a(r=>[e(c,{type:"danger",onClick:I=>t.deleteFriendLink(r.row)},{default:a(()=>[u("\u5220\u9664")]),_:2},1032,["onClick"])]),_:1})]),_:1},8,["data"])]),_:1})}const Y=h(A,[["render",$]]);export{Y as default};