function testInput() {
    let word_input = document.getElementById("word_input")

    console.log("DOM ELEMENT FOR WORD INPUT")
    console.log(word_input)

    console.log("DOM ELEMENT VALUE FOR WORD INPUT")
    console.log(word_input.value)

    console.log("BUILD URL FOR API")
    let url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + word_input.value
    console.log(url)

    fetch(url)
        .then(response => {
            console.log("RESPONSE BEFORE PARSE FROM TXT TO JSON")
            console.log(response)
            return response.json();
        })
        .then(data => {
            console.log("PARSED RESPONSE")
            console.log(data)

            console.log("GET FIRST ELEMENT OF ARRAY")
            console.log(data[0])

            console.log("GET FIRST ELEMENT OF ARRAY")
            console.log(data[0])

            console.log("GET FIELD")
            console.log(data[0].origin)

            console.log("LOAD IT ON THE PAGE!!!!")

            //document.getElementById("big_word").innerHTML = data[0].word
            //document.getElementById("word_origin").innerHTML = data[0].origin


            const html = // create and set html code for respective space photo
                `
              <div class="dictionary">
                <h1>${data[0].word}</h1>
                <p>${data[0].origin}</p>
              </div>
             `

            //append space photo html to page
            document.querySelector("#dictionary").insertAdjacentHTML("afterbegin", html);



        })

}