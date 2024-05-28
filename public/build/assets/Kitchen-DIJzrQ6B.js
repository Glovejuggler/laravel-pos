import{r as u,y as S,o as a,f as r,b as e,t as x,F as k,k as F,z as B,_ as D,B as I,a as w,w as g,u as T,c as $,C as L,Z as R,D as E,E as K,G as O}from"./app-BGKEKckH.js";import{_ as z}from"./Modal-vJPNjYWj.js";const V={key:0,class:"bg-zinc-800 rounded-lg p-4 ease-in-out duration-200 transition-all relative text-white h-min"},A={class:"text-xs"},G={class:"rounded-lg p-2 bg-zinc-700 mb-2"},Y={key:1,class:"bg-zinc-800 rounded-lg p-4 ease-in-out duration-200 transition-all text-white h-min"},q=B('<p class="h-3 w-32 rounded-full bg-zinc-600 mb-2 animate-pulse"></p><p class="h-28 rounded-lg bg-zinc-600 animate-pulse"></p><div class="flex justify-between space-x-2 mt-2"><div class="h-8 rounded-2xl bg-zinc-600 animate-pulse w-full"></div><div class="h-8 rounded-2xl bg-zinc-600 animate-pulse w-full"></div></div>',3),P=[q],U={__name:"OrderCard",props:{data:{type:Object},id:{type:Number}},emits:["remove","finish"],setup(d,{emit:f}){const p=d,b=f,s=u(null),o=u(!1);S(()=>{p.id&&(o.value=!0,axios.get(route("order.get",p.id)).then(_=>s.value=_.data).finally(()=>{o.value=!1}))});const m=()=>{b("remove")},v=()=>{b("finish")};return(_,C)=>!o.value&&s.value?(a(),r("div",V,[e("p",A,x(Intl.DateTimeFormat("en-US",{month:"long",day:"numeric",year:"numeric",hour:"numeric",minute:"numeric"}).format(new Date(s.value.created_at))),1),e("p",null,"Customer: "+x(s.value.name),1),(a(!0),r(k,null,F(s.value.items,l=>(a(),r("p",G,x(`${l.name} x${l.quantity}`),1))),256)),e("p",null,x(s.value.type),1),e("div",{class:"flex justify-between space-x-2"},[e("button",{onClick:m,class:"p-2 bg-red-500 rounded-2xl text-white text-xs w-full"},"Cancel"),e("button",{onClick:v,class:"p-2 bg-blue-500 rounded-2xl text-white text-xs w-full"},"Done")])])):(a(),r("div",Y,P))}},c=d=>(E("data-v-8a146ea9"),d=d(),K(),d),Z=c(()=>e("title",null,`
            Kitchen
        `,-1)),H={class:"bg-zinc-950 min-h-screen"},J={key:1,class:"min-h-screen w-full flex justify-center items-center text-zinc-400"},Q={class:"flex flex-col"},W=["src"],X=c(()=>e("p",{class:"text-zinc-400"},"Nothing in here...",-1)),ee=c(()=>e("b",null,"Confirmation",-1)),te=c(()=>e("p",{class:"mt-2"},"Are you sure you want to cancel this order?",-1)),se=c(()=>e("p",{class:"text-sm"},"This action cannot be undone.",-1)),oe=c(()=>e("b",null,"Confirmation",-1)),ne=c(()=>e("p",{class:"mt-2"},"Are you sure this order is already done?",-1)),ae=c(()=>e("p",{class:"text-sm"},"This action cannot be undone.",-1)),le=Object.assign({layout:null},{__name:"Kitchen",props:{orders:Object},setup(d){const f=(t,i)=>{const n=Math.ceil(t),h=Math.floor(i);return Math.floor(Math.random()*(h-n+1)+n)},p=u(f(1,14)),s=u(d.orders);I(s.value,()=>{s.value.length===0&&(p.value=f(1,14))}),Echo.private("kitchen").listen("OrderPlaced",t=>{s.value?s.value.push(t.order):s.value=[t.order]});const o=u({index:"",order:""}),m=u(!1),v=u(!1),_=(t,i)=>{o.value.index=t,o.value.order=i,m.value=!0},C=(t,i)=>{o.value.index=t,o.value.order=i,v.value=!0},l=()=>{m.value=!1,v.value=!1},j=()=>{s.value.splice(o.value.index,1),l(),O.delete(route("order.cancel",o.value.order)).then(t=>console.log(t.data))},M=()=>{s.value.splice(o.value.index,1),l(),O.delete(route("order.done",o.value.order)).then(t=>console.log(t.data))},N=t=>{const{marginLeft:i,marginTop:n,width:h,height:y}=window.getComputedStyle(t);t.style.left=`${t.offsetLeft-parseFloat(i,10)}px`,t.style.top=`${t.offsetTop-parseFloat(n,10)}px`,t.style.width=h,t.style.height=y};return(t,i)=>(a(),r(k,null,[w(T(R),null,{default:g(()=>[Z]),_:1}),e("div",H,[s.value.length?(a(),$(L,{key:0,tag:"div",name:"list",onBeforeLeave:N,class:"grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2 p-4"},{default:g(()=>[(a(!0),r(k,null,F(s.value,(n,h)=>(a(),r("div",{key:n},[(a(),$(U,{id:n,key:n,onRemove:y=>_(h,n),onFinish:y=>C(h,n)},null,8,["id","onRemove","onFinish"]))]))),128))]),_:1})):(a(),r("div",J,[e("div",Q,[e("img",{class:"max-w-32 max-h-32",src:`../empty/${p.value}.png`,alt:""},null,8,W),X])]))]),w(z,{show:m.value,onClose:l,"max-width":"md"},{default:g(()=>[e("div",{class:"p-6 bg-zinc-800 text-white"},[ee,te,se,e("div",{class:"flex justify-end space-x-4"},[e("button",{onClick:l,class:"hover:underline"},"No"),e("button",{onClick:j,class:"bg-red-500 hover:bg-red-700 active:bg-red-900 duration-200 ease-in-out px-2 py-1 rounded-lg text-sm"},"Yes")])])]),_:1},8,["show"]),w(z,{show:v.value,onClose:l,"max-width":"md"},{default:g(()=>[e("div",{class:"p-6 bg-zinc-800 text-white"},[oe,ne,ae,e("div",{class:"flex justify-end space-x-4"},[e("button",{onClick:l,class:"hover:underline"},"No"),e("button",{onClick:M,class:"bg-red-500 hover:bg-red-700 active:bg-red-900 duration-200 ease-in-out px-2 py-1 rounded-lg text-sm"},"Yes")])])]),_:1},8,["show"])],64))}}),ce=D(le,[["__scopeId","data-v-8a146ea9"]]);export{ce as default};
