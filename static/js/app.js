// CART

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart(){
    localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(
    id,
    name,
    price,
    image,
    quantity = 1
){

    const item = cart.find(p => p.id === id);

    if(item){
        item.quantity += Number(quantity);
    }else{
        cart.push({
            id,
            name,
            price,
            image,
            quantity:Number(quantity)
        });
    }

    saveCart();
    updateCartCount();

    alert("Added to Cart ✅");
}

function updateCartCount(){

    let total = 0;

    cart.forEach(item => {
        total += item.quantity;
    });

    const badge = document.querySelector(".cart-icon span");
    const navBadge = document.getElementById("navCartCount");

    if(badge) badge.innerHTML = total;

    if(navBadge) navBadge.innerHTML = total;

}

updateCartCount();

const search = document.getElementById("searchInput");
const category = document.getElementById("categoryFilter");

if(search && category){

function filterProducts(){

const keyword = search.value.toLowerCase();

const selected = category.value;

document.querySelectorAll(".product-card").forEach(card=>{

const name = card.dataset.name;

const cat = card.dataset.category;

const matchName = name.includes(keyword);

const matchCategory =
selected==="all" || cat===selected;

card.style.display =
(matchName && matchCategory)
? "block"
: "none";

});

}

search.addEventListener("input",filterProducts);

category.addEventListener("change",filterProducts);

}

const menuBtn = document.getElementById("menuBtn");

const navLinks = document.getElementById("navLinks");

if(menuBtn){

menuBtn.onclick = () =>{

navLinks.classList.toggle("active");

};

}

document.querySelectorAll(".wishlist").forEach(item=>{

item.onclick=()=>{

item.innerHTML=item.innerHTML==="♡"?"♥":"♡";

item.style.color=item.innerHTML==="♥"?"red":"black";

};

});

// Animated Counter

const counters = document.querySelectorAll(".counter");

const startCounter = () => {

    counters.forEach(counter => {

        const target = +counter.dataset.target;

        let count = 0;

        const speed = target / 100;

        const update = () => {

            count += speed;

            if(count < target){

                counter.innerText = Math.ceil(count);

                requestAnimationFrame(update);

            }else{

                counter.innerText = target.toLocaleString();

            }

        };

        update();

    });

};

const statsSection = document.querySelector(".stats");

if(statsSection){

const observer = new IntersectionObserver(entries=>{

if(entries[0].isIntersecting){

startCounter();

observer.disconnect();

}

});

observer.observe(statsSection);

}

const topBtn = document.getElementById("topBtn");

if(topBtn){

    window.addEventListener("scroll", () => {

        if(window.scrollY > 500){
            topBtn.style.display = "block";
        }else{
            topBtn.style.display = "none";
        }

    });

    topBtn.onclick = () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    };

}

const cartInput = document.getElementById("cartData");

if(cartInput){

cartInput.value = JSON.stringify(cart);

const summary = document.getElementById("summaryItems");

const subtotal = document.getElementById("subtotal");

const grandTotal = document.getElementById("grandTotal");

let total = 0;

cart.forEach(item=>{

total += item.price * item.quantity;

summary.innerHTML += `
<p>
    ${item.name} × ${item.quantity}
    <span>₦${(item.price * item.quantity).toLocaleString()}</span>
</p>
`;

});

subtotal.innerHTML = "₦" + total.toLocaleString();

grandTotal.innerHTML =
"₦" + (total + 5000).toLocaleString();

}