
const products = [
  {
    name: 'Sony Playstation 5',
    url: 'images/playstation_5.png',
    type: 'games',
    price: 499.99,
  },
  {
    name: 'Samsung Galaxy',
    url: 'images/samsung_galaxy.png',
    type: 'smartphones',
    price: 399.99,
  },
  {
    name: 'Cannon EOS Camera',
    url: 'images/cannon_eos_camera.png',
    type: 'cameras',
    price: 749.99,
  },
  {
    name: 'Sony A7 Camera',
    url: 'images/sony_a7_camera.png',
    type: 'cameras',
    price: 1999.99,
  },
  {
    name: 'LG TV',
    url: 'images/lg_tv.png',
    type: 'televisions',
    price: 799.99,
  },
  {
    name: 'Nintendo Switch',
    url: 'images/nintendo_switch.png',
    type: 'games',
    price: 299.99,
  },
  {
    name: 'Xbox Series X',
    url: 'images/xbox_series_x.png',
    type: 'games',
    price: 499.99,
  },
  {
    name: 'Samsung TV',
    url: 'images/samsung_tv.png',
    type: 'televisions',
    price: 1099.99,
  },
  {
    name: 'Google Pixel',
    url: 'images/google_pixel.png',
    type: 'smartphones',
    price: 499.99,
  },
  {
    name: 'Sony ZV1F Camera',
    url: 'images/sony_zv1f_camera.png',
    type: 'cameras',
    price: 799.99,
  },
  {
    name: 'Toshiba TV',
    url: 'images/toshiba_tv.png',
    type: 'televisions',
    price: 499.99,
  },
  {
    name: 'iPhone 14',
    url: 'images/iphone_14.png',
    type: 'smartphones',
    price: 999.99,
  },
];
//create products
const createproducts=(product)=>
{
  const prodel=document.createElement('div');
  prodel.className='item space-y-2';
  prodel.innerHTML=`
      <div class="bg-gray-100 flex justify-center relative overflow-hidden group cursor-pointer border rounded-xl">

      <img src="${product.url}" alt="${product.name}"class="w-full h-full object-cover">

        <button class="status bg-black text-white absolute bottom-0 left-0 right-0 text-center py-2 translate-y-full transition-transform group-hover:translate-y-0">Add to Cart</button>

      </div>
      <p class="text-xl">${product.name}</p>
      <strong>$${product.price.toLocaleString()}</strong>
    </div>
    `;
  prodel.querySelector('.status').addEventListener('click',update);
  return prodel;
}

//Select dom elements
const productsWrapper=document.querySelector('#product-wrapper');
const checkboxes=document.querySelectorAll('.check');
const filtersContainer=document.querySelector('#filters-container');
const searchInput=document.querySelector('#search');
const cartCount=document.querySelector('#cart-count');

let cartItemCount=0;
const productElements=[];
products.forEach((product)=>
{
  const prodel=createproducts(product)
  productElements.push(prodel);
  productsWrapper.appendChild(prodel);
});

//update cart
function update(e)
{
   let el=e.target;
   if(el.classList.contains('added'))
    {
      el.classList.remove('added');
      el.innerText='Remove from Cart';
      el.classList.remove("bg-gray-800");
      el.classList.add('bg-red-600')
      cartItemCount--;
    } 
    else
    {
      el.classList.add('added');
      el.innerText='Add to cart';
      el.classList.remove('bg-red-600')
      el.classList.add("bg-gray-800");
      cartItemCount++;
    }
    cartCount.innerText=cartItemCount;
};
//filtering products
function filter()
{
  const searchterm=searchInput.value.toLowerCase();
  const checkedcategories=Array.from(checkboxes).filter((checks)=>checks.checked).map((checks)=>checks.id);
  
  //loop over products and check if they match the search term and checked categories
 productElements.forEach((productElement, index) => {
  const product = products[index];
  const matchesSearchTerm = product.name.toLowerCase().includes(searchterm);
  const isinCheckedCategory = checkedcategories.length === 0 || checkedcategories.includes(product.type);
  if (matchesSearchTerm && isinCheckedCategory) {
    productElement.classList.remove('hidden');
  } else {
    productElement.classList.add('hidden'); // Fix here
  }
});

}
//event listeners for filterings
filtersContainer.addEventListener('change',filter);
searchInput.addEventListener('input',filter);

