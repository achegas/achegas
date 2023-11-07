// produtos.js
// Substitua a importação da função format do money-formatter por esta linha
const formatMoney = (value) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

// Função para obter produtos do localStorage ou usar produtos padrão
function getStoredProducts() {
    const storedProducts = localStorage.getItem('products');
    return storedProducts ? JSON.parse(storedProducts) : getDefaultProducts();
}

// Função auxiliar para verificar se o preço está dentro da faixa selecionada
function isPriceInRange(productPrice, selectedValue) {
    const [max] = selectedValue.split("-").map(value => parseFloat(value.replace(",", ".")));

    return !isNaN(productPrice) && productPrice <= max;
}


// Função para obter produtos padrão
function getDefaultProducts() {
    return [
        {  
            name: "Mouse Gamer",
            category: ["Eletrônicos", "Todos"],
            image: "https://m.media-amazon.com/images/I/71gbhPToXdL._AC_SX425_.jpg",
            price: "R$ 22,90",
            amazonLink: "https://amzn.to/3QJj4Dj",
            date: new Date("2023-10-06"), // Adicione uma data para representar a data de lançamento
        },
        {
            name: "Meia Masculina Kit 12 Pares Cano Alto Sport Algodão Tamanho 39 a 43",
            category: ["Roupas", "Todos"],
            image: "https://m.media-amazon.com/images/I/61dnjb5-VhL._AC_SX679_.jpg",
            price: "R$ 59,90",
            amazonLink: "https://amzn.to/461shLy",
            date: new Date("2023-10-06"), // Adicione uma data para representar a data de lançamento
        },
        {
            name: "Kit 5 Camisetas Masculinas Básicas Lisa Poliéster Premium",
            category: ["Roupas", "Todos"],
            image: "https://m.media-amazon.com/images/I/41CAIk6E-EL._AC_SX679_.jpg",
            price: "R$ 99,90",
            amazonLink: "https://amzn.to/3QKviLS",
            date: new Date("2023-10-05"), // Adicione uma data para representar a data de lançamento
        },
        {
            name: "Greenote Aspirador sem fios, aspirador de vara 23000PA 6 em 1, potente aspirador leve para casa de 200W com faróis LED, tempo de funcionamento de 35 minutos, chão duro, carro para animais de estimação",
            category: ["Casa", "Todos"],
            image: "https://m.media-amazon.com/images/I/61yqC+pw5gL._AC_SX425_.jpg",
            price: "R$ 1.594,78",
            amazonLink: "https://amzn.to/3Mth6V0",
            date: new Date("2023-10-05"), // Adicione uma data para representar a data de lançamento
        },
        {
            name: "Fritadeira Sem Óleo Air Fryer 4L, Mondial, Preto/Inox, 1500W, 110V ou 220 - AFN-40-BI",
            category: ["Cozinha", "Todos"],
            image: "https://m.media-amazon.com/images/I/71zeBuMlz2L._AC_SY879_.jpg",
            price: "R$ 369,00",
            amazonLink: "https://amzn.to/47mRUYt",
            date: new Date("2023-10-05"), // Adicione uma data para representar a data de lançamento
        },
        {
            name: "Processador AMD Ryzen 7 5800X, Cache 36MB, 3.8GHz (4.7GHz Max Turbo), AM4",
            category: ["Eletrônicos", "Todos"],
            image: "https://m.media-amazon.com/images/I/61IIbwz-+ML._AC_SX425_.jpg",
            price: "R$ 1.519,00",
            amazonLink: "https://amzn.to/466tpxw",
            date: new Date("2023-10-05"), // Adicione uma data para representar a data de lançamento
        },
        {
            name: "Kit Frio Conjunto Termico Pelinho Elasticidade Segunda Pele Unissex",
            category: ["Roupas", "Todos"],
            image: "https://m.media-amazon.com/images/I/512JffOdCBL._AC_SX679_.jpg",
            price: "R$ 89,80",
            amazonLink: "https://amzn.to/40r1uHq",
            date: new Date("2023-10-05"), // Adicione uma data para representar a data de lançamento
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
    
    	const numericPrice = parseFloat(product.price.replace("R$", "").replace(".", "").replace(",", "."));
    	
    price.innerText = formatMoney(product.price);
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

        document.getElementById("search").addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                search();
            }
        });

        const menuButtons = document.querySelectorAll('nav a');

        function setActiveButton(button) {
            menuButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        }

        menuButtons.forEach(button => {
            button.addEventListener('click', function () {
                setActiveButton(button);
                loadDynamicContent(button.innerText, button.innerText.toLowerCase());
            });
        });

        function loadDynamicContent(category, categoryClass) {
            const dynamicContent = document.getElementById("product-list");
            dynamicContent.innerHTML = '';

            document.getElementById("search").value = '';

            let currentRow;

            for (const product of products) {
                if (category === 'Inicio' || product.category.includes(category)) {
                    if (!currentRow) {
                        currentRow = document.createElement("div");
                        currentRow.className = "product-row " + categoryClass;  
                        dynamicContent.appendChild(currentRow);
                    }
                    addProductToList(product, currentRow, categoryClass);  
                }
            }
        }

        const priceRangeInput = document.getElementById("price-range");
        priceRangeInput.addEventListener("input", updatePriceRange);

        function updatePriceRange() {
            const selectedPriceElement = document.getElementById("selected-price");
            const selectedValue = priceRangeInput.value.replace(",", ".");
            const numericValue = parseFloat(selectedValue);

            if (!isNaN(numericValue)) {
                selectedPriceElement.innerText = `R$ 0 - R$ ${numericValue.toFixed(2)}`;
                filterByPriceRange(numericValue);
            } else {
                console.error("Invalid price range value");
            }
        }

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
            buyButton.target = "_blank";

            price.classList.add("price");

            listItem.setAttribute("data-category", category);

            listItem.appendChild(image);
            listItem.appendChild(name);
            listItem.appendChild(price);
            listItem.appendChild(buyButton);

            currentRow.appendChild(listItem);
        }

        function search() {
            const searchTerm = document.getElementById("search").value.toLowerCase();
            const dynamicContent = document.getElementById("product-list");
            dynamicContent.innerHTML = '';

            let currentRow;
            let foundResults = false;

            for (const product of products) {
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

            if (!foundResults) {
                const noResultsMessage = document.createElement("p");
                noResultsMessage.innerText = "Nenhum resultado encontrado.";
                dynamicContent.appendChild(noResultsMessage);
            }
        }

        function filterByPriceRange(rangeValue) {
            const dynamicContent = document.getElementById("product-list");
            dynamicContent.innerHTML = '';

            let currentRow;
            let foundResults = false;

            for (const product of products) {
                const productPrice = parseFloat(product.price.replace("R$", "").replace(".", "").replace(",", "."));

                if (!isNaN(productPrice) && productPrice <= rangeValue) {
                    if (!currentRow) {
                        currentRow = document.createElement("div");
                        currentRow.className = "product-row";
                        dynamicContent.appendChild(currentRow);
                    }
                    addProductToList(product, currentRow, 'Filtro');
                    foundResults = true;
                }
            }

            if (!foundResults) {
                const noResultsMessage = document.createElement("p");
                noResultsMessage.innerText = "Nenhum resultado encontrado.";
                dynamicContent.appendChild(noResultsMessage);
            }
        }

        function sortBy() {
            const sortOrder = document.getElementById("sort-order").value;
            const dynamicContent = document.getElementById("product-list");
            dynamicContent.innerHTML = '';

            let sortedProducts = [...products];

            if (sortOrder === "recentes") {
                sortedProducts.sort((a, b) => new Date(b.date) - new Date(a.date));
            } else if (sortOrder === "preco-asc") {
                sortedProducts.sort((a, b) => {
                    const priceA = parseFloat(a.price.replace("R$", "").replace(".", "").replace(",", "."));
                    const priceB = parseFloat(b.price.replace("R$", "").replace(".", "").replace(",", "."));
                    return priceA - priceB;
                });
            } else if (sortOrder === "preco-desc") {
                sortedProducts.sort((a, b) => {
                    const priceA = parseFloat(a.price.replace("R$", "").replace(".", "").replace(",", "."));
                    const priceB = parseFloat(b.price.replace("R$", "").replace(".", "").replace(",", "."));
                    return priceB - priceA;
                });
            } else if (sortOrder === "todos") {
                // Não faz nada, mantém a ordem original
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

        window.addEventListener('load', function () {
            loadDynamicContent('Todos');

            // Corrige o carregamento inicial dos produtos
            const activeButton = document.querySelector('.active');
            if (activeButton) {
                const category = activeButton.innerText;
                const categoryClass = category.toLowerCase();
                loadDynamicContent(category, categoryClass);
            }
        });
