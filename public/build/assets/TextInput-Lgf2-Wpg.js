import{M as u,r as i,y as s,i as d,G as l,o as c,f as p}from"./app-DSE2oIDd.js";const b={__name:"TextInput",props:{modelValue:{type:String,required:!0},modelModifiers:{}},emits:["update:modelValue"],setup(t,{expose:r}){const o=u(t,"modelValue"),e=i(null);return s(()=>{e.value.hasAttribute("autofocus")&&e.value.focus()}),r({focus:()=>e.value.focus()}),(f,n)=>d((c(),p("input",{class:"[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none border-zinc-300 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm","onUpdate:modelValue":n[0]||(n[0]=a=>o.value=a),step:"0.01",ref_key:"input",ref:e},null,512)),[[l,o.value]])}};export{b as _};
