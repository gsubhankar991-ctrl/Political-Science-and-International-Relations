const modal = document.getElementById('videoModal');
const video = document.getElementById('popupVideo');

modal.addEventListener('shown.bs.modal', () => {
    video.play();
});

modal.addEventListener('hidden.bs.modal', () => {
    video.pause();
    video.currentTime = 0;
});


const messages = [
    "Preparing Your Memories...",
    "Collecting Beautiful Moments...",
    "Almost Ready...",
    "Enjoy The Experience"
];

const status = document.getElementById("loader-status");

let i = 0;

const change = setInterval(() => {

    i++;

    if(i < messages.length){

        status.innerHTML = messages[i];

    }

},1200);

window.addEventListener("load",()=>{

    setTimeout(()=>{

        clearInterval(change);

        const loader=document.getElementById("loader");

        loader.style.opacity="0";
        loader.style.visibility="hidden";

        setTimeout(()=>{

            loader.remove();

        },1000);

    },5000);

});

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
