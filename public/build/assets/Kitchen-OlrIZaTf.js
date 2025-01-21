import{r as m,x as B,o,f as l,b as e,t as g,g as z,n as O,F as k,h as M,y as T,z as L,a as $,w as y,u as R,c as F,A,Z as V,B as E,C as K,D as j}from"./app-xOyRp-ns.js";import{_ as D}from"./Modal-LUPm6GlR.js";import{_ as Y}from"./_plugin-vue_export-helper-DlAUqK2U.js";const q={key:0,class:"bg-zinc-800 rounded-lg p-4 ease-in-out duration-200 transition-all relative text-white h-min"},G={class:"flex justify-between"},P={class:"text-xs"},U={key:0},Z=["onClick"],H={key:0,class:"my-4 rounded-md p-3 bg-zinc-900 text-zinc-200"},J={class:"flex justify-between space-x-2 mt-2"},Q=["disabled"],W={key:1,class:"bg-zinc-800 rounded-lg p-4 ease-in-out duration-200 transition-all text-white h-min"},X=T('<p class="h-3 w-32 rounded-full bg-zinc-600 mb-2 animate-pulse"></p><p class="h-28 rounded-lg bg-zinc-600 animate-pulse"></p><div class="flex justify-between space-x-2 mt-2"><div class="h-8 rounded-2xl bg-zinc-600 animate-pulse w-full"></div><div class="h-8 rounded-2xl bg-zinc-600 animate-pulse w-full"></div></div>',3),ee=[X],te={__name:"OrderCard",props:{data:{type:Object},id:{type:Number}},emits:["remove","finish"],setup(c,{emit:x}){const v=c,w=x,s=m(null),f=m(!1);B(()=>{v.id&&(f.value=!0,axios.get(route("order.get",v.id)).then(u=>{u.data.items.forEach(b=>b.done=!1),s.value=u.data}).finally(()=>{f.value=!1}))});const r=()=>{w("remove")},_=()=>{w("finish")};return(u,b)=>!f.value&&s.value?(o(),l("div",q,[e("div",G,[e("div",null,[e("p",P,g(Intl.DateTimeFormat("en-US",{month:"long",day:"numeric",year:"numeric",hour:"numeric",minute:"numeric"}).format(new Date(s.value.created_at))),1),s.value.name?(o(),l("p",U,"Customer: "+g(s.value.name),1)):z("",!0)]),e("span",{class:O(["rounded-full px-5 border text-lg font-bold h-min",s.value.type==="Dine-in"?"bg-green-500 border-green-950 text-green-950":"bg-red-500 border-red-950 text-red-950"])},g(s.value.type),3)]),(o(!0),l(k,null,M(s.value.items,i=>(o(),l("p",{class:O(["rounded-lg p-2 bg-zinc-700 mt-2",{"opacity-50 line-through":i.done}]),onClick:h=>i.done=!i.done},g(`${i.name} x${i.quantity}`),11,Z))),256)),s.value.note?(o(),l("div",H,g(s.value.note),1)):z("",!0),e("div",J,[e("button",{onClick:r,class:"p-2 bg-red-500 rounded-2xl text-white text-xs w-full"},"Cancel"),e("button",{onClick:_,class:"p-2 bg-blue-500 rounded-2xl text-white text-xs w-full disabled:opacity-25 disabled:cursor-not-allowed",disabled:!s.value.items.every(i=>i.done)},"Done",8,Q)])])):(o(),l("div",W,ee))}},d=c=>(E("data-v-bf8f4ee6"),c=c(),K(),c),se=d(()=>e("title",null,`
            Kitchen
        `,-1)),oe={class:"bg-zinc-950 min-h-screen"},ne={key:1,class:"min-h-screen w-full flex justify-center items-center text-zinc-400"},ae={class:"flex flex-col"},le=["src"],ie=d(()=>e("p",{class:"text-zinc-400"},"Nothing in here...",-1)),re=d(()=>e("b",null,"Confirmation",-1)),de=d(()=>e("p",{class:"mt-2"},"Are you sure you want to cancel this order?",-1)),ce=d(()=>e("p",{class:"text-sm"},"This action cannot be undone.",-1)),ue=d(()=>e("b",null,"Confirmation",-1)),he=d(()=>e("p",{class:"mt-2"},"Are you sure this order is already done?",-1)),me=d(()=>e("p",{class:"text-sm"},"This action cannot be undone.",-1)),pe=Object.assign({layout:null},{__name:"Kitchen",props:{orders:Object},setup(c){const x=(t,n)=>{const a=Math.ceil(t),p=Math.floor(n);return Math.floor(Math.random()*(p-a+1)+a)},v=m(x(1,14)),s=m(c.orders);L(s.value,()=>{s.value.length===0&&(v.value=x(1,14))});const f=new Audio("../genshin_mail.mp3");Echo.private("kitchen").listen("OrderPlaced",t=>{s.value?s.value.push(t.order):s.value=[t.order],f.play()}).listen("OrderDone",t=>{s.value.splice(s.value.findIndex(n=>n==t.order),1)});const r=m({index:"",order:""}),_=m(!1),u=m(!1),b=(t,n)=>{r.value.index=t,r.value.order=n,_.value=!0},i=(t,n)=>{r.value.index=t,r.value.order=n,u.value=!0},h=()=>{_.value=!1,u.value=!1},N=()=>{h(),j.delete(route("order.cancel",r.value.order)).then(t=>console.log(t.data))},I=()=>{h(),j.delete(route("order.done",r.value.order)).then(t=>console.log(t.data))},S=t=>{const{marginLeft:n,marginTop:a,width:p,height:C}=window.getComputedStyle(t);t.style.left=`${t.offsetLeft-parseFloat(n,10)}px`,t.style.top=`${t.offsetTop-parseFloat(a,10)}px`,t.style.width=p,t.style.height=C};return(t,n)=>(o(),l(k,null,[$(R(V),null,{default:y(()=>[se]),_:1}),e("div",oe,[s.value.length?(o(),F(A,{key:0,tag:"div",name:"list",onBeforeLeave:S,class:"grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 p-4"},{default:y(()=>[(o(!0),l(k,null,M(s.value,(a,p)=>(o(),l("div",{key:a},[(o(),F(te,{id:a,key:a,onRemove:C=>b(p,a),onFinish:C=>i(p,a)},null,8,["id","onRemove","onFinish"]))]))),128))]),_:1})):(o(),l("div",ne,[e("div",ae,[e("img",{class:"max-w-32 max-h-32",src:`../empty/${v.value}.png`,alt:""},null,8,le),ie])]))]),$(D,{show:_.value,onClose:h,"max-width":"md"},{default:y(()=>[e("div",{class:"p-6 bg-zinc-800 text-white"},[re,de,ce,e("div",{class:"flex justify-end space-x-4"},[e("button",{onClick:h,class:"hover:underline"},"No"),e("button",{onClick:N,class:"bg-red-500 hover:bg-red-700 active:bg-red-900 duration-200 ease-in-out px-2 py-1 rounded-lg text-sm"},"Yes")])])]),_:1},8,["show"]),$(D,{show:u.value,onClose:h,"max-width":"md"},{default:y(()=>[e("div",{class:"p-6 bg-zinc-800 text-white"},[ue,he,me,e("div",{class:"flex justify-end space-x-4"},[e("button",{onClick:h,class:"hover:underline"},"No"),e("button",{onClick:I,class:"bg-red-500 hover:bg-red-700 active:bg-red-900 duration-200 ease-in-out px-2 py-1 rounded-lg text-sm"},"Yes")])])]),_:1},8,["show"])],64))}}),ge=Y(pe,[["__scopeId","data-v-bf8f4ee6"]]);export{ge as default};
