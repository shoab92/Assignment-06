// main url 
const BASE_URL = "https://openapi.programming-hero.com/api";

function fetchJSON(url){
    return fetch(url).then(res=>{
        if (!res.ok) throw new Error('404 not found !' + res.status);
        return res.json();
    });
}

function setActiveCategoryBtn(btn){
    document.querySelectorAll("#category-list.btn").forEach(b=>b.classList.remove("btn-active") )  ;
    btn.classList.add("btn-active" );
}


// loading catagories
async function loadCategories() {
try {
    const res = await fetch(`${BASE_URL}/categories`);
    const data = await res.json();
    displayCategories(data.categories);
} catch (err) {
    console.error("Error loading categories:", err);
}
}
// catagories
function displayCategories(categories) {
const container = document.getElementById("category-list");
container.innerHTML = `<h1 class="font-bold text-xl text-black my-5">Categories</h1>`;

// all tree brn implement
const allBtn = document.createElement("button");
allBtn.className = "btn btn-wide rounded-md bg-green-50 mt-2";
allBtn.innerText = "All Trees";
allBtn.onclick = () => loadAllTrees();
container.appendChild(allBtn);




// categories.forEach((cat)=>{
//     const btn = document.createElement("button");
//     btn.className = "btn btn-wide rounded-md bg-green-50 mt-2";
    
//     // use custom name if exists, otherwise API name

//     btn.dataset.id = cat.id;
//     btn.onclick = function(){
//         setActiveCategoryBtn(this);
//         loadCategoryTrees(this.dataset.id);
//     }
//     container.appendChild(btn);
// });

// categories.forEach((cat) => {
//     const btn = document.createElement("button");
//     btn.className = "btn btn-wide rounded-md bg-green-50 mt-2";

//     btn.innerText = cat.category;
    
//     btn.onclick = () => loadCategoryTrees(cat.id);
//     container.appendChild(btn);

categories.forEach((cat)=>{
    const btn = document.createElement("button");
    btn.className = "btn btn-wide rounded-md bg-green-50 mt-2";
    // btn.innerText = cat.category;
    btn.innerText = CATEGORY_NAMES[cat.id] || cat.category;
    btn.dataset.id = cat.id;
    btn.onclick = function(){
        setActiveCategoryBtn(this);
        loadCategoryTrees(this.dataset.id);
    }
    container.appendChild(btn);
})
}

// fot butttons name 
const CATEGORY_NAMES = {
    "1": "Fruit Trees",
    "2": "Flowering Treess",
    "3": "Shade Trees",
    "4": "Medicinal Trees",
    "5": "Timber Trees",
    "6": "Evergreen Trees",
    "7": "Ornamental Plants",
    "8": "Climbers",
    "9": "Aquatic Plants"

};

// all trea is loding
async function loadAllTrees() {
try {
    const res = await fetch(`${BASE_URL}/plants`);
    const data = await res.json();
    displayTrees(data.plants);
} catch (err) {
    console.error("Error loading all trees:", err);
}
}

async function loadCategoryTrees(catid) {
try {
    const res = await fetch(`${BASE_URL}/category/${catid}`);
    const data = await res.json();
    displayTrees(data.plants);
} catch (err) {
    console.error("Error loading category trees:", err);
}
}

function displayTrees(plants) {
const container = document.getElementById("tree-container");
container.innerHTML = "";

plants.forEach((tree) => {
    const card = document.createElement("div");
    card.className =
    "p-4 bg-white rounded-xl shadow flex flex-col items-center";

    card.innerHTML = `
    <img src="${tree.image}" alt="${tree.name}" 
        class="w-full h-40 object-cover rounded-md mb-3">
    <h2 class="text-lg font-bold">${tree.name}</h2>
    <p class="text-sm text-gray-600">${tree.category}</p>
    <button onclick="loadTreeDetails(${tree.id})" 
            class="btn mt-2 bg-green-200">
        View Details
    </button>
    `;


    container.appendChild(card);
});
}

// loading sinle tree data
async function loadTreeDetails(id) {
try {
    const res = await fetch(`${BASE_URL}/plant/${id}`);
    const data = await res.json();
    showDetails(data.plant);
} catch (err) {
    console.error("Error loading plant details:", err);
}
}

function showDetails(plant) {
alert(`🌴 ${plant.name}\n\n${plant.description}`);
}loadCategories();
loadAllTrees();

