/* =========================================================
   MARQUEE
========================================================= */

const content = document.querySelector(".marquee-content");

let pos = window.innerHeight;
let speed = 1.2;

let autoScroll = true;
let timer;

let touchStartY = 0;
let lastTouchY = 0;


/* =========================================================
   AUTO MARQUEE
========================================================= */

function marqueeUp() {

    if (!content) return;

    if (autoScroll) {
        pos -= speed;
    }

    content.style.transform = `translateY(${pos}px)`;

    if (
        Math.abs(pos) >
        content.offsetHeight + window.innerHeight
    ) {
        pos = window.innerHeight;
    }

    requestAnimationFrame(marqueeUp);
}

marqueeUp();


/* =========================================================
   MOUSE WHEEL
========================================================= */

document.addEventListener("wheel", function (e) {

    // Popup open থাকলে marquee move করবে না
    if (document.body.classList.contains("modal-open")) {
        return;
    }

    autoScroll = false;

    pos -= e.deltaY * 0.5;

    clearTimeout(timer);

    timer = setTimeout(function () {
        autoScroll = true;
    }, 800);

}, { passive: true });


/* =========================================================
   MOBILE TOUCH SCROLL
========================================================= */

document.addEventListener("touchstart", function (e) {

    // Popup open থাকলে marquee touch control বন্ধ
    if (document.body.classList.contains("modal-open")) {
        return;
    }

    autoScroll = false;

    touchStartY = e.touches[0].clientY;
    lastTouchY = touchStartY;

    clearTimeout(timer);

}, { passive: true });


document.addEventListener("touchmove", function (e) {

    if (document.body.classList.contains("modal-open")) {
        return;
    }

    const currentY = e.touches[0].clientY;

    const difference = currentY - lastTouchY;

    pos += difference;

    lastTouchY = currentY;

}, { passive: true });


document.addEventListener("touchend", function () {

    if (document.body.classList.contains("modal-open")) {
        return;
    }

    clearTimeout(timer);

    timer = setTimeout(function () {
        autoScroll = true;
    }, 1200);

}, { passive: true });



/* =========================================================
   OPEN VIDEO POPUP
========================================================= */

function openModal(element) {

    console.log("VIDEO CLICKED");


    /* Find clicked video's video tag */

    const video = element.querySelector("video");

    if (!video) {

        console.log("Video not found");

        return;
    }


    /*
        IMPORTANT:

        তোমার HTML-এ video এভাবে আছে:

        <video src="videos/last.mp4">

        তাই source tag খোঁজা যাবে না।

        সরাসরি video.src নেওয়া হচ্ছে।
    */

    let videoURL = video.getAttribute("src");


    /*
        যদি সরাসরি src না পাওয়া যায়,
        তাহলে currentSrc ব্যবহার করবে।
    */

    if (!videoURL) {

        videoURL = video.currentSrc;
    }


    if (!videoURL) {

        console.log("Video URL not found");

        return;
    }


    console.log("Opening:", videoURL);


    /* Find modal */

    const modal = document.getElementById("vmodal");

    const modalVideo =
        document.getElementById("modal-video");


    if (!modal || !modalVideo) {

        console.log("Modal not found");

        return;
    }


    /* Stop marquee */

    autoScroll = false;


    /* Stop previous modal video */

    modalVideo.pause();


    /*
        Set selected video
    */

    modalVideo.src = videoURL;


    /*
        SOUND ON
    */

    modalVideo.muted = false;

    modalVideo.volume = 1;


    /*
        Show popup
    */

    modal.classList.add("active");

    modal.style.display = "flex";


    /*
        Lock background
    */

    document.body.classList.add("modal-open");


    /*
        Play video
    */

    const playPromise = modalVideo.play();


    if (playPromise !== undefined) {

        playPromise
            .then(function () {

                console.log("Video playing");

            })
            .catch(function (error) {

                console.log(
                    "Autoplay blocked. Press Play.",
                    error
                );

            });

    }

}



/* =========================================================
   CLOSE VIDEO POPUP
========================================================= */

function closeModal() {

    const modal =
        document.getElementById("vmodal");

    const modalVideo =
        document.getElementById("modal-video");


    if (!modal || !modalVideo) {
        return;
    }


    /* Stop video */

    modalVideo.pause();


    /*
        Remove video
    */

    modalVideo.removeAttribute("src");

    modalVideo.load();


    /*
        Hide popup
    */

    modal.classList.remove("active");

    modal.style.display = "none";


    /*
        Unlock background
    */

    document.body.classList.remove("modal-open");


    /*
        Restart marquee
    */

    autoScroll = true;

}



/* =========================================================
   CLICK OUTSIDE VIDEO = CLOSE
========================================================= */

function handleOverlayClick(event) {

    const modal =
        document.getElementById("vmodal");


    if (event.target === modal) {

        closeModal();

    }

}



/* =========================================================
   ESC KEY = CLOSE
========================================================= */

document.addEventListener("keydown", function (e) {

    if (e.key === "Escape") {

        closeModal();

    }

});



/* =========================================================
   MOUSE PARTICLES
========================================================= */

const particleContainer =
    document.querySelector(".mouse-particles");


if (particleContainer) {

    document.addEventListener(
        "mousemove",
        function (e) {

            /*
                Popup open থাকলেও mouse particle
                চলবে।
            */

            const spark =
                document.createElement("span");


            spark.classList.add("spark");


            spark.style.left =
                e.clientX + "px";


            spark.style.top =
                e.clientY + "px";


            const size =
                Math.random() * 6 + 3;


            spark.style.width =
                size + "px";


            spark.style.height =
                size + "px";


            particleContainer.appendChild(
                spark
            );


            setTimeout(function () {

                spark.remove();

            }, 800);

        }
    );

}