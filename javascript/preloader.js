 window.addEventListener("load", function () {
    const preloader = document.getElementById("preloader");
    preloader.classList.add("loaded");
    setTimeout(() => {
      preloader.remove();
    }, 9200);
  });