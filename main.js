import './style.scss'
import * as bootstrap from "bootstrap";
import { Loader } from './Loader';
import { productCard } from './ProductCard';

export let products = [];
export let loader = document.getElementById("loader");
export let CardCountBtn = document.getElementById("CusBoughted-count");
export let OrderCount = document.querySelectorAll(".Order-item-count");
export let ItemInCart = document.querySelector(".offcanvas-body");
export let ItemInCartCost = document.querySelector(".offcanvas-bottom");
export let Total = document.querySelector("#total");
console.log(Total);


Loader();
fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(json => {
        products = json;
        console.log(products);
        loader.remove();
        productCard();
    }    
)
    

            





