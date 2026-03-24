

const slider = document.getElementById("contentImgs");

let isDragging = false;
let startX;
let scrollLeft;

// ===== PC (Mouse) =====
slider.addEventListener("mousedown", (e) => {
    isDragging = true;
    slider.classList.add("active");

    startX = e.pageX;
    scrollLeft = slider.scrollLeft;
});

window.addEventListener("mouseup", () => {
    isDragging = false;
});

slider.addEventListener("mouseleave", () => {
    isDragging = false;
});

slider.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    e.preventDefault();

    const x = e.pageX;
    const walk = (x - startX) * 1.5; // chỉnh tốc độ kéo
    slider.scrollLeft = scrollLeft - walk;
});


// ===== Mobile (Touch) =====
slider.addEventListener("touchstart", (e) => {
    startX = e.touches[0].pageX;
    scrollLeft = slider.scrollLeft;
});

slider.addEventListener("touchmove", (e) => {
    const x = e.touches[0].pageX;
    const walk = (x - startX) * 1.5;
    slider.scrollLeft = scrollLeft - walk;
});

// quay lại
function goBack() {
    if (document.referrer && document.referrer.includes("index")) {
        // nếu có trang trước là index → quay lại bình thường
        window.history.back();
    } else {
        // nếu mở trực tiếp → chuyển về index
        window.location.href = "../../index.html";
    }
}
