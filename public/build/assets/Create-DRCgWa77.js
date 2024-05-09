import{m as E,T as I,r as k,o as s,f as i,a as b,w as O,u as c,b as o,g as B,e as P,F as w,k as C,p as S,Z as R,t as j}from"./app-BSNCUad3.js";import{_ as G}from"./InputLabel-DSGHmROU.js";import{_ as x}from"./TextInput-GWskHi-R.js";var U={},z={},A={exports:{}},a=String,M=function(){return{isColorSupported:!1,reset:a,bold:a,dim:a,italic:a,underline:a,inverse:a,hidden:a,strikethrough:a,black:a,red:a,green:a,yellow:a,blue:a,magenta:a,cyan:a,white:a,gray:a,bgBlack:a,bgRed:a,bgGreen:a,bgYellow:a,bgBlue:a,bgMagenta:a,bgCyan:a,bgWhite:a}};A.exports=M();A.exports.createColors=M;var N=A.exports;(function(m){var _={};Object.defineProperty(m,"__esModule",{value:!0});function v(t,l){for(var d in l)Object.defineProperty(t,d,{enumerable:!0,get:l[d]})}v(m,{dim:function(){return u},default:function(){return y}});const e=p(N);function p(t){return t&&t.__esModule?t:{default:t}}function n(t,l,d){typeof process<"u"&&_.JEST_WORKER_ID||(console.warn(""),l.forEach(f=>console.warn(t,"-",f)))}function u(t){return e.default.dim(t)}const y={info(t,l){n(e.default.bold(e.default.cyan("info")),...Array.isArray(t)?[t]:[l,t])},warn(t,l){n(e.default.bold(e.default.yellow("warn")),...Array.isArray(t)?[t]:[l,t])},risk(t,l){n(e.default.bold(e.default.magenta("risk")),...Array.isArray(t)?[t]:[l,t])}}})(z);(function(m){Object.defineProperty(m,"__esModule",{value:!0}),Object.defineProperty(m,"default",{enumerable:!0,get:function(){return p}});const _=v(z);function v(n){return n&&n.__esModule?n:{default:n}}function e({version:n,from:u,to:y}){_.default.warn(`${u}-color-renamed`,[`As of Tailwind CSS ${n}, \`${u}\` has been renamed to \`${y}\`.`,"Update your configuration file to silence this warning."])}const p={inherit:"inherit",current:"currentColor",transparent:"transparent",black:"#000",white:"#fff",slate:{50:"#f8fafc",100:"#f1f5f9",200:"#e2e8f0",300:"#cbd5e1",400:"#94a3b8",500:"#64748b",600:"#475569",700:"#334155",800:"#1e293b",900:"#0f172a",950:"#020617"},gray:{50:"#f9fafb",100:"#f3f4f6",200:"#e5e7eb",300:"#d1d5db",400:"#9ca3af",500:"#6b7280",600:"#4b5563",700:"#374151",800:"#1f2937",900:"#111827",950:"#030712"},zinc:{50:"#fafafa",100:"#f4f4f5",200:"#e4e4e7",300:"#d4d4d8",400:"#a1a1aa",500:"#71717a",600:"#52525b",700:"#3f3f46",800:"#27272a",900:"#18181b",950:"#09090b"},neutral:{50:"#fafafa",100:"#f5f5f5",200:"#e5e5e5",300:"#d4d4d4",400:"#a3a3a3",500:"#737373",600:"#525252",700:"#404040",800:"#262626",900:"#171717",950:"#0a0a0a"},stone:{50:"#fafaf9",100:"#f5f5f4",200:"#e7e5e4",300:"#d6d3d1",400:"#a8a29e",500:"#78716c",600:"#57534e",700:"#44403c",800:"#292524",900:"#1c1917",950:"#0c0a09"},red:{50:"#fef2f2",100:"#fee2e2",200:"#fecaca",300:"#fca5a5",400:"#f87171",500:"#ef4444",600:"#dc2626",700:"#b91c1c",800:"#991b1b",900:"#7f1d1d",950:"#450a0a"},orange:{50:"#fff7ed",100:"#ffedd5",200:"#fed7aa",300:"#fdba74",400:"#fb923c",500:"#f97316",600:"#ea580c",700:"#c2410c",800:"#9a3412",900:"#7c2d12",950:"#431407"},amber:{50:"#fffbeb",100:"#fef3c7",200:"#fde68a",300:"#fcd34d",400:"#fbbf24",500:"#f59e0b",600:"#d97706",700:"#b45309",800:"#92400e",900:"#78350f",950:"#451a03"},yellow:{50:"#fefce8",100:"#fef9c3",200:"#fef08a",300:"#fde047",400:"#facc15",500:"#eab308",600:"#ca8a04",700:"#a16207",800:"#854d0e",900:"#713f12",950:"#422006"},lime:{50:"#f7fee7",100:"#ecfccb",200:"#d9f99d",300:"#bef264",400:"#a3e635",500:"#84cc16",600:"#65a30d",700:"#4d7c0f",800:"#3f6212",900:"#365314",950:"#1a2e05"},green:{50:"#f0fdf4",100:"#dcfce7",200:"#bbf7d0",300:"#86efac",400:"#4ade80",500:"#22c55e",600:"#16a34a",700:"#15803d",800:"#166534",900:"#14532d",950:"#052e16"},emerald:{50:"#ecfdf5",100:"#d1fae5",200:"#a7f3d0",300:"#6ee7b7",400:"#34d399",500:"#10b981",600:"#059669",700:"#047857",800:"#065f46",900:"#064e3b",950:"#022c22"},teal:{50:"#f0fdfa",100:"#ccfbf1",200:"#99f6e4",300:"#5eead4",400:"#2dd4bf",500:"#14b8a6",600:"#0d9488",700:"#0f766e",800:"#115e59",900:"#134e4a",950:"#042f2e"},cyan:{50:"#ecfeff",100:"#cffafe",200:"#a5f3fc",300:"#67e8f9",400:"#22d3ee",500:"#06b6d4",600:"#0891b2",700:"#0e7490",800:"#155e75",900:"#164e63",950:"#083344"},sky:{50:"#f0f9ff",100:"#e0f2fe",200:"#bae6fd",300:"#7dd3fc",400:"#38bdf8",500:"#0ea5e9",600:"#0284c7",700:"#0369a1",800:"#075985",900:"#0c4a6e",950:"#082f49"},blue:{50:"#eff6ff",100:"#dbeafe",200:"#bfdbfe",300:"#93c5fd",400:"#60a5fa",500:"#3b82f6",600:"#2563eb",700:"#1d4ed8",800:"#1e40af",900:"#1e3a8a",950:"#172554"},indigo:{50:"#eef2ff",100:"#e0e7ff",200:"#c7d2fe",300:"#a5b4fc",400:"#818cf8",500:"#6366f1",600:"#4f46e5",700:"#4338ca",800:"#3730a3",900:"#312e81",950:"#1e1b4b"},violet:{50:"#f5f3ff",100:"#ede9fe",200:"#ddd6fe",300:"#c4b5fd",400:"#a78bfa",500:"#8b5cf6",600:"#7c3aed",700:"#6d28d9",800:"#5b21b6",900:"#4c1d95",950:"#2e1065"},purple:{50:"#faf5ff",100:"#f3e8ff",200:"#e9d5ff",300:"#d8b4fe",400:"#c084fc",500:"#a855f7",600:"#9333ea",700:"#7e22ce",800:"#6b21a8",900:"#581c87",950:"#3b0764"},fuchsia:{50:"#fdf4ff",100:"#fae8ff",200:"#f5d0fe",300:"#f0abfc",400:"#e879f9",500:"#d946ef",600:"#c026d3",700:"#a21caf",800:"#86198f",900:"#701a75",950:"#4a044e"},pink:{50:"#fdf2f8",100:"#fce7f3",200:"#fbcfe8",300:"#f9a8d4",400:"#f472b6",500:"#ec4899",600:"#db2777",700:"#be185d",800:"#9d174d",900:"#831843",950:"#500724"},rose:{50:"#fff1f2",100:"#ffe4e6",200:"#fecdd3",300:"#fda4af",400:"#fb7185",500:"#f43f5e",600:"#e11d48",700:"#be123c",800:"#9f1239",900:"#881337",950:"#4c0519"},get lightBlue(){return e({version:"v2.2",from:"lightBlue",to:"sky"}),this.sky},get warmGray(){return e({version:"v3.0",from:"warmGray",to:"stone"}),this.stone},get trueGray(){return e({version:"v3.0",from:"trueGray",to:"neutral"}),this.neutral},get coolGray(){return e({version:"v3.0",from:"coolGray",to:"gray"}),this.gray},get blueGray(){return e({version:"v3.0",from:"blueGray",to:"slate"}),this.slate}}})(U);let V=U;var D=(V.__esModule?V:{default:V}).default;const $=E(D),F=o("title",null,`
            Add new item
        `,-1),T={class:"max-w-screen-lg mx-auto mt-8"},L=o("p",{class:"dark:text-white mb-8"},"New item",-1),q={class:"grid grid-cols-3 gap-4"},W={key:0,class:"bx bx-plus font-bold text-3xl text-white"},J=["src"],K={class:"col-span-2 p-6 rounded-lg bg-zinc-800"},Y={class:"flex"},Z=["value"],H=o("p",{class:"block font-medium text-sm text-zinc-700 dark:text-zinc-300 mt-4 select-none"},"Breakdown of cost",-1),Q=["onClick"],X=o("div",{class:"flex justify-end"},[o("button",{"type-":"submit",class:"rounded-lg px-4 py-2 bg-green-500 hover:bg-green-700 active:bg-green-900 text-white text-sm duration-200 ease-in-out"},"Save")],-1),f0={__name:"Create",setup(m){const _=Object.keys($).filter(d=>typeof $[d]=="object"),v=new URLSearchParams(window.location.search),e=I({category_id:v.get("category"),image:"",name:"",price:"",breakdown:[]}),p=k(""),n=k(null),u=k(null),y=()=>{if(e.image){let d=new FileReader;d.readAsDataURL(e.image),d.onload=f=>{u.value=f.target.result}}},t=()=>{e.breakdown.push({name:"",cost:""})},l=d=>{e.breakdown.splice(d,1)};return(d,f)=>(s(),i(w,null,[b(c(R),null,{default:O(()=>[F]),_:1}),o("div",T,[L,o("div",q,[o("div",{onClick:f[0]||(f[0]=r=>n.value.click()),class:"h-72 w-72 rounded-lg overflow-hidden bg-zinc-700 flex justify-center items-center"},[c(e).image?B("",!0):(s(),i("i",W)),c(e).image?(s(),i("img",{key:1,src:u.value,class:"w-72 h-72 object-cover",alt:""},null,8,J)):B("",!0)]),o("div",K,[o("form",{onSubmit:f[5]||(f[5]=P(r=>c(e).post(d.route("items.store")),["prevent"]))},[o("input",{ref_key:"newImage",ref:n,onInput:f[1]||(f[1]=r=>c(e).image=r.target.files[0]),onChange:y,type:"file",accept:"image/*",hidden:""},null,544),o("div",Y,[o("select",{name:"color",onChange:f[2]||(f[2]=r=>p.value=r.target.value)},[(s(!0),i(w,null,C(c(_),r=>(s(),i(w,null,[(s(!0),i(w,null,C(c($)[r],g=>(s(),i("option",{style:S(`background: ${g} !important`),value:g},j(g),13,Z))),256))],64))),256))],32),o("div",{class:"w-5 h-5",style:S(`background-color: ${p.value} !important`)},null,4)]),b(G,{for:"name",value:"Name"}),b(x,{id:"name",type:"text",modelValue:c(e).name,"onUpdate:modelValue":f[3]||(f[3]=r=>c(e).name=r),class:"mt-2 w-full block"},null,8,["modelValue"]),b(G,{class:"mt-4",for:"price",value:"Price"}),b(x,{id:"price",type:"number",modelValue:c(e).price,"onUpdate:modelValue":f[4]||(f[4]=r=>c(e).price=r),class:"mt-2 w-full block"},null,8,["modelValue"]),H,(s(!0),i(w,null,C(c(e).breakdown,(r,g)=>(s(),i("div",{key:g,class:"grid grid-cols-11 gap-2 m-2"},[b(x,{type:"text",modelValue:r.name,"onUpdate:modelValue":h=>r.name=h,class:"w-full block col-span-5",placeholder:"Item"},null,8,["modelValue","onUpdate:modelValue"]),b(x,{type:"number",modelValue:r.cost,"onUpdate:modelValue":h=>r.cost=h,class:"w-full block col-span-5",placeholder:"Cost"},null,8,["modelValue","onUpdate:modelValue"]),o("i",{onClick:h=>l(g),class:"bx bx-x p-2 w-8 h-8 rounded-lg text-white bg-red-500 hover:bg-red-700 duration-200 ease-in-out inline-flex justify-center items-center"},null,8,Q)]))),128)),o("button",{type:"button",class:"text-xs px-4 py-1 rounded-lg bg-zinc-400 text-white",onClick:t},"Add"),X],32)])])])],64))}};export{f0 as default};