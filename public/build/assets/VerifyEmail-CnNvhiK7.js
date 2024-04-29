import{T as f,h as m,o as i,c as g,w as s,a as o,u as e,Z as y,f as p,g as h,b as a,d as r,n as _,j as k,e as x}from"./app-DZUnaK7f.js";import{_ as v}from"./GuestLayout-gj16ZyQQ.js";import{P as b}from"./PrimaryButton-DHojx-c6.js";const w=a("div",{class:"mb-4 text-sm text-gray-600 dark:text-gray-400"}," Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another. ",-1),V={key:0,class:"mb-4 font-medium text-sm text-green-600 dark:text-green-400"},B={class:"mt-4 flex items-center justify-between"},S={__name:"VerifyEmail",props:{status:{type:String}},setup(n){const d=n,t=f({}),c=()=>{t.post(route("verification.send"))},u=m(()=>d.status==="verification-link-sent");return(l,E)=>(i(),g(v,null,{default:s(()=>[o(e(y),{title:"Email Verification"}),w,u.value?(i(),p("div",V," A new verification link has been sent to the email address you provided during registration. ")):h("",!0),a("form",{onSubmit:x(c,["prevent"])},[a("div",B,[o(b,{class:_({"opacity-25":e(t).processing}),disabled:e(t).processing},{default:s(()=>[r(" Resend Verification Email ")]),_:1},8,["class","disabled"]),o(e(k),{href:l.route("logout"),method:"post",as:"button",class:"underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"},{default:s(()=>[r("Log Out")]),_:1},8,["href"])])],32)]),_:1}))}};export{S as default};
