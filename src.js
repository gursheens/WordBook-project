// bind search event listener to searchbar
document.getElementById("myInput").addEventListener("search", getWord);

async function getWord() {

    // initialize constant-variables
    const container = document.querySelector('.container');
    const keyword = document.getElementById("myInput").value;
    const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + keyword;

    // save fetch result to response
    let response = await fetch(url);

    // if fetch is successful do the following
    if (response.status === 200) {

        // initialize empty html string
        let html = '';

        // save response from fetch to data
        let data = await response.json();

        // for each word in data - 1. generate a HTML code block with word information 2. Add to empty HTML string initializeed above
        data.forEach((result, index) => {
            let htmlSegment = `
                <div class="card text-center m-4">
                    <div class="card-header">
                        ${result.word}
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">${result.phonetic}</h5>
                        <p class="card-text">${result.origin}</p>
                        <div>
                            <audio controls>
                                <source src="${result.phonetics[0].audio}" type="audio/mpeg">
                            </audio>
                        </div>
                        <button class="btn border border-dark mt-5" onclick="bookmarkWord(event)">Bookmark</button>
                    </div>
                </div>`;

            html += htmlSegment;
        });

        // append html to the main results container
        container.innerHTML = html;
    } else {
        container.innerHTML = `
        <div class="container p-5 text-center">
            <a href="/">
                <img src="404.gif" alt="" srcset="">
            </a>
        </div>
        `
    }
}


function bookmarkWord(event) {
    let el = event.target.innerHTML;
    if (el === 'Bookmark') {
        // change text
        event.target.innerHTML = 'Bookmarked'
        // append class to change color
        event.target.classList.add('btn-success');
        // add to database
    } else {
        event.target.innerHTML = 'Bookmark'
        event.target.classList.remove('btn-success');
    }
}