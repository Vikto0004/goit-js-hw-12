import{a as S,i as p,S as b}from"./assets/vendor-09d7c26e.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))c(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const o of t.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&c(o)}).observe(document,{childList:!0,subtree:!0});function l(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function c(e){if(e.ep)return;e.ep=!0;const t=l(e);fetch(e.href,t)}})();const f=(s,r)=>S.get("https://pixabay.com/api/",{params:{key:"43795533-00e69c3734dde476e8d836fd2",q:s,orientation:"horizontal",safesearch:!0,page:r,per_page:"15"}}),y=s=>s.map(({webformatURL:l,largeImageURL:c,tags:e,likes:t,views:o,comments:L,downloads:v})=>`<li class="search-list-item">
                    <a class="gallery-link" href="${c}">
                      <img class="search-list-img" src="${l}" alt="${e}" />
                    </a>
                    <ul>
                      <li>
                        <h3>Likes</h3>
                        <p>${t}</p>
                      </li>
                      <li>
                        <h3>Views</h3>
                        <p>${o}</p>
                      </li>
                      <li>
                        <h3>Comments</h3>
                        <p>${L}</p>
                      </li>
                      <li>
                        <h3>Downloads</h3>
                        <p>${v}</p>
                      </li>
                    </ul>
                  </li>`).join(""),u=document.querySelector(".js-search-form"),a=document.querySelector(".js-search-list"),d=document.querySelector(".js-loader"),h=document.querySelector(".js-loader-more"),i=document.querySelector(".js-search-more");let m=1,n="";u.addEventListener("submit",async s=>{if(s.preventDefault(),n=u.elements.enterForSearsh.value.trim(),!!n){i.classList.contains("is-active")&&i.classList.remove("is-active"),a.innerHTML="",d.classList.add("is-active"),m=1;try{const{data:r}=await f(n,m);if(!r.total){d.classList.remove("is-active"),p.error({position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!"}),u.reset();return}a.innerHTML=`${y(r.hits)}`,d.classList.remove("is-active"),r.totalHits>15&&i.classList.add("is-active"),g.refresh()}catch(r){console.log(r)}}});i.addEventListener("click",async()=>{h.classList.add("is-active-more"),i.classList.remove("is-active");try{const{data:s}=await f(n,++m);a.insertAdjacentHTML("beforeend",`${y(s.hits)}`),h.classList.remove("is-active-more"),i.classList.add("is-active"),g.refresh(),window.scrollBy({top:a.firstChild.getBoundingClientRect().height*2,behavior:"smooth"}),a.childElementCount===s.totalHits&&(i.classList.remove("is-active"),p.info({position:"topRight",message:"We're sorry, but you've reached the end of search results."}))}catch(s){console.log(s)}});const g=new b(".gallery-link",{captionsData:"alt",captionDelay:250});
//# sourceMappingURL=commonHelpers.js.map
