import{o as a,f as i,b as e,t as o,F as _,h as j,r as h,d as L,n as U,g as m,a as c,w,H as Q,k as N,T as Z,A as W,y as K,u as f,Z as X,O as I,s as Y}from"./app-DmUnb2X3.js";import{_ as O}from"./Modal-Dr6Lh1Pu.js";import{Z as J}from"./index-CbjWbaYu.js";import{_ as A}from"./InputLabel-IwwJPNrG.js";import{_ as E}from"./TextInput-8xbIfiOS.js";const ee={class:"w-64 bg-white pb-6 z-10"},te=e("div",{class:"flex justify-center"},[e("img",{src:"logo.jpg",class:"w-32",alt:""})],-1),se={class:"grid grid-cols-2"},le={class:"text-right"},oe={class:"grid grid-cols-2"},ne=e("b",null,"Type",-1),ae={class:"text-right"},ie=e("hr",{class:"border-black mt-2"},null,-1),re=e("div",{class:"flex justify-between"},[e("p",null,"Item"),e("p",null,"Subtotal")],-1),de=e("hr",{class:"border-black mb-2"},null,-1),ce={class:"flex justify-between pl-4 w-full"},ue={class:"w-full"},he=e("hr",{class:"border-black my-2"},null,-1),me={class:"font-bold text-lg flex justify-between"},fe=e("p",null,"TOTAL",-1),ve={class:"pl-4"},be=e("hr",{class:"border-black my-2"},null,-1),xe=e("div",{class:"flex justify-center"},[e("p",null,"Thank you. Come again.")],-1),_e={class:"flex justify-between text-sm"},pe=e("p",null,"Cashier",-1),ge={class:"flex justify-between text-sm"},we=e("p",null,"Order ID",-1),ye={class:"text-right"},$e={class:"flex justify-between text-sm"},ke=e("p",{class:"w-max"},"Order Time",-1),Ce={class:"w-max"},je=e("div",{class:"flex flex-col items-center justify-center text-sm mt-2 w-full"},[e("b",null,"UPTop Diner"),e("p",null,"25 L. Geirosa Ave., Brgy. Silangan"),e("p",null,"Calauan, Laguna"),e("p",null,"La Famiglia Building 2nd Floor")],-1),De=e("hr",{class:"border-black my-2"},null,-1),Fe=e("p",null,"THIS IS NOT AN OFFICIAL RECEIPT",-1),Te={__name:"Receipt",props:{receipt:{type:Object,required:!0}},setup(s){return(d,y)=>(a(),i("div",ee,[te,e("div",se,[e("p",null,o(s.receipt.name??" "),1),e("p",le,o(`Order #${s.receipt.number}`),1)]),e("div",oe,[ne,e("b",ae,o(s.receipt.type),1)]),ie,re,de,e("div",null,[(a(!0),i(_,null,j(s.receipt.items,u=>(a(),i("div",null,[e("p",null,o(u.name),1),e("div",ce,[e("p",ue,o(Number(u.price).amountFormat())+" x"+o(u.quantity),1),e("p",null,o((u.quantity*u.price).amountFormat()),1)])]))),256)),he,e("div",null,[e("div",me,[fe,e("p",null,o(s.receipt.gross.amountFormat()),1)]),e("div",ve,[e("p",null,"CASH: "+o(Number(s.receipt.payment).amountFormat()),1),e("p",null,"CHANGE: "+o((s.receipt.payment-s.receipt.gross).amountFormat()),1)])]),be,xe,e("div",_e,[pe,e("p",null,o(d.$page.props.auth.user.name),1)]),e("div",ge,[we,e("p",ye,o(`dQw4w9WgXcQ${s.receipt.id.pad(4)}`),1)]),e("div",$e,[ke,e("p",Ce,o(Intl.DateTimeFormat("en-US",{month:"2-digit",day:"2-digit",year:"numeric",hour:"2-digit",minute:"numeric",hour12:!0}).format(new Date(s.receipt.created_at))),1)]),je,De,Fe])]))}},Ie={key:0,class:"overflow-hidden"},Oe={class:"flex justify-between text-sm"},V={__name:"ExpensesCard",props:{data:Object,title:String,total:Number},setup(s){const d=h(!1);return(y,u)=>(a(),i(_,null,[e("div",{onClick:u[0]||(u[0]=p=>d.value=!d.value),class:"flex justify-between"},[e("span",null,[L(o(s.title)+" ",1),s.data.length?(a(),i("i",{key:0,class:U(["bx bxs-chevron-down align-middle duration-300 ease-in-out",{"rotate-180":d.value}])},null,2)):m("",!0)]),e("b",null,o(Number(s.total).amountFormat()),1)]),c(Q,{"enter-from-class":"max-h-0","enter-active-class":"duration-300 ease-in-out","enter-to-class":"max-h-screen","leave-from-class":"max-h-screen","leave-to-class":"max-h-0","leave-active-class":"duration-300 ease-in-out"},{default:w(()=>[d.value?(a(),i("div",Ie,[(a(!0),i(_,null,j(s.data,p=>(a(),i("div",Oe,[e("span",null,o(p.item),1),e("span",null,o(p.amount),1)]))),256))])):m("",!0)]),_:1})],64))}},Se=e("title",null,`
            Sales
        `,-1),ze={class:"max-w-7xl mx-auto px-6 py-8 lg:px-8 z-50"},Ne={class:"flex justify-between items-center mb-4"},Ae={key:0,class:"flex space-x-2 items-center"},Ee={class:"dark:text-white font-semibold"},Ve={key:1,class:"dark:text-white"},Le={key:0,class:"w-full rounded-lg dark:bg-zinc-800 bg-white dark:text-white p-4 flex flex-col relative"},Me={key:0,class:"w-full lg:w-1/4"},He={class:"flex justify-between"},Pe=e("span",null,"Total orders:",-1),Re={class:"flex justify-between"},qe=e("span",null,"Gross sales:",-1),Be={class:"flex justify-between"},Ge=e("span",null,"Cost of goods sold:",-1),Ue={class:"flex justify-between"},Qe=e("span",null,"Income:",-1),Ze={class:"flex justify-between"},We=e("span",null,"Net Income:",-1),Ke={key:1,class:"w-full lg:w-1/4"},Xe=e("b",null,"Inventory Expense",-1),Ye={class:"flex justify-between"},Je=e("span",null,"Cost of goods sold:",-1),et={class:"flex justify-end"},tt={class:"lg:absolute bottom-0 right-0 lg:p-4 mt-2 space-x-2 float-right"},st=["disabled"],lt=["disabled"],ot={key:1,class:"dark:text-white w-full bg-white dark:bg-zinc-800 text-left text-sm rounded-lg overflow-hidden mt-4"},nt=e("th",{class:"p-4"},"Customer",-1),at={class:"p-4"},it=e("th",{class:"p-4"},"Order Type",-1),rt=e("th",{class:"p-4"},"Orders",-1),dt=e("th",{class:"p-4"},"Quantity",-1),ct=e("th",{class:"p-4"},"Gross Sales",-1),ut=e("th",{class:"p-4"},"Net Income",-1),ht=e("th",{class:"p-4"},"Actions",-1),mt={class:"bg-white dark:bg-zinc-800 border-b border-zinc-700"},ft={class:"px-4 py-2"},vt={class:"px-4 py-2"},bt={key:0,class:"text-xs opacity-70"},xt={class:"px-4 py-2"},_t={class:"px-4 py-2"},pt={class:"px-4 py-2"},gt={class:"px-4 py-2"},wt={class:"px-4 py-2"},yt={class:"px-4 py-2"},$t={class:"flex space-x-2"},kt=["onClick"],Ct=["onClick"],jt={class:"bg-white font-bold dark:bg-zinc-800"},Dt={class:"px-4 py-2"},Ft=e("td",{class:"px-4 py-2"},null,-1),Tt=e("td",{class:"px-4 py-2"},null,-1),It=e("td",{class:"px-4 py-2"},null,-1),Ot=e("td",{class:"px-4 py-2"},null,-1),St={class:"px-4 py-2"},zt={class:"px-4 py-2"},Nt=e("td",{class:"px-4 py-2"},null,-1),At={key:2,class:"flex justify-center mt-14"},Et=e("div",{class:"flex justify-center items-center flex-col text-zinc-700 dark:text-zinc-400"},[e("i",{class:"bx bx-ghost text-7xl"}),e("p",null,"Oohh... It's empty in here.")],-1),Vt=[Et],Lt={class:"dark:text-white p-6"},Mt=e("p",{class:"font-bold"},"Confirmation",-1),Ht=e("p",{class:"mt-4"},"This transaction record will be deleted. Enter the code to continue.",-1),Pt={class:"flex justify-center mt-4 font-bold tracking-wider text-4xl"},Rt={class:"dark:text-white p-4"},qt=e("p",{class:"font-bold"},"Confirmation",-1),Bt=e("p",{class:"mt-4"},"Print this receipt?",-1),Gt={class:"mt-4 grid grid-cols-2 gap-2"},Ut={class:"dark:text-white p-4"},Qt={class:"flex flex-row-reverse gap-4 mt-8"},Zt={key:0,class:"fixed top-0 -left-96"},es={__name:"Sales",props:{transactions:Object,filters:Object,total:Object,batchDates:Object,expenses:Object},setup(s){const d=s,y=N(()=>d.expenses.net.reduce((n,t)=>n+t.amount,0)),u=N(()=>d.expenses.cogs.reduce((n,t)=>n+t.amount,0)),p=(n,t)=>{const l=Math.ceil(n),r=Math.floor(t);return Math.floor(Math.random()*(r-l+1)+l)},$=h(!1),S=h(null),D=h(""),F=h(null),M=n=>{S.value=n,D.value=p(1e5,999999),$.value=!0,Y(()=>F.value.focus())},H=n=>{n==D.value&&I.delete(route("order.cancel",S.value.id),{onStart:()=>F.value.disabled=!0,onSuccess:()=>$.value=!1})},v=d.filters.date?new Date(d.filters.date):new Date,P=v<new Date(new Date().setHours(0,0,0,0)),T=n=>{let t=new Date(n);return Intl.DateTimeFormat("en-PH",{month:"long",day:"numeric",year:"numeric"}).format(t)},R=Z({search:d.filters.search,date:d.filters.date}),b=h({from:"",to:""}),k=h(!1);W(R,n=>{I.get(route("sales"),n,{preserveState:!0,preserveScroll:!0,replace:!0})},{deep:!0});const q=r=>{var r=parseInt(r,10),t=Math.floor(r/3600),l=Math.floor((r-t*3600)/60),r=r-t*3600-l*60;return t?l?`${t}h ${l}m ${r}s`:`${t}h ${r}s`:l?`${l}m ${r}s`:`${r}s`},z=h(!1);K(()=>{let n=navigator.userAgent.toLowerCase();z.value=n.indexOf("android")>-1});const g=h(!1),C=h(null),B=n=>{C.value=n,g.value=!0},G=()=>{const n=document.getElementById("receipt");J(n,{quality:1,scale:2}).then(t=>{console.log(t),z.value&&(window.location.href="rawbt:"+t)}).finally(()=>{g.value=!1,C.value=null})},x=h(1);return(n,t)=>(a(),i(_,null,[c(f(X),null,{default:w(()=>[Se]),_:1}),e("div",ze,[e("div",Ne,[s.filters.advanced===void 0?(a(),i("div",Ae,[e("i",{onClick:t[0]||(t[0]=l=>n.$inertia.get(n.route("sales"),{date:new Date(f(v).setDate(f(v).getDate()-1)).toLocaleDateString("en-PH")})),class:"bx bxs-chevron-left dark:text-white hover:bg-white hover:text-zinc-900 w-6 h-6 inline-flex justify-center items-center rounded-full border dark:border-white"}),e("p",Ee,o(f(v).toWordFormat()),1),P?(a(),i("i",{key:0,onClick:t[1]||(t[1]=l=>n.$inertia.get(n.route("sales"),{date:new Date(f(v).setDate(f(v).getDate()+1)).toLocaleDateString("en-PH")})),class:"bx bxs-chevron-right dark:text-white hover:bg-white hover:text-zinc-900 w-6 h-6 inline-flex justify-center items-center rounded-full border dark:border-white"})):m("",!0)])):(a(),i("span",Ve,o(`${T(s.batchDates.from)} to ${T(s.batchDates.to)}`),1)),e("button",{onClick:t[2]||(t[2]=l=>k.value=!0),class:"text-sm dark:text-white hover:underline hover:text-blue-500 duration-200 ease-in-out"},"Advanced filter")]),s.transactions.length?(a(),i("div",Le,[x.value===1?(a(),i("div",Me,[e("div",He,[Pe,e("b",null,o(s.transactions.length),1)]),e("div",Re,[qe,e("b",null,o(s.total.gross.amountFormat()),1)]),e("div",Be,[Ge,e("b",null,o(s.total.cost.amountFormat()),1)]),e("div",Ue,[Qe,e("b",null,o((s.total.gross-s.total.cost).amountFormat()),1)]),c(V,{title:"Expenses",data:s.expenses.net,total:y.value},null,8,["data","total"]),e("div",Ze,[We,e("b",null,o((s.total.gross-s.total.cost-y.value).amountFormat()),1)])])):m("",!0),x.value===2?(a(),i("div",Ke,[Xe,e("div",Ye,[Je,e("b",null,o(s.total.cost.amountFormat()),1)]),c(V,{title:"Expenses",data:s.expenses.cogs,total:u.value},null,8,["data","total"]),e("div",et,[e("b",null,o((s.total.cost-u.value).amountFormat()),1)])])):m("",!0),e("div",tt,[e("button",{onClick:t[3]||(t[3]=l=>x.value-=1),disabled:x.value===1,class:"bx bxs-chevron-left dark:text-white enabled:hover:bg-white enabled:hover:text-zinc-900 w-6 h-6 inline-flex justify-center items-center rounded-full border dark:border-white disabled:opacity-20"},null,8,st),e("button",{onClick:t[4]||(t[4]=l=>x.value+=1),disabled:x.value===2,class:"bx bxs-chevron-right dark:text-white enabled:hover:bg-white enabled:hover:text-zinc-900 w-6 h-6 inline-flex justify-center items-center rounded-full border dark:border-white disabled:opacity-20"},null,8,lt)])])):m("",!0),s.transactions.length?(a(),i("table",ot,[e("thead",null,[e("tr",null,[nt,e("th",at,o(s.batchDates?"Date":"Time"),1),it,rt,dt,ct,ut,ht])]),e("tbody",null,[(a(!0),i(_,null,j(s.transactions,l=>(a(),i("tr",mt,[e("td",ft,o(l.name??`#${l.number}`),1),e("td",vt,[L(o(s.batchDates?T(l.created_at):new Date(l.created_at).toTimeFormat())+" ",1),s.batchDates?m("",!0):(a(),i("span",bt,o(q(l.elapsed)),1))]),e("td",xt,o(l.type),1),e("td",_t,[e("div",null,[(a(!0),i(_,null,j(l.items,r=>(a(),i("p",null,o(`${r.name} x${r.quantity}`),1))),256))])]),e("td",pt,o(l.quantity),1),e("td",gt,o(l.gross.amountFormat()),1),e("td",wt,o((l.gross-l.cost).amountFormat()),1),e("td",yt,[e("div",$t,[e("i",{onClick:r=>B(l),class:"bx bx-printer dark:text-white inline-flex justify-center items-center p-2 rounded-full bg-green-500 hover:bg-green-700 active:bg-green-900 duration-200 ease-in-out cursor-pointer"},null,8,kt),e("i",{onClick:r=>M(l),class:"bx bx-trash dark:text-white inline-flex justify-center items-center p-2 rounded-full bg-red-500 hover:bg-red-700 active:bg-red-900 duration-200 ease-in-out cursor-pointer"},null,8,Ct)])])]))),256)),e("tr",jt,[e("td",Dt,o(s.transactions.length),1),Ft,Tt,It,Ot,e("td",St,o(s.total.gross.amountFormat()),1),e("td",zt,o((s.total.gross-s.total.cost).amountFormat()),1),Nt])])])):(a(),i("div",At,Vt))]),c(O,{show:$.value,"max-width":"md",onClose:t[6]||(t[6]=l=>$.value=!1)},{default:w(()=>[e("div",Lt,[Mt,Ht,e("div",Pt,o(D.value),1),e("input",{ref_key:"codeInput",ref:F,onKeyup:t[5]||(t[5]=l=>H(l.target.value)),class:"bg-zinc-900 w-full rounded-lg mt-2 disabled:opacity-50",type:"text"},null,544)])]),_:1},8,["show"]),c(O,{show:g.value,onClose:t[8]||(t[8]=l=>g.value=!1)},{default:w(()=>[e("div",Rt,[qt,Bt,e("div",Gt,[e("button",{onClick:G,class:"bg-green-500 rounded-lg py-2 hover:bg-green-600 active:bg-green-800 duration-200 ease-in-out"},"Yes"),e("button",{onClick:t[7]||(t[7]=l=>g.value=!1),class:"bg-zinc-500 rounded-lg py-2 hover:bg-zinc-600 active:bg-zinc-900 duration-200 ease-in-out"},"Cancel")])])]),_:1},8,["show"]),c(O,{show:k.value,onClose:t[13]||(t[13]=l=>k.value=!1),"max-width":"md"},{default:w(()=>[e("div",Ut,[c(A,{for:"from",value:"From"}),c(E,{type:"date",id:"from",modelValue:b.value.from,"onUpdate:modelValue":t[9]||(t[9]=l=>b.value.from=l),class:"w-full mt-2"},null,8,["modelValue"]),c(A,{class:"mt-4",for:"to",value:"To"}),c(E,{type:"date",id:"to",modelValue:b.value.to,"onUpdate:modelValue":t[10]||(t[10]=l=>b.value.to=l),class:"w-full mt-2"},null,8,["modelValue"]),e("div",Qt,[e("button",{onClick:t[11]||(t[11]=l=>f(I).get(n.route("sales"),{advanced:{from:b.value.from,to:b.value.to}})),class:"text-white rounded-lg bg-green-500 hover:bg-green-600 active:bg-green-800 duration-200 ease-in-out px-6 py-2 text-sm"},"Submit"),e("button",{onClick:t[12]||(t[12]=l=>k.value=!1),class:"dark:text-white hover:underline text-sm"},"Cancel")])])]),_:1},8,["show"]),C.value?(a(),i("div",Zt,[c(Te,{receipt:C.value,id:"receipt"},null,8,["receipt"])])):m("",!0)],64))}};export{es as default};
