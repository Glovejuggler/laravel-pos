import{T as j,r as g,o as n,f as a,a as i,w as $,u as s,b as t,g as x,i as B,p as S,F as c,k as m,q as h,e as I,Z as N,t as A}from"./app-CSWhIuK6.js";import{_ as b}from"./InputLabel-rJmnkBSU.js";import{_ as p}from"./TextInput-CvdhWDxA.js";import{c as f}from"./colors-BDFfBvXk.js";const D=t("title",null,`
            Add new item
        `,-1),F={class:"max-w-screen-lg mx-auto mt-8"},L=t("p",{class:"dark:text-white mb-8"},"New item",-1),R={class:"grid grid-cols-3 gap-4"},M={key:0,class:"bx bx-plus font-bold text-3xl dark:text-white"},O=["src"],P={class:"flex mt-2"},T=["value"],q={class:"col-span-2 p-6 rounded-lg bg-white dark:bg-zinc-800 h-min"},E=t("p",{class:"block font-medium text-sm text-zinc-700 dark:text-zinc-300 mt-4 select-none"},"Breakdown of cost",-1),Z=["onClick"],G=t("div",{class:"flex justify-end"},[t("button",{"type-":"submit",class:"rounded-lg px-4 py-2 bg-green-500 hover:bg-green-700 active:bg-green-900 text-white text-sm duration-200 ease-in-out"},"Save")],-1),H={id:"costings"},J=["value"],Y={__name:"Create",props:{suggestions:Object},setup(_){const y=Object.keys(f).filter(r=>typeof f[r]=="object"),V=new URLSearchParams(window.location.search),l=j({category_id:V.get("category"),image:"",name:"",price:"",color:"",breakdown:[]}),w=g(""),k=g(null),v=g(null),C=()=>{if(l.image){let r=new FileReader;r.readAsDataURL(l.image),r.onload=o=>{v.value=o.target.result}}},z=()=>{l.breakdown.push({name:"",cost:""})},U=r=>{l.breakdown.splice(r,1)};return(r,o)=>(n(),a(c,null,[i(s(N),null,{default:$(()=>[D]),_:1}),t("div",F,[L,t("div",R,[t("div",null,[t("div",{onClick:o[0]||(o[0]=e=>k.value.click()),class:"h-72 w-72 rounded-lg overflow-hidden bg-white dark:bg-zinc-700 flex justify-center items-center"},[s(l).image?x("",!0):(n(),a("i",M)),s(l).image?(n(),a("img",{key:1,src:v.value,class:"w-72 h-72 object-cover",alt:""},null,8,O)):x("",!0)]),i(b,{class:"mt-4",for:"color",value:"Color"}),t("div",P,[B(t("select",{"onUpdate:modelValue":o[1]||(o[1]=e=>s(l).color=e),id:"color",name:"color",onChange:o[2]||(o[2]=e=>w.value=e.target.value),class:"rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 dark:text-white"},[(n(!0),a(c,null,m(s(y),e=>(n(),a(c,null,[(n(!0),a(c,null,m(s(f)[e],d=>(n(),a("option",{style:h(`background: ${d} !important`),value:d},A(d),13,T))),256))],64))),256))],544),[[S,s(l).color]]),t("div",{class:"w-10 h-10 ml-4",style:h(`background-color: ${w.value} !important`)},null,4)])]),t("div",q,[t("form",{onSubmit:o[6]||(o[6]=I(e=>s(l).post(r.route("items.store")),["prevent"]))},[t("input",{ref_key:"newImage",ref:k,onInput:o[3]||(o[3]=e=>s(l).image=e.target.files[0]),onChange:C,type:"file",accept:"image/*",hidden:""},null,544),i(b,{for:"name",value:"Name"}),i(p,{id:"name",type:"text",modelValue:s(l).name,"onUpdate:modelValue":o[4]||(o[4]=e=>s(l).name=e),class:"mt-2 w-full block"},null,8,["modelValue"]),i(b,{class:"mt-4",for:"price",value:"Price"}),i(p,{id:"price",type:"number",modelValue:s(l).price,"onUpdate:modelValue":o[5]||(o[5]=e=>s(l).price=e),class:"mt-2 w-full block"},null,8,["modelValue"]),E,(n(!0),a(c,null,m(s(l).breakdown,(e,d)=>(n(),a("div",{key:d,class:"grid grid-cols-11 gap-2 m-2"},[i(p,{list:"costings",type:"text",modelValue:e.name,"onUpdate:modelValue":u=>e.name=u,class:"w-full block col-span-5",placeholder:"Item"},null,8,["modelValue","onUpdate:modelValue"]),i(p,{type:"number",modelValue:e.cost,"onUpdate:modelValue":u=>e.cost=u,class:"w-full block col-span-5",placeholder:"Cost"},null,8,["modelValue","onUpdate:modelValue"]),t("i",{onClick:u=>U(d),class:"bx bx-x p-2 w-8 h-8 rounded-lg text-white bg-red-500 hover:bg-red-700 duration-200 ease-in-out inline-flex justify-center items-center"},null,8,Z)]))),128)),t("button",{type:"button",class:"text-xs px-4 py-1 rounded-lg bg-zinc-400 text-white",onClick:z},"Add"),G],32)])])]),t("datalist",H,[(n(!0),a(c,null,m(_.suggestions,e=>(n(),a("option",{value:e},null,8,J))),256))])],64))}};export{Y as default};
