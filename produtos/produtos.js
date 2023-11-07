// produtos.js

// Função para obter produtos do localStorage ou usar produtos padrão
function getStoredProducts() {
    const storedProducts = localStorage.getItem('products');
    return storedProducts ? JSON.parse(storedProducts) : getDefaultProducts();
}

// Função para obter produtos padrão
function getDefaultProducts() {
    return [
        {
        name: "Multilaser MO251 - Mouse Sem Fio 2.4 Ghz 1200 DPI Usb, Preto, normal",
        category: ["Eletrônicos", "Todos"],
        image: "https://m.media-amazon.com/images/I/71gbhPToXdL._AC_SX425_.jpg",
        price: "R$ 22,90",
        amazonLink: "https://amzn.to/3QJj4Dj"
    },
    {
        name: "Meia Masculina Kit 12 Pares Cano Alto Sport Algodão Tamanho 39 a 43",
        category: ["Roupas", "Todos"],
        image: "https://m.media-amazon.com/images/I/61dnjb5-VhL._AC_SX679_.jpg",
        price: "59,90",
        amazonLink: "https://amzn.to/461shLy"
    },
    {
        name: "Kit 5 Camisetas Masculinas Básicas Lisa Poliéster Premium",
        category: ["Roupas", "Todos"],
        image: "https://m.media-amazon.com/images/I/41CAIk6E-EL._AC_SX679_.jpg",
        price: "99,90",
        amazonLink: "https://amzn.to/3QKviLS"
    },
    {
        name: "Greenote Aspirador sem fios, aspirador de vara 23000PA 6 em 1, potente aspirador leve para casa de 200W com faróis LED, tempo de funcionamento de 35 minutos, chão duro, carro para animais de estimação",
        category: ["Casa", "Todos"],
        image: "https://m.media-amazon.com/images/I/61yqC+pw5gL._AC_SX425_.jpg",
        price: "1.594,78",
        amazonLink: "https://amzn.to/3Mth6V0"
    },
    {
        name: "Fritadeira Sem Óleo Air Fryer 4L, Mondial, Preto/Inox, 1500W, 110V ou 220 - AFN-40-BI",
        category: ["Cozinha", "Todos"],
        image: "https://m.media-amazon.com/images/I/71zeBuMlz2L._AC_SY879_.jpg",
        price: "369,00",
        amazonLink: "https://amzn.to/47mRUYt"
    },
    {
        name: "Processador AMD Ryzen 7 5800X, Cache 36MB, 3.8GHz (4.7GHz Max Turbo), AM4",
        category: ["Eletrônicos", "Todos"],
        image: "https://m.media-amazon.com/images/I/61IIbwz-+ML._AC_SX425_.jpg",
        price: "1.519,00",
        amazonLink: "https://amzn.to/466tpxw"
    },
    {
        name: "Kit Frio Conjunto Termico Pelinho Elasticidade Segunda Pele Unissex",
        category: ["Roupas", "Todos"],
        image: "https://m.media-amazon.com/images/I/512JffOdCBL._AC_SX679_.jpg",
        price: "R$77,99 - R$89,80",
        amazonLink: "https://amzn.to/40r1uHq"
    },
        // ... (outros produtos)
    ];
}

// Carrega os produtos
const products = getStoredProducts();

// Função para adicionar um produto à lista
function addProductToList(product, currentRow, category) {
    const listItem = document.createElement("li");
    const image = document.createElement("img");
    const name = document.createElement("p");
    const price = document.createElement("p");
    const buyButton = document.createElement("a");

    image.src = product.image;
    name.innerText = product.name;
    price.innerText = product.price;
    buyButton.innerText = "Comprar";
    buyButton.href = product.amazonLink;
    buyButton.target = "_blank";  // Abrir em uma nova aba

    // Adicione a classe 'price' ao elemento do preço
    price.classList.add("price");

    // Adicione o atributo data-category diretamente no item
    listItem.setAttribute("data-category", category);

    listItem.appendChild(image);
    listItem.appendChild(name);
    listItem.appendChild(price);
    listItem.appendChild(buyButton);

    currentRow.appendChild(listItem);
}

// Função para realizar a pesquisa
function search() {
    const searchTerm = document.getElementById("search").value.toLowerCase();
    const dynamicContent = document.getElementById("product-list");
    dynamicContent.innerHTML = '';

    let currentRow;
    let foundResults = false;

    for (const product of products) {
        // Verifica se o termo de pesquisa está presente no nome do produto
        if (product.name.toLowerCase().includes(searchTerm)) {
            if (!currentRow) {
                currentRow = document.createElement("div");
                currentRow.className = "product-row";
                dynamicContent.appendChild(currentRow);
            }
            addProductToList(product, currentRow, 'Pesquisa');
            foundResults = true;
        }
    }

    // Adiciona mensagem se nenhum resultado for encontrado
    if (!foundResults) {
        const noResultsMessage = document.createElement("p");
        noResultsMessage.innerText = "Nenhum resultado encontrado.";
        dynamicContent.appendChild(noResultsMessage);
    }
}

// Função para filtrar por preço
function filterByPrice() {
    const priceFilter = document.getElementById("price-filter").value;
    const dynamicContent = document.getElementById("product-list");
    dynamicContent.innerHTML = '';

    let currentRow;

    for (const product of products) {
        const productPrice = parseFloat(product.price.replace("R$", "").replace(",", "."));

        if ((priceFilter === "" || (priceFilter === "0-50" && productPrice <= 50) ||
            (priceFilter === "51-100" && productPrice > 50 && productPrice <= 100) ||
            (priceFilter === "101-200" && productPrice > 100 && productPrice <= 200))) {
            if (!currentRow) {
                currentRow = document.createElement("div");
                currentRow.className = "product-row";
                dynamicContent.appendChild(currentRow);
            }
            addProductToList(product, currentRow, 'Filtro');
        }
    }
}

// Função para ordenar os produtos
function sortBy() {
    const sortOrder = document.getElementById("sort-order").value;
    const dynamicContent = document.getElementById("product-list");
    dynamicContent.innerHTML = '';

    let sortedProducts = [...products];

    if (sortOrder === "recentes") {
        sortedProducts.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortOrder === "preco-asc") {
        sortedProducts.sort((a, b) => parseFloat(a.price.replace("R$", "").replace(",", ".")) - parseFloat(b.price.replace("R$", "").replace(",", ".")));
    } else if (sortOrder === "preco-desc") {
        sortedProducts.sort((a, b) => parseFloat(b.price.replace("R$", "").replace(",", ".")) - parseFloat(a.price.replace("R$", "").replace(",", ".")));
    }

    let currentRow;

    for (const product of sortedProducts) {
        if (!currentRow) {
            currentRow = document.createElement("div");
            currentRow.className = "product-row";
            dynamicContent.appendChild(currentRow);
        }
        addProductToList(product, currentRow, 'Ordenado');
    }
}


// Chamada inicial para carregar o conteúdo padrão (Todos os produtos)
window.addEventListener('load', function () {
    loadDynamicContent('Todos');
});

// Chamada inicial para carregar o conteúdo padrão (Todos os produtos)
// loadDynamicContent('Todos');

