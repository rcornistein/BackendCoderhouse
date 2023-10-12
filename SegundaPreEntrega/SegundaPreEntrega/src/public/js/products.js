

/* Seteo de variables */


let limit = document.getElementById('limit');

let nextLink=document.getElementById('pag_sig').textContent;
let prevLink=document.getElementById('pag_ant').textContent;
let total=( document.getElementById('pag_TotalPages').textContent);
let page=(document.getElementById('pag_Page').textContent);







let selLimit=10;
limit.addEventListener('change',()=>{
     selLimit = limit.value;
    
})


let order = document.getElementById('order');
let selOrder='none'
order.addEventListener('change',()=>{
     selOrder = order.value;
    
})






let page_ant_state='';
let page_prox_state='';

if(prevLink.length>1){ page_ant_state= ''} else{ page_ant_state='disabled'};
if(nextLink.length>1){ page_prox_state= ''} else{ page_prox_state='disabled'};


/* paginator */

let paginator_ul = document.getElementById('paginator_ul');
const makePaginator = async ()=>{

     paginator_ul.innerHTML= `
    
     <li class="page-item ${page_ant_state}">
      <a class="page-link"  tabindex="-1" aria-disabled="true" href=${prevLink} >Previous</a>
     </li>
   
     <li class="page-item active" aria-current="page">
     <a class="page-link" >${page}</a>
     </li>
     
     <li class="page-item ${page_prox_state}"">
      <a class="page-link" href=${nextLink} >Next</a>
     </li>`;

     

}


makePaginator();


let search= document.getElementById('search');
let category = document.getElementById('category');
let valueCategory='All categories'

category.addEventListener('change',()=>{
     valueCategory = category.value;
    
});


let url_string =document. documentURI;
let url = new URL(url_string);
let categoryUrl = url.searchParams.get("category");

if(categoryUrl){
category.value=categoryUrl;
}


let orderUrl=url_string.split('/')[6].split('?')[0];

order.value=orderUrl;

let stock = document.getElementById('stock');
let selStock='Available'
stock.addEventListener('change',()=>{
     selStock = stock.value;
    
});

search.addEventListener('click',()=>{
     limit = document.getElementById('limit');
     order= document.getElementById('order');
     category=document.getElementById('category')
     selStock=stock.value;
     let link=`http://localhost:8080/products/${limit.value}/1/${order.value}?category=${category.value}&stock=${stock.value}`

     window.location=link;


})




