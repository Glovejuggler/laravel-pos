import{A as f,y as w,L as v,h,o as x,c as p,a as o,w as l,i as n,J as c,b as a,I as i,n as b,m as g,g as k,M as _}from"./app-CLi9EHbr.js";const z={class:"fixed inset-0 overflow-y-auto px-4 py-6 sm:px-0 z-50 flex justify-center items-center","scroll-region":""},B=a("div",{class:"absolute inset-0 bg-zinc-500 dark:bg-zinc-900 opacity-75"},null,-1),C=[B],M={__name:"Modal",props:{show:{type:Boolean,default:!1},maxWidth:{type:String,default:"2xl"},closeable:{type:Boolean,default:!0}},emits:["close"],setup(e,{emit:m}){const s=e,u=m;f(()=>s.show,()=>{s.show?document.body.style.overflow="hidden":document.body.style.overflow=null});const r=()=>{s.closeable&&u("close")},d=t=>{t.key==="Escape"&&s.show&&r()};w(()=>document.addEventListener("keydown",d)),v(()=>{document.removeEventListener("keydown",d),document.body.style.overflow=null});const y=h(()=>({sm:"sm:max-w-sm",md:"sm:max-w-md",lg:"sm:max-w-lg",xl:"sm:max-w-xl","2xl":"sm:max-w-2xl"})[s.maxWidth]);return(t,E)=>(x(),p(_,{to:"body"},[o(i,{"leave-active-class":"duration-200"},{default:l(()=>[n(a("div",z,[o(i,{"enter-active-class":"ease-out duration-300","enter-from-class":"opacity-0","enter-to-class":"opacity-100","leave-active-class":"ease-in duration-200","leave-from-class":"opacity-100","leave-to-class":"opacity-0"},{default:l(()=>[n(a("div",{class:"fixed inset-0 transform transition-all",onClick:r},C,512),[[c,e.show]])]),_:1}),o(i,{"enter-active-class":"ease-out duration-300","enter-from-class":"opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95","enter-to-class":"opacity-100 translate-y-0 sm:scale-100","leave-active-class":"ease-in duration-200","leave-from-class":"opacity-100 translate-y-0 sm:scale-100","leave-to-class":"opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"},{default:l(()=>[n(a("div",{class:b(["mb-6 bg-white dark:bg-zinc-800 rounded-lg overflow-hidden shadow-xl transform transition-all sm:w-full sm:mx-auto",y.value])},[e.show?g(t.$slots,"default",{key:0}):k("",!0)],2),[[c,e.show]])]),_:3})],512),[[c,e.show]])]),_:3})]))}};export{M as _};