const searchInput = document.getElementById("searchInput");

let selectedTag = "all";

// ======================
// Lấy động
// ======================
function getCards() {
    return document.querySelectorAll(".card");
}

function getTags() {
    return document.querySelectorAll(".tag");
}

// ======================
// Sort TAG (1 lần)
// ======================
function sortTags() {
    const tagContainer = document.getElementById("tagContainer");
    const tagsArray = Array.from(getTags());

    function compareTags(a, b) {
        const tagA = a.dataset.tag;
        const tagB = b.dataset.tag;

        if (tagA === "all") return -1;
        if (tagB === "all") return 1;

        const numA = parseFloat(tagA);
        const numB = parseFloat(tagB);

        if (!isNaN(numA) && !isNaN(numB)) return numA - numB;
        if (!isNaN(numA)) return -1;
        if (!isNaN(numB)) return 1;

        return tagA.localeCompare(tagB, 'vi', { sensitivity: 'base' });
    }

    tagsArray.sort(compareTags);

    tagContainer.innerHTML = "";
    tagsArray.forEach(t => tagContainer.appendChild(t));
}

// ======================
// Sort CARD
// ======================
function sortCards() {
    const grid = document.getElementById("fileGrid");
    const cardsArray = Array.from(getCards());

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
// FILTER
// ======================
function filter() {
    const text = searchInput.value.toLowerCase();

    getCards().forEach(card => {
        const name = card.querySelector("h3").textContent.toLowerCase();
        let matchTag = true;

        if (selectedTag !== "all") {
            matchTag = card.dataset.tags.includes(selectedTag);
        }

        card.style.display = (name.includes(text) && matchTag) ? "block" : "none";
    });

    sortCards();
}

// ======================
// SEARCH
// ======================
searchInput.addEventListener("input", filter);

// ======================
// EVENT DELEGATION (🔥 QUAN TRỌNG)
// ======================

// click TAG trên thanh
document.getElementById("tagContainer").addEventListener("click", (e) => {
    const tag = e.target.closest(".tag");
    if (!tag) return;

    selectedTag = tag.dataset.tag || "all";

    getTags().forEach(t => t.classList.remove("active"));
    tag.classList.add("active");

    history.pushState(null, "", "?tag=" + selectedTag);

    filter();
});

// click file-tag trong card
document.getElementById("fileGrid").addEventListener("click", (e) => {
    const tag = e.target.closest(".file-tag");
    if (!tag) return;

    e.stopPropagation();
    e.preventDefault();

    const tagText = tag.dataset.tag;
    selectedTag = tagText;

    getTags().forEach(t => {
        t.classList.remove("active");
        if (t.dataset.tag === tagText) t.classList.add("active");
    });

    history.pushState(null, "", "?tag=" + selectedTag);

    filter();
});

// ======================
// LOAD THUMB
// ======================
function loadThumbs() {
    getCards().forEach(card => {
        const thumb = card.dataset.thumb;
        const imageDiv = card.querySelector(".image");

        if (thumb) {
            imageDiv.style.backgroundImage = `url(${thumb})`;
            imageDiv.style.backgroundSize = "cover";
            imageDiv.style.backgroundPosition = "center";
        }
    });
}

// ======================
// URL TAG
// ======================
function loadTagFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const initialTag = urlParams.get("tag");

    if (initialTag) {
        selectedTag = initialTag;

        getTags().forEach(t => {
            t.classList.remove("active");
            if (t.dataset.tag === initialTag) t.classList.add("active");
        });
    }
}

// ======================
// INIT
// ======================
window.addEventListener("load", () => {
    sortTags();        // sort 1 lần
    loadThumbs();      // load ảnh
    loadTagFromURL();  // lấy tag từ URL
    filter();          // filter + sort card
});