

const slider = document.getElementById("contentImgs");

// quay lại
function goBack() {
    if (sessionStorage.getItem("fromIndex")) {
        window.history.back();
    } else {
        // nếu mở trực tiếp → chuyển về index
        window.location.href = "../../../index.html";
    }
}
