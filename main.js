





// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
    fetch("https://resource-ghibli-api.onrender.com/films")
    .then(response => response.json())
    .then(data => {
        const select = document.getElementById("titles");
        data.forEach( movie => {
            const option = document.createElement("option");
            option.value = movie.id;
            option.text = movie.title;
            select.appendChild(option);
      
        });
    })
    .catch(error => {
        console.error(error)
    })
}

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
