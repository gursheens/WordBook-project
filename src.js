// bind search event listener to searchbar
document.getElementById("myInput").addEventListener("search", getWord);

async function getWord() {

    // initialize constant-variables
    const keyword = document.getElementById("myInput").value;
    const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + keyword;

    // save fetch result to response
    let response = await fetch(url);

    console.log(response)

    // if fetch is successful do the following
    if (response.status === 200) {

        // save response from fetch to data
        let data = await response.json();

        // initialize empty html string
        let html = '';

        // for each word in data - 1. generate a HTML code block with word information 2. Add to empty HTML string initializeed above
        data.forEach(result => {

            let obj = {
                name: result.word,
                phonetic: result.phonetic,
                origin: result.origin,
                audio: result.phonetics[0].audio
            }            

            html += cardHTML(obj, false);
        });

        // append html to the main results container
        results.innerHTML = html;
    } 
    
    if (response.status === 404){
        results.innerHTML = `
        <div class="container p-5 text-center">
            <a href="/">
                <img src="404.gif" alt="" srcset="">
            </a>
        </div>
        `
    }
}

function cardHTML(obj, bookmarks) {
    return `<div class="card text-center my-4 py-4">
                <div class="card-body">
                    <h5 class="card-title">${obj.name}</h5>
                    <h5 class="card-title">${obj.phonetic || 'Phonetic not available for this result'}</h5>
                    <p class="card-text">${obj.origin || 'Origin not available for this result'}</p>
                    <div data-audio-url="${obj.audio || '#'}">
                        <audio controls src="${obj.audio || '#'}">
                                Your browser does not support the <code>audio</code> element.
                        </audio>
                    </div>
                    ${ bookmarks ? `<button class="btn btn-dark border border-dark mt-5" onclick="bookmarkWord(event)">remove bookmark</button>`: `<button class="btn border border-dark mt-5" onclick="bookmarkWord(event)">bookmark</button>` }
                </div>
            </div>`;
}

function bookmarkWord(event) {
    let el = event.target.innerHTML;
    if (el === 'bookmark') {
        // change text
        event.target.innerHTML = 'remove bookmark'
        // append class to change color
        event.target.classList.add('btn-dark');
        // add to database
        addWord(event);
    } else {
        // change text
        event.target.innerHTML = 'bookmark'
        // append class to change color
        event.target.classList.remove('btn-dark');
        // remove from database
        deleteWord(event)
    }
}


function showBookmarks(event) {
    let el = event.target.innerHTML;
    if (el === 'view bookmarks') {
        // change text
        event.target.innerHTML = 'go back'
    } else {
        // change text
        event.target.innerHTML = 'view bookmarks'
    }
}