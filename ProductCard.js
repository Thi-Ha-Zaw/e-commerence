import { products,CardCountBtn,OrderCount,ItemInCart,ItemInCartCost,Total } from "./main"

let TotalCost = function () {
    let AllCartCost = document.querySelectorAll(".cart-cost");
    Total.innerHTML = [...AllCartCost].reduce((pv,cv)=> pv+parseFloat(cv.innerHTML),0).toFixed(2)
}

window.inc = function (event,price) {
    let CurrentCart = event.target.closest(".Item-in-cart");
    let CurrentCartQuantity = CurrentCart.querySelector(".cart-quantity")
    CurrentCartQuantity.valueAsNumber += 1;
    let CurrentCartCost = CurrentCart.querySelector(".cart-cost");
    CurrentCartCost.innerHTML = (CurrentCartQuantity.valueAsNumber * price).toFixed(2);
    TotalCost();
}

window.dec = function (event,price) {
    let CurrentCart = event.target.closest(".Item-in-cart");
    let CurrentCartQuantity = CurrentCart.querySelector(".cart-quantity")
        if(CurrentCartQuantity.valueAsNumber > 1) {
        CurrentCartQuantity.valueAsNumber -= 1;
    };
    let CurrentCartCost = CurrentCart.querySelector(".cart-cost");
    CurrentCartCost.innerHTML = (CurrentCartQuantity.valueAsNumber * price).toFixed(2);
    TotalCost();
}

window.del = function (event) {
    let CurrentCart = event.target.closest(".Item-in-cart");
    CurrentCart.classList.add("animate__animated","animate__zoomOutDown")
    CurrentCart.addEventListener("animationend", function () {
        CurrentCart.remove();
        let Count = parseInt(OrderCount[0].innerText);
            OrderCount.forEach(count => {
                count.innerHTML = Count - 1;
            })
        TotalCost();
    })
}

let MainSection = document.getElementById("main");
export let productCard = function () {
    products.map(product => {
        const Div = document.createElement("div");
        Div.classList.add("col-lg-3","col-md-6")
        Div.innerHTML = `
        <div class="">
            <div class="card product-item-card shadow-sm" item-id="${product.id}">
                <div class=" card-body d-flex flex-column">
                    <div>
                        <img src="${product.image}" alt="" class=" product-card-img mb-1">
                    </div>
                    <div>
                        <p class=" card-title text-truncate">${product.title}</p>
                        <p class=" small text-black-50">${(product.description).substring(1,100)}</p>
                    </div>
                    <div class=" d-flex justify-content-between align-items-center mt-auto">
                        <span class="">$${product.price}</span>
                        <button class=" btn btn-outline-primary rounded Cart-btn">
                            <i class=" bi bi-cart pe-none"></i>
                            Cart
                        </button>
                    </div>
                </div>
            </div>
      </div>
        
        `
        MainSection.append(Div)
    })
}

//Customer ရွေးချယ်ထားတဲ့ Item Detail
let CreateItemInCart = function ({ image, title, price, id }) {
    console.log(id);
    let Div = document.createElement("div");
        Div.classList.add("Item-in-cart")
        Div.innerHTML = `
        <div class=" mb-3 border p-3 rounded">
            <div class=" d-flex justify-content-between align-items-center">
            <img src="${image}" alt="" class=" Cus-Bought-img">
            <i class=" bi bi-trash text-danger fs-3 cursor-pointer" onclick="del(event)"></i>
            </div>
            <p>${title}</p>
            <div class=" row justify-content-between align-items-center">
            <div class=" col-4">
                <p class=" mb-0">$ <span class="cart-cost">${price}</span></p>
            </div>
            <div class=" col-6">
                <div class=" input-group-sm input-group">
                    <button class=" btn btn-success" onclick="dec(event,${price})">
                        <i class=" bi bi-dash pe-none"></i>
                    </button>
                    <input type="number" class=" form-control cart-quantity" value="1">
                    <button class=" btn btn-success" onclick="inc(event,${price})">
                        <i class=" bi bi-plus pe-none"></i>
                    </button>
                </div>
            </div>
        </div>
      </div>
        `
    ItemInCart.appendChild(Div)
   
}

MainSection.addEventListener("click", e => {
    if (e.target.classList.contains("Cart-btn")) {
        const currentCard = e.target.closest(".product-item-card");
        const CurrentProductID = currentCard.getAttribute("item-id");
        const CurrentProductItem = products.find(product => product.id == CurrentProductID)
        const CurrentImg = currentCard.querySelector(".product-card-img");
        let CurrentImgPosition = CurrentImg.getBoundingClientRect();
        let NewImg = new Image();
        NewImg.src = CurrentImg.src;
        NewImg.style.transition = 1 + "s";
        NewImg.style.position = "fixed";
        NewImg.style.zIndex = 3000;
        NewImg.style.left = (CurrentImgPosition.left) +"px";
        NewImg.style.top = (CurrentImgPosition.top) + "px";
        NewImg.style.height = 200 + "px";
        document.body.append(NewImg)

        setTimeout(() => {
            NewImg.style.transform = "rotate(360deg)";
            let BtnPostiton = CardCountBtn.getBoundingClientRect();
            NewImg.style.left = (BtnPostiton.left) +"px";
            NewImg.style.top = (BtnPostiton.top) + "px";
            NewImg.style.height = 0 + "px";
        }, 200);

        setTimeout(() => {
            CardCountBtn.classList.add("animate__tada"); 
            let Count = parseInt(OrderCount[0].innerText);
            OrderCount.forEach(count => {
                count.innerHTML = Count + 1;
            })
            NewImg.remove();
        }, 1000)

        CardCountBtn.addEventListener("animationend", function () {
            CardCountBtn.classList.remove("animate__tada")
        })
        
        CreateItemInCart(CurrentProductItem)
        TotalCost();
    }
})



