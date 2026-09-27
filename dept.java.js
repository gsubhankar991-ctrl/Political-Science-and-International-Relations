const container = document.querySelector(".mouse-particles");

document.addEventListener("mousemove", (e) => {

    const spark = document.createElement("span");
    spark.classList.add("spark");

    spark.style.left = e.clientX + "px";
    spark.style.top = e.clientY + "px";

    const size = Math.random() * 6 + 3;
    spark.style.width = size + "px";
    spark.style.height = size + "px";

    container.appendChild(spark);

    setTimeout(() => {
        spark.remove();
    }, 800);

});