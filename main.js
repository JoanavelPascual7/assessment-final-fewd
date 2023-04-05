
// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function







// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
  const select = document.getElementById("titles");
  const reviewForm = document.querySelector("form");
  const resetReviewsButton = document.getElementById("reset-reviews");
  const showPeopleButton = document.getElementById("show-people");
  const peopleList = document.getElementById("people-list");
  let moviePeople = [];

   fetch("https://resource-ghibli-api.onrender.com/films")
   .then(response => response.json())
   .then(data => {
       data.forEach( movie => {
           const option = document.createElement("option");
           option.value = movie.id;
           option.text = movie.title;
           select.appendChild(option);
       });

       select.addEventListener("change", (event) => {
           const movieId = event.target.value;
           const displayInfo = document.querySelector("#display-info");

           fetch(`https://resource-ghibli-api.onrender.com/films/${movieId}`)
           .then((response) => response.json())
           .then((movie) => {
               displayInfo.innerHTML = "";

               const title = document.createElement("h3");
               title.textContent = movie.title;
               displayInfo.appendChild(title);

               const releaseYear = document.createElement("p");
               releaseYear.textContent = `${movie.release_date}`;
               displayInfo.appendChild(releaseYear);

               const description = document.createElement("p");
               description.textContent = movie.description;
               displayInfo.appendChild(description);

               moviePeople = movie.people.map(personUrl => {
                   return fetch(`https://resource-ghibli-api.onrender.com${personUrl}`)
                           .then(response => response.json())
                           .then(person => person.name);
               });
           })
           .catch((error) => {
               console.error(error);
           });
       });

       reviewForm.addEventListener("submit", (event) => {
           event.preventDefault();
           const reviewInput = document.getElementById("review");
           const reviewText = reviewInput.value.trim();
           if (!select.value) {
               alert("Please select a movie first.");
               return;
           }
           if (reviewText) {
               const reviewList = document.getElementById("reviews-list");
               const movieTitle = select.options[select.selectedIndex].text;
               const newReview = document.createElement("li");
               const strongElement = document.createElement("strong");
               strongElement.textContent = movieTitle;
               newReview.appendChild(strongElement);
               newReview.appendChild(document.createTextNode(`: ${reviewText}`));
               reviewList.appendChild(newReview);
               reviewInput.value = "";
           }
       });

       resetReviewsButton.addEventListener("click", (event) => {
           const reviewList = document.getElementById("reviews-list");
           reviewList.innerHTML = "";
       });

       showPeopleButton.addEventListener("click", async () => {
           peopleList.innerHTML = "";
           const people = await Promise.all(moviePeople);
           const peopleListItems = people.map(person => {
               const listItem = document.createElement("li");
               listItem.textContent = person;
               return listItem;
           });
           peopleList.append(...peopleListItems);
       });
   })
   .catch((error) => {
       console.error(error);
   });
}

run();





// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);




// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);