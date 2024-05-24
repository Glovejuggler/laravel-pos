import{r as i,T as V,o as n,f as a,a as r,w as h,u as d,b as e,F as C,k as j,g as E,s as F,Z as K,e as y,n as O,t as k,l as I}from"./app-Dk50twIb.js";import{_ as x}from"./Modal-BGeoJb9Y.js";import{_ as z}from"./TextInput-7H9RoEsX.js";const A=e("title",null,`
            Items
        `,-1),U={class:"max-w-screen-lg flex mx-auto mt-8"},L={class:"w-1/6 bg-white dark:bg-zinc-800 py-4 rounded-lg h-min"},P=e("span",null,"Categories",-1),Z=e("hr",{class:"border-zinc-600 mt-1"},null,-1),q=["onClick"],G={class:"invisible group-hover:visible space-x-2"},H=["onClick"],J=["onClick"],Q={class:"w-5/6 px-4 dark:text-white"},R={key:0,class:"flex items-center mb-4"},W=e("span",{class:"font-semibold mr-8"},"Products",-1),X={class:"grid grid-cols-4 gap-2"},Y=["onClick"],ee={class:"bg-zinc-500"},te=["src"],se={class:"bg-white dark:bg-zinc-800 p-4 rounded-b-lg"},oe={class:"p-6"},le=e("p",{class:"dark:text-white font-semibold"},"Add Category",-1),ne={class:"p-6"},ae=e("p",{class:"dark:text-white font-semibold"},"Edit Category",-1),ie={class:"p-6 dark:text-white"},re=e("p",{class:"font-semibold"},"Confirmation",-1),ce={class:"mt-2"},de=e("p",{class:"sm italic text-red-500"},"This action cannot be undone",-1),ue={class:"mt-4 flex justify-end space-x-2"},ve={__name:"Index",props:{items:Object,categories:Object,category:Object},setup(u){const p=i(!1),v=i(null),M=()=>{p.value=!0,F(()=>v.value.focus())},$=()=>{p.value=!1,c.reset()},N=()=>{c.post(route("categories.store"),{preserveScroll:!0,preserveState:!1,onSuccess:()=>$,onError:()=>v.value.focus(),onFinish:()=>c.reset()})},f=i(!1),g=i(null),D=s=>{o.name=s.name,o.id=s.id,f.value=!0,F(()=>g.value.focus())},S=()=>{f.value=!1,o.reset()},T=()=>{o.put(route("categories.update",o.id),{preserveScroll:!0,preserveState:!1,onSuccess:()=>S,onError:()=>g.value.focus(),onFinish:()=>o.reset()})},b=i(!1),m=i(null),B=s=>{m.value=s,b.value=!0},_=()=>{b.value=!1,m.value=null},c=V({name:""}),o=V({name:"",id:""});return(s,l)=>(n(),a(C,null,[r(d(K),null,{default:h(()=>[A]),_:1}),e("div",U,[e("div",L,[e("div",{class:"flex justify-between items-center px-4 dark:text-white"},[P,e("i",{onClick:M,class:"bx bx-plus rounded-full hover:bg-black/20 dark:hover:bg-white/20 w-8 h-8 inline-flex justify-center items-center duration-200 ease-in-out"})]),Z,(n(!0),a(C,null,j(u.categories,t=>(n(),a("div",{onClick:y(w=>s.$inertia.get(s.route("items.index",t)),["stop"]),class:O([{"bg-blue-500 hover:bg-blue-500 font-bold text-white":s.$page.url.replace("%20"," ")===`/items/${t.name}`},"dark:text-white px-4 py-2 duration-200 ease-in-out flex justify-between group cursor-pointer"])},[e("span",null,k(t.name),1),e("div",G,[e("i",{class:"bx bx-edit opacity-70 hover:opacity-100",onClick:y(w=>D(t),["stop"])},null,8,H),e("i",{class:"bx bx-trash opacity-70 hover:opacity-100",onClick:y(w=>B(t),["stop"])},null,8,J)])],10,q))),256))]),e("div",Q,[u.category?(n(),a("div",R,[W,e("i",{onClick:l[0]||(l[0]=t=>s.$inertia.get(s.route("items.create"),{category:u.category.id})),class:"bx bx-plus rounded-full hover:bg-black/20 dark:hover:bg-white/20 w-8 h-8 inline-flex justify-center items-center duration-200 ease-in-out"})])):E("",!0),e("div",X,[(n(!0),a(C,null,j(u.items,t=>(n(),a("div",{onClick:w=>s.$inertia.get(s.route("items.show",t.id)),class:"flex flex-col rounded-lg overflow-hidden"},[e("div",ee,[t.pic?(n(),a("img",{key:0,src:`../storage/${t.pic}`},null,8,te)):E("",!0)]),e("div",se,k(t.name),1)],8,Y))),256))])])]),r(x,{show:p.value,onClose:$},{default:h(()=>[e("div",oe,[le,r(z,{ref_key:"newCatInput",ref:v,class:"mt-2 block w-full",type:"text",modelValue:d(c).name,"onUpdate:modelValue":l[1]||(l[1]=t=>d(c).name=t),placeholder:"Category",onKeyup:I(N,["enter"])},null,8,["modelValue"])])]),_:1},8,["show"]),r(x,{show:f.value,onClose:S},{default:h(()=>[e("div",ne,[ae,r(z,{ref_key:"editCatInput",ref:g,class:"mt-2 block w-full",type:"text",modelValue:d(o).name,"onUpdate:modelValue":l[2]||(l[2]=t=>d(o).name=t),placeholder:"Category",onKeyup:I(T,["enter"])},null,8,["modelValue"])])]),_:1},8,["show"]),r(x,{show:b.value,onClose:_},{default:h(()=>[e("div",ie,[re,e("p",ce,"Are you sure you want to delete this category: "+k(m.value.name)+"?",1),de,e("div",ue,[e("button",{onClick:_,class:"hover:underline"},"Cancel"),e("button",{onClick:l[3]||(l[3]=t=>s.$inertia.delete(s.route("categories.destroy",m.value),{preserveScroll:!0,preserveState:!1,onSuccess:()=>_})),class:"px-4 py-2 text-sm text-white bg-red-500 hover:bg-red-700 active:bg-red-900 duration-200 ease-in-out"},"Delete")])])]),_:1},8,["show"])],64))}};export{ve as default};