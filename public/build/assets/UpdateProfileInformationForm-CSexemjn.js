import{Q as _,T as h,o as r,f as l,b as s,a,u as e,d as m,w as d,i as k,E as g,g as f,G as y,e as z,j as V}from"./app-sKgxWZtw.js";import{_ as p}from"./InputError-B0-pvvMc.js";import{_ as v}from"./InputLabel-aQDm5JLU.js";import{P as b}from"./PrimaryButton-BhKy97ke.js";import{_ as x}from"./TextInput-CmWWfRCa.js";const w=s("header",null,[s("h2",{class:"text-lg font-medium text-zinc-900 dark:text-zinc-100"},"Profile Information"),s("p",{class:"mt-1 text-sm text-zinc-600 dark:text-zinc-400"}," Update your account's profile information and email address. ")],-1),S={key:0},B={class:"text-sm mt-2 text-zinc-800 dark:text-zinc-200"},E={class:"mt-2 font-medium text-sm text-green-600 dark:text-green-400"},N={class:"flex items-center gap-4"},P={key:0,class:"text-sm text-zinc-600 dark:text-zinc-400"},I={__name:"UpdateProfileInformationForm",props:{mustVerifyEmail:{type:Boolean},status:{type:String}},setup(u){const n=_().props.auth.user,t=h({name:n.name,email:n.email});return(c,i)=>(r(),l("section",null,[w,s("form",{onSubmit:i[2]||(i[2]=z(o=>e(t).patch(c.route("profile.update")),["prevent"])),class:"mt-6 space-y-6"},[s("div",null,[a(v,{for:"name",value:"Name"}),a(x,{id:"name",type:"text",class:"mt-1 block w-full",modelValue:e(t).name,"onUpdate:modelValue":i[0]||(i[0]=o=>e(t).name=o),required:"",autofocus:"",autocomplete:"name"},null,8,["modelValue"]),a(p,{class:"mt-2",message:e(t).errors.name},null,8,["message"])]),s("div",null,[a(v,{for:"email",value:"Email"}),a(x,{id:"email",type:"email",class:"mt-1 block w-full",modelValue:e(t).email,"onUpdate:modelValue":i[1]||(i[1]=o=>e(t).email=o),required:"",autocomplete:"username"},null,8,["modelValue"]),a(p,{class:"mt-2",message:e(t).errors.email},null,8,["message"])]),u.mustVerifyEmail&&e(n).email_verified_at===null?(r(),l("div",S,[s("p",B,[m(" Your email address is unverified. "),a(e(V),{href:c.route("verification.send"),method:"post",as:"button",class:"underline text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-zinc-800"},{default:d(()=>[m(" Click here to re-send the verification email. ")]),_:1},8,["href"])]),k(s("div",E," A new verification link has been sent to your email address. ",512),[[g,u.status==="verification-link-sent"]])])):f("",!0),s("div",N,[a(b,{disabled:e(t).processing},{default:d(()=>[m("Save")]),_:1},8,["disabled"]),a(y,{"enter-active-class":"transition ease-in-out","enter-from-class":"opacity-0","leave-active-class":"transition ease-in-out","leave-to-class":"opacity-0"},{default:d(()=>[e(t).recentlySuccessful?(r(),l("p",P,"Saved.")):f("",!0)]),_:1})])],32)]))}};export{I as default};
