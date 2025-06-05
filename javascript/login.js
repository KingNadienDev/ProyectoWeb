const contenedor = document.querySelector(".contenedor");
const btnsignin = document.getElementById("btn-sign-in");
const btnsignup = document.getElementById("btn-sign-up");

btnsignin.addEventListener("click" ,()=>{
   contenedor.classList.remove("toggle");
});

btnsignup.addEventListener("click" ,()=>{
  contenedor.classList.add("toggle");
});