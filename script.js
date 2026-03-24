const searchInput = document.getElementById("searchInput");
const cards = document.querySelectorAll(".card");
const tags = document.querySelectorAll(".tag");

let selectedTag = "all";

// ======================
// Hàm sắp xếp thẻ tag
// ======================
function sortTags() {
    const tagContainer = document.getElementById("tagContainer");
    const tagsArray = Array.from(tagContainer.querySelectorAll(".tag"));

    function compareTags(a, b) {
        const tagA = a.dataset.tag;
        const tagB = b.dataset.tag;

        // "all" luôn đứng đầu
        if (tagA === "all") return -1;
        if (tagB === "all") return 1;

        const numA = parseFloat(tagA);
        const numB = parseFloat(tagB);

        // số → số
        if (!isNaN(numA) && !isNaN(numB)) return numA - numB;

        // số đứng trước chữ
        if (!isNaN(numA)) return -1;
        if (!isNaN(numB)) return 1;

        // chữ → chữ
        return tagA.localeCompare(tagB, 'vi', { sensitivity: 'base' });
    }

    tagsArray.sort(compareTags);

    tagContainer.innerHTML = "";
    tagsArray.forEach(t => tagContainer.appendChild(t));
}

// ======================
// Hàm sắp xếp các card
// ======================
function sortCards() {
    const grid = document.getElementById("fileGrid");
    const cardsArray = Array.from(grid.querySelectorAll(".card"));

    cardsArray.sort((a, b) => {
        const nameA = a.querySelector("h3").textContent.trim();
        const nameB = b.querySelector("h3").textContent.trim();

        const numA = parseFloat(nameA);
        const numB = parseFloat(nameB);

        if (!isNaN(numA) && !isNaN(numB)) return numA - numB;
        if (!isNaN(numA)) return -1;
        if (!isNaN(numB)) return 1;

        return nameA.localeCompare(nameB, 'vi', { sensitivity: 'base' });
    });

    grid.innerHTML = "";
    cardsArray.forEach(card => grid.appendChild(card));
}

// ======================
// Hàm filter
// ======================
function filter() {
    const text = searchInput.value.toLowerCase();

    cards.forEach(card => {
        const name = card.querySelector("h3").textContent.toLowerCase();
        let matchTag = true;

        if (selectedTag && selectedTag !== "all") {
            const cardTags = card.dataset.tags;
            matchTag = cardTags.includes(selectedTag);
        }

        card.style.display = (name.includes(text) && matchTag) ? "block" : "none";
    });

    sortCards(); // sắp xếp card sau khi lọc
    
}

// ======================
// Tìm kiếm khi gõ
// ======================
searchInput.addEventListener("input", filter);

// ======================
// Click tag trên thanh
// ======================
tags.forEach(tag => {
    tag.addEventListener("click", () => {
        selectedTag = tag.dataset.tag || "all";

        tags.forEach(t => t.classList.remove("active"));
        tag.classList.add("active");

        history.pushState(null, "", "?tag=" + selectedTag);

        filter();
        
    });
});

// ======================
// Click file-tag trong card
// ======================
const fileTags = document.querySelectorAll(".file-tag");

fileTags.forEach(tag => {
    tag.addEventListener("click", (e) => {
        e.stopPropagation();
        e.preventDefault();

        const tagText = tag.dataset.tag;
        selectedTag = tagText;

        tags.forEach(t => {
            t.classList.remove("active");
            if (t.dataset.tag === tagText) t.classList.add("active");
        });

        history.pushState(null, "", "?tag=" + selectedTag);

        filter();
        
    });
});

// ======================
// Load hình thumb cho card
// ======================
document.querySelectorAll(".card").forEach(card => {
    const thumb = card.dataset.thumb;
    const imageDiv = card.querySelector(".image");

    if (thumb) {
        imageDiv.style.backgroundImage = `url(${thumb})`;
        imageDiv.style.backgroundSize = "cover";
        imageDiv.style.backgroundPosition = "center";
    }
});

// ======================
// Xử lý tag từ URL (detail -> index)
// ======================
const urlParams = new URLSearchParams(window.location.search);
const initialTag = urlParams.get('tag');

if (initialTag) {
    const targetTag = Array.from(tags).find(t => t.dataset.tag === initialTag);
    if (targetTag) {
        tags.forEach(t => t.classList.remove("active"));
        targetTag.classList.add("active");
        selectedTag = initialTag;
    }
}

// ======================
// Gọi filter và sắp xếp khi load
// ======================
window.addEventListener("load", () => {
    sortTags();  
    filter();
    
});