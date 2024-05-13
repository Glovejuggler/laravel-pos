import{o as l,f as i,a as p,w as b,u as r,b as t,F as d,k as h,t as a,g as f,Z as g,e as w,n as _}from"./app-tESl9fh7.js";const y=t("title",null,`\r
            Items\r
        `,-1),m={class:"max-w-screen-lg flex mx-auto mt-8"},k={class:"w-1/6 bg-white dark:bg-zinc-800 py-4 rounded-lg h-min"},D=t("div",{class:"flex justify-between items-center px-4 dark:text-white"},[t("span",null,"Categories")],-1),v=t("hr",{class:"border-zinc-600 mt-1"},null,-1),C=["onClick"],j={class:"w-5/6 px-4 dark:text-white"},$={class:"mb-4 flex space-x-2"},q={class:"dark:text-white font-semibold"},z={class:"w-full bg-zinc-800"},O=t("thead",{class:"text-left"},[t("tr",null,[t("th",{class:"px-4 py-2"},"Item"),t("th",{class:"px-4 py-2"},"Total quantity of sales"),t("th",{class:"px-4 py-2 text-right"},"Gross"),t("th",{class:"px-4 py-2 text-right"},"Cost"),t("th",{class:"px-4 py-2 text-right"},"Net")])],-1),N={class:"odd:bg-zinc-700"},S={class:"px-4 py-2"},B={class:"px-4 py-2"},F={class:"px-4 py-2 text-right"},L={class:"px-4 py-2 text-right"},V={class:"px-4 py-2 text-right"},G={__name:"UnitSales",props:{items:Object,categories:Object,cat:Object,filters:Object},setup(n){const u=n,o=u.filters.date?new Date(u.filters.date):new Date,x=o<new Date(new Date().setHours(0,0,0,0));return(s,c)=>(l(),i(d,null,[p(r(g),null,{default:b(()=>[y]),_:1}),t("div",m,[t("div",k,[D,v,(l(!0),i(d,null,h(n.categories,e=>(l(),i("div",{onClick:w(I=>s.$inertia.get(s.route("unit.sales",e),{date:n.filters.date}),["stop"]),class:_([{"bg-blue-500 hover:bg-blue-500 font-bold":s.$page.url.replace("%20"," ").indexOf(e.name)>-1},"dark:text-white px-4 py-2 duration-200 ease-in-out flex justify-between group cursor-pointer"])},[t("span",null,a(e.name),1)],10,C))),256))]),t("div",j,[t("div",$,[t("i",{onClick:c[0]||(c[0]=e=>s.$inertia.get(s.route("unit.sales",n.cat),{date:new Date(r(o).setDate(r(o).getDate()-1)).toLocaleDateString()})),class:"bx bxs-chevron-left dark:text-white w-6 h-6 inline-flex justify-center items-center rounded-full border dark:border-white"}),t("p",q,a(r(o).toWordFormat()),1),x?(l(),i("i",{key:0,onClick:c[1]||(c[1]=e=>s.$inertia.get(s.route("unit.sales",n.cat),{date:new Date(r(o).setDate(r(o).getDate()+1)).toLocaleDateString()})),class:"bx bxs-chevron-right dark:text-white w-6 h-6 inline-flex justify-center items-center rounded-full border dark:border-white"})):f("",!0)]),t("table",z,[O,t("tbody",null,[(l(!0),i(d,null,h(n.items,e=>(l(),i("tr",N,[t("td",S,a(e.name),1),t("td",B,a(e.total_quantity),1),t("td",F,a(e.total_quantity*e.price),1),t("td",L,a(e.total_quantity*e.cost),1),t("td",V,a(e.total_quantity*e.price-e.total_quantity*e.cost),1)]))),256))])])])])],64))}};export{G as default};
