import{o as s,f as o,a as l,w as c,u as r,b as t,F as d,k as i,t as e,Z as _}from"./app-3FfzWDb5.js";const u=t("title",null,`
        Inventory Costing
    `,-1),h={class:"max-w-2xl mx-auto py-8"},p={class:"border dark:border-zinc-700 rounded-lg"},b={class:"w-full table bg-white dark:bg-zinc-900 dark:text-white rounded-lg overflow-hidden"},g=t("thead",{class:"text-left"},[t("tr",null,[t("th",{class:"px-4 py-2"},"Inventory"),t("th",{class:"px-4 py-2"},"Cost")])],-1),m={class:"dark:odd:bg-zinc-800 odd:bg-zinc-200"},x={class:"px-4 py-2"},y={class:"px-4 py-2"},f={class:"font-bold dark:odd:bg-zinc-800 odd:bg-zinc-200"},k=t("td",{class:"px-4 py-2"},"Total",-1),w={class:"px-4 py-2"},F={__name:"Costing",props:{costing:Object,total:Number},setup(a){return(z,v)=>(s(),o(d,null,[l(r(_),null,{default:c(()=>[u]),_:1}),t("div",h,[t("div",p,[t("table",b,[g,t("tbody",null,[(s(!0),o(d,null,i(a.costing,n=>(s(),o("tr",m,[t("td",x,e(n.name),1),t("td",y,e(n.total.amountFormat()),1)]))),256)),t("tr",f,[k,t("td",w,e(a.total.amountFormat()),1)])])])])])],64))}};export{F as default};