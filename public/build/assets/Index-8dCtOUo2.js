import{r as g,T as x,o as s,f as n,a as u,w as m,u as i,b as e,F as f,k as _,g as p,m as y,Z as k,c as C,d as $,t as b,n as j,j as V,p as z}from"./app-sKgxWZtw.js";import{_ as N}from"./Modal-BSrcIB5W.js";import{_ as I}from"./TextInput-CmWWfRCa.js";const B=e("title",null,`
            Items
        `,-1),F={class:"max-w-screen-lg flex mx-auto mt-8"},S={class:"w-1/6 bg-white dark:bg-zinc-800 py-4 rounded-lg h-min"},O=e("span",null,"Categories",-1),T=e("hr",{class:"border-zinc-600 mt-1"},null,-1),E={class:"w-5/6 ml-4 p-4 dark:text-white"},K={key:0,class:"flex items-center"},A=e("span",{class:"font-semibold mr-8"},"Items",-1),D={class:"grid grid-cols-4 gap-2"},L=["onClick"],M={class:"bg-zinc-500"},U=["src"],Z={class:"bg-zinc-800 p-4 rounded-b-lg"},q={class:"p-6"},G=e("p",{class:"dark:text-white font-semibold"},"Add Category",-1),R={__name:"Index",props:{items:Object,categories:Object,category:Object},setup(l){const c=g(!1),d=g(null),w=()=>{c.value=!0,y(()=>d.value.focus())},h=()=>{c.value=!1,a.reset()},v=()=>{a.post(route("categories.store"),{preserveScroll:!0,preserveState:!1,onSuccess:()=>h,onError:()=>d.value.focus(),onFinish:()=>a.reset()})},a=x({name:""});return(o,r)=>(s(),n(f,null,[u(i(k),null,{default:m(()=>[B]),_:1}),e("div",F,[e("div",S,[e("div",{class:"flex justify-between items-center px-4 dark:text-white"},[O,e("i",{onClick:w,class:"bx bx-plus rounded-full hover:bg-white/20 w-8 h-8 inline-flex justify-center items-center duration-200 ease-in-out"})]),T,(s(!0),n(f,null,_(l.categories,t=>(s(),C(i(V),{href:o.route("items.index",t),class:j([{"bg-blue-500 hover:bg-blue-500":o.$page.url===`/items/${t.name}`},"dark:text-white hover:bg-zinc-700 px-4 py-2 block duration-200 ease-in-out"])},{default:m(()=>[$(b(t.name),1)]),_:2},1032,["href","class"]))),256))]),e("div",E,[l.category?(s(),n("div",K,[A,e("i",{onClick:r[0]||(r[0]=t=>o.$inertia.get(o.route("items.create"),{category:l.category.id})),class:"bx bx-plus rounded-full hover:bg-white/20 w-8 h-8 inline-flex justify-center items-center duration-200 ease-in-out"})])):p("",!0),e("div",D,[(s(!0),n(f,null,_(l.items,t=>(s(),n("div",{onClick:H=>o.$inertia.get(o.route("items.show",t.id)),class:"flex flex-col rounded-lg overflow-hidden"},[e("div",M,[t.pic?(s(),n("img",{key:0,src:`../storage/${t.pic}`},null,8,U)):p("",!0)]),e("div",Z,b(t.name),1)],8,L))),256))])])]),u(N,{show:c.value,onClose:h},{default:m(()=>[e("div",q,[G,u(I,{ref_key:"newCatInput",ref:d,class:"mt-2 block w-full",type:"text",modelValue:i(a).name,"onUpdate:modelValue":r[1]||(r[1]=t=>i(a).name=t),placeholder:"Category",onKeyup:z(v,["enter"])},null,8,["modelValue"])])]),_:1},8,["show"])],64))}};export{R as default};
