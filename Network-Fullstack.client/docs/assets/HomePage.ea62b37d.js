import{l as s,c as t,p as a,g as o,e,o as r,a as n,d as p,b as d,i as c}from"./vendor.b940d1f3.js";import{p as u,P as i,A as l}from"./index.061ff146.js";const f={setup:()=>(s((async()=>{try{await u.getAllPosts()}catch(s){i.toast(s,"error")}})),{user:t((()=>l.user)),posts:t((()=>l.posts))})},b=c();a("data-v-0abd1186");const m={class:"row justify-content-center"};o();const v=b(((s,t,a,o,c,u)=>{const i=e("CreatePost"),l=e("Thread");return r(),n("div",m,[o.user.isAuthenticated?(r(),n(i,{key:0,posts:o.posts},null,8,["posts"])):p("",!0),d(l,{posts:o.posts},null,8,["posts"])])}));f.render=v,f.__scopeId="data-v-0abd1186";export{f as default};