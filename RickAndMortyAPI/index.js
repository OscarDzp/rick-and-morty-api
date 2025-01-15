let currentPage = 1;

function getCharacters(page = 1) {
    fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
        .then(response => response.json())
        .then(data => {
            renderCharacters(data.results);
            updatePagination(data.info);
        });
}

function renderCharacters(characters) {
    const main = document.querySelector("main");
    main.innerHTML = ""; // Clear existing characters

    characters.forEach(character => {
        const article = document.createRange().createContextualFragment(`
            <article class="character-card">
                <div class="image-container">
                    <img src="${character.image}" alt="${character.name}">
                </div>
                <div class="character-info">
                    <h2>${character.name}</h2>
                    <p>Status: <span class="${character.status.toLowerCase()}">${character.status}</span></p>
                    <p>Species: ${character.species}</p>
                    <p>Location: ${character.location.name}</p>
                </div>
            </article>
        `);
        main.appendChild(article);
    });
}

function updatePagination(info) {
    const prevButton = document.getElementById("prev");
    const nextButton = document.getElementById("next");

    prevButton.disabled = !info.prev;
    nextButton.disabled = !info.next;

    prevButton.onclick = () => {
        currentPage--;
        getCharacters(currentPage);
    };

    nextButton.onclick = () => {
        currentPage++;
        getCharacters(currentPage);
    };
}

// Initial fetch
getCharacters();
