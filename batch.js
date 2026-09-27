const content = document.querySelector(".marquee-content");

let pos = window.innerHeight;
let speed = 1.2;

let autoScroll = true;
let timer;

let touchStartY = 0;
let lastTouchY = 0;


/* ========================================= */
/*              AUTO MARQUEE                 */
/* ========================================= */

function marqueeUp() {

    if (autoScroll) {
        pos -= speed;
    }

    content.style.transform = `translateY(${pos}px)`;

    /*
        Content পুরো উপরে চলে গেলে
        আবার নিচ থেকে শুরু হবে
    */

    if (Math.abs(pos) > content.offsetHeight + window.innerHeight) {
        pos = window.innerHeight;
    }

    requestAnimationFrame(marqueeUp);
}

marqueeUp();


/* ========================================= */
/*              MOUSE WHEEL                  */
/* ========================================= */

document.addEventListener("wheel", (e) => {

    autoScroll = false;

    pos -= e.deltaY * 0.5;

    clearTimeout(timer);

    timer = setTimeout(() => {
        autoScroll = true;
    }, 800);

}, { passive: true });


/* ========================================= */
/*             MOBILE TOUCH                  */
/* ========================================= */

document.addEventListener("touchstart", (e) => {

    autoScroll = false;

    touchStartY = e.touches[0].clientY;
    lastTouchY = touchStartY;

    clearTimeout(timer);

}, { passive: true });


document.addEventListener("touchmove", (e) => {

    const currentY = e.touches[0].clientY;

    const difference = currentY - lastTouchY;

    /*
        Finger উপরে গেলে content উপরে যাবে
        Finger নিচে গেলে content নিচে যাবে
    */

    pos += difference;

    lastTouchY = currentY;

}, { passive: true });


document.addEventListener("touchend", () => {

    clearTimeout(timer);

    /*
        Finger ছেড়ে দেওয়ার 1.2 sec পরে
        আবার auto-scroll শুরু হবে
    */

    timer = setTimeout(() => {

        autoScroll = true;

    }, 1200);

}, { passive: true });


/* ========================================= */
/*             PHOTO POPUP                   */
/* ========================================= */

$(function(){

    $(".popup img").on("click touchend", function(e){

        /*
            Double event যাতে না হয়
        */

        if (e.type === "touchend") {
            e.preventDefault();
        }

        let src = $(this).attr("src");

        $(".img-show img").attr("src", src);

        $(".show").fadeIn(50, function(){

            requestAnimationFrame(function(){

                $(".show").addClass("active");

            });

        });

    });


    /* ========================================= */
    /*              CLOSE POPUP                   */
    /* ========================================= */

    $(".overlay, .img-show span").on("click touchend", function(e){

        e.preventDefault();

        $(".show").removeClass("active");

        setTimeout(function(){

            $(".show").fadeOut(150);

        }, 450);

    });

});


/* ========================================= */
/*            MOUSE PARTICLES                */
/* ========================================= */

const container = document.querySelector(".mouse-particles");

if (container) {

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

}