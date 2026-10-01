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


const enterBtn = document.getElementById("enterBtn");
const video = document.getElementById("introVideo");
const popup = document.getElementById("videoPopup");
const content = document.getElementById("content");


if (enterBtn && video && popup) {
    enterBtn.addEventListener("click", () => {
        popup.style.display = "flex";
        video.currentTime = 0;

        video.play().catch((error) => {
            console.log("Video play error:", error);
        });
    });
}


if (video && popup && content) {
    video.addEventListener("ended", () => {
        popup.style.display = "none";

        content.scrollIntoView({
            behavior: "smooth"
        });
    });
}