// script.js

document.addEventListener('DOMContentLoaded', () => {
    const itemsContainer = document.getElementById('items-container');
    const itemCountSelect = document.getElementById('item-count');
    
    // Dados dos itens
    const itemData = [
        {
            class: 'container1',
            imageClass: 'imagem1',
            descontoClass: 'desconto30',
            descontoText: '-30%',
            name: 'Syltherine',
            description: 'Stysh cafe chair',
            price: 'Rp 2.500.000',
            oldPrice: 'Rp 3.500.000',
            priceValue: 2500000
        },
        {
            class: 'container2',
            imageClass: 'imagem2',
            descontoClass: null,
            descontoText: null,
            name: 'Leviosa',
            description: 'Stysh cafe chair',
            price: 'Rp 2.500.000',
            oldPrice: null,
            priceValue: 2500000
        },
        {
            class: 'container3',
            imageClass: 'imagem3',
            descontoClass: 'desconto50',
            descontoText: '-50%',
            name: 'Lolito',
            description: 'Luxury big sofa',
            price: 'Rp 7.000.000',
            oldPrice: 'Rp 14.000.000',
            priceValue: 7000000
        },
        {
            class: 'container4',
            imageClass: 'imagem4',
            descontoClass: 'newverde',
            descontoText: 'New',
            name: 'Respira',
            description: 'Outdoor bar table and stool',
            price: 'Rp 500.000',
            oldPrice: null,
            priceValue: 500000
        }
    ];
  
    // Função para criar um item com base nos dados fornecidos
    function createItem(data) {
        const item = document.createElement('div');
        item.classList.add(data.class);
  
        const image = document.createElement('div');
        image.classList.add(data.imageClass);
        item.appendChild(image);
  
        if (data.descontoClass && data.descontoText) {
            const desconto = document.createElement('div');
            desconto.classList.add(data.descontoClass);
            desconto.textContent = data.descontoText;
            item.appendChild(desconto);
        }
  
        const textContainer = document.createElement('div');
        textContainer.classList.add('textcontainer');
  
        const name = document.createElement('h2');
        name.classList.add('sylt');
        name.textContent = data.name;
        textContainer.appendChild(name);
  
        const description = document.createElement('p');
        description.classList.add('stysh');
        description.textContent = data.description;
        textContainer.appendChild(description);
  
        const priceContainer = document.createElement('div');
        priceContainer.classList.add('priscado');
  
        const price = document.createElement('p');
        price.classList.add('p1');
        price.textContent = data.price;
        priceContainer.appendChild(price);
  
        if (data.oldPrice) {
            const oldPrice = document.createElement('p');
            oldPrice.classList.add('preçoriscado');
            oldPrice.textContent = data.oldPrice;
            priceContainer.appendChild(oldPrice);
        }
  
        textContainer.appendChild(priceContainer);
        item.appendChild(textContainer);
  
        return item;
    }
  
    // Função para popular os itens com base na quantidade selecionada
    function populateItems(itemsPerPage) {
        itemsContainer.innerHTML = '';
        for (let i = 0; i < itemsPerPage; i++) {
            const data = itemData[i % itemData.length]; // Repete os itens se necessário
            itemsContainer.appendChild(createItem(data));
        }
    }
  
    // Atualiza a exibição dos itens ao mudar a seleção
    itemCountSelect.addEventListener('change', (e) => {
        const itemsPerPage = parseInt(e.target.value);
        populateItems(itemsPerPage);
    });
  
    // Inicializa com o valor padrão de itens
    const initialItemsPerPage = 12; // Definindo o valor inicial padrão de 12
    populateItems(initialItemsPerPage);

    // Configura o seletor de contagem de itens para permitir alteração dinâmica
    function setupItemCountSelect() {
        itemCountSelect.innerHTML = ''; // Limpa as opções existentes
        const options = [4, 8, 12, 16, 20];
        options.forEach(option => {
            const optElement = document.createElement('option');
            optElement.value = option;
            optElement.textContent = option;
            if (option === initialItemsPerPage) {
                optElement.selected = true;
            }
            itemCountSelect.appendChild(optElement);
        });
    }
    setupItemCountSelect();
  
    // Função para ordenar e exibir os itens
    function sortItems(criteria) {
        let sortedData = [];
        switch (criteria) {
            case 'az':
                sortedData = itemData.slice().sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'za':
                sortedData = itemData.slice().sort((a, b) => b.name.localeCompare(a.name));
                break;
            case 'low-to-high':
                sortedData = itemData.slice().sort((a, b) => a.priceValue - b.priceValue);
                break;
            case 'high-to-low':
                sortedData = itemData.slice().sort((a, b) => b.priceValue - a.priceValue);
                break;
        }
        itemsContainer.innerHTML = '';
        sortedData.forEach(data => {
            itemsContainer.appendChild(createItem(data));
        });
    }

    // Adiciona evento aos selects de ordenação
    document.addEventListener('change', (e) => {
        if (e.target.matches('#filter-options select')) {
            sortItems(e.target.value);
        }
    });

    // Manipulação de exibição do filtro
    const filterHeader = document.querySelector('.começofilter');
    const filterOptionsContainer = document.getElementById('filter-options');
    
    filterHeader.addEventListener('click', () => {
        if (filterOptionsContainer.style.display === 'none') {
            filterOptionsContainer.style.display = 'block';
            populateSelects();
        } else {
            filterOptionsContainer.style.display = 'none';
        }
    });

    function populateSelects() {
        // Limpa qualquer conteúdo existente
        filterOptionsContainer.innerHTML = '';

        // Cria o primeiro select com as opções A-Z e Z-A
        const orderSelect = document.createElement('select');
        const optionAZ = document.createElement('option');
        optionAZ.value = 'az';
        optionAZ.textContent = 'A-Z';

        const optionZA = document.createElement('option');
        optionZA.value = 'za';
        optionZA.textContent = 'Z-A';

        orderSelect.appendChild(optionAZ);
        orderSelect.appendChild(optionZA);

        // Cria o segundo select com as opções de preço
        const priceSelect = document.createElement('select');
        const optionHighToLow = document.createElement('option');
        optionHighToLow.value = 'high-to-low';
        optionHighToLow.textContent = 'Maior preço - Menor preço';

        const optionLowToHigh = document.createElement('option');
        optionLowToHigh.value = 'low-to-high';
        optionLowToHigh.textContent = 'Menor preço - Maior preço';

        priceSelect.appendChild(optionHighToLow);
        priceSelect.appendChild(optionLowToHigh);

        // Adiciona os selects ao contêiner
        filterOptionsContainer.appendChild(orderSelect);
        filterOptionsContainer.appendChild(priceSelect);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Seleciona o input de email
    const emailInput = document.getElementById('email-input');

    // Função para validar o email usando expressão regular (regexp)
    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // Adiciona um evento de clique ao botão de inscrição
    const subscribeButton = document.querySelector('.butaofinal');
    subscribeButton.addEventListener('click', () => {
        const email = emailInput.value.trim();
        if (validateEmail(email)) {
            alert("Pronto, seu email foi validado!");
        } else {
            alert("Ops, o seu modelo de email não é válido");
        }
    });
});
