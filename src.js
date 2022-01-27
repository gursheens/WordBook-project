document.getElementById("myInput").addEventListener("search", getWords);

async function getWords() {

    const container = document.querySelector('.container');
    const keyword = document.getElementById("myInput").value;
    const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + keyword;

    let response = await fetch(url);

    if (response.status === 200) {
        // handle data
        let html = '';
        let data = await response.json();
        data.forEach(result => {
            let htmlSegment = `
    <div class="card text-center m-4">
        <div class="card-header">
            ${result.word}
        </div>
        <div class="card-body">
            <h5 class="card-title">${result.phonetic}</h5>
            <p class="card-text">${result.origin}</p>
            <a href="#" class="btn btn-primary">Bookmark</a>
        </div>
    </div>`;

            html += htmlSegment;
        });

        container.innerHTML = html;
        console.log(data);
    } else {
        container.innerHTML = response.status
    }
}