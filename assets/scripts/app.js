let pageCount = 1;
let publishedChars;

getCharacterListFromServer(true);

function getCharacterListFromServer(isNewSearch) {
    if (isNewSearch) {
        pageCount = 1;
    }
    axios.get(`https://rickandmortyapi.com/api/character` + getSearchParams())
        .then(response => {  
            if (response.data && response.data.results) {
                if (isNewSearch) {
                    publishedChars = prepareCardMarkdown (response.data.results);
                } else {
                    publishedChars += prepareCardMarkdown(response.data.results);
                }
            const container = document.getElementById('charactersList');
            if (container) {
                container.innerHTML = publishedChars;
                console.log(response);
                document.getElementById('howManyCharsAtAll').innerHTML = `${response.data.info.count}`;
            } else {
                console.error('Разработчик, ну что же ты! Одумойся');    
            }
            } else {
                alert('Odumoisa');
            }
        })
        .catch(err => {
            console.error(err);
        })

}

function getSearchParams() {
    const searchName = document.querySelector('#searchName').value;

    const searchStatus = document.querySelector('#searchStatus').value;

    const searchGender = document.querySelector('#searchGender').value;

    if (!searchGender && !searchStatus && !searchName) {
        const result = `?page=${pageCount}`;
        pageCount++;

        return result;
    }

    let result = `/?`;

    if (searchName) {
        result += `name=${searchName}&`;
    }

    if (searchStatus) {
        result += `status=${searchStatus}&`;
    }

    if (searchGender) {
        result += `gender=${searchGender}&`;
    }

    result += `page=${pageCount}`;
    pageCount++;

    return result;

}

function prepareCardMarkdown(characterList) {
    let result = '';

    characterList.forEach(character => {
         result +=
        `<div class="col-sm-6">
            <div class="card mb-3" style="
                                        background-color: #2e2e2e;
                                        color: white;">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img style=" max-width:170px" src="${character.image}" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${character.name}</h5>
                            <div class="d-flex justify-content-start align-items-center">
                                <div id="js-status" class="life__trigger ${character.status}" style="margin-right: 10px;"></div>
                                    <p class="card-text">${character.status} - ${character.gender}</p>
                                </div>
                                <h6 class="text-secondary mb-0">Последняя локация</h6>
                                <p class="mb-0">${character.location.name}</p>
                                <h6 class="text-secondary mb-0">Первое появление</h6>
                                <p class="mb-0"></p>
                                <p class="card-text"><small class="text-muted"></small></p>
                            </div>
                        </div>
                    </div>
                </div>
         </div>`
    })

    return result;
}