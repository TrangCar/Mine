

const slider = document.getElementById("contentImgs");

const list = document.querySelector('.download-list');
const items = Array.from(list.querySelectorAll('.download-item'));

items.sort((a, b) => {
    const textA = a.querySelector('span').innerText.trim();
    const textB = b.querySelector('span').innerText.trim();

    return textA.localeCompare(textB, 'vi', { numeric: true });
});

// clear và append lại theo thứ tự mới
list.innerHTML = '';
items.forEach(item => list.appendChild(item));

// quay lại
function goBack() {
    if (sessionStorage.getItem("fromIndex")) {
        window.history.back();
    } else {
        // nếu mở trực tiếp → chuyển về index
        window.location.href = "../../../index.html";
    }
}
