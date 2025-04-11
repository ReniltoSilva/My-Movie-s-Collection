const apiKey = 'api_key=d85fc3f866e5fc77be2f384a028b16d3';
const apiURL = 'https://api.themoviedb.org/3/movie/16?api_key=d85fc3f866e5fc77be2f384a028b16d3'
const apiGenreURL = 'https://api.themoviedb.org/3/genre/movie/list?api_key=d85fc3f866e5fc77be2f384a028b16d3'
const apiPopular = 'https://api.themoviedb.org/3/movie/popular?api_key=d85fc3f866e5fc77be2f384a028b16d3&append_to_response=images,'
const searchAPI = 'https://api.themoviedb.org/3/search/keyword?query=${query}&page=1'
const genreApi = 'https://api.themoviedb.org/3/genre/movie/list?api_key=d85fc3f866e5fc77be2f384a028b16d3'
const apiPopularLocalHost = 'https://api.themoviedb.org/3/movie/popular?api_key=http://localhost:3000/movies&append_to_response=images,'
const homeGridContainer = document.querySelector('.main-Home-grid-container')

const searchBTN = document.querySelector('.search-button')
const searchInput = document.querySelector('.searchForm')


// FETCH MOVIES IN THE DOM WHEN CONTENT LOADS
document.addEventListener('DOMContentLoaded', fetchMovies(displayMovieHomePage))

//Here I fetch both APIs, notice that I can fetch an API inside another API being fetched.
//So, after one API is fetched the other one will be called after.
function fetchMovies(){

    fetch(apiPopular)
        .then(response => {
            if(!response.ok){
                throw new Error("Failed to fetch movies");
            }
            return response.json()

        })
        .then(data => {
                const mainHomeGrid = document.querySelector('.main-Home-grid-container')
                mainHomeGrid.innerHTML = '';

                let movieDataResults = data.results;
                console.log(movieDataResults)
                if(!movieDataResults || movieDataResults.length === 0){
                    console.error('No movies found')
                }

                //API to fetch Genre List
                fetch(genreApi)
                .then(resp => { 
                    //(!resp.ok) converts o boolean. Se a resposta for True, converte p/ false.
                    //se converter para false, executa o "return resp.json", 
                    //se converter para true, cai dentro do IF() e executa o código dentro dele.
                    if(!resp.ok){
                        throw new Error('Failed to fetch genres')
                    }
                    return resp.json()
                })
                .then(genreData => {
                    let genreList = genreData.genres
                    if(!genreList || genreList.length === 0){
                        console.log('No genres found')
                    }

                    displayMovieHomePage(movieDataResults, genreList)
                })
                .catch(err => console.log('Genre Fetch Error:', err))
        })
        
    .catch(err => console.log('Movie Fetch Error:', err))
}



//FETCH MOVIES IN THE DOM WHEN SEARCH BUTTON IS CLICKED

//In this function I will fetch both APIs(This time using Promise.all which is the same thing as calling them separate) 
//Then I pass in displayMovieHomePage as a callback with the data from both fetched APIs.
searchBTN.addEventListener('click', () => fetchMoviesSearch(displayMovieHomePage))
        

function fetchMoviesSearch(){

    const inputValue = searchInput.value;

    if(inputValue === ''){

        alert("Please, write something") 
        
        }else{
            const searchAPI = `https://api.themoviedb.org/3/search/movie?api_key=d85fc3f866e5fc77be2f384a028b16d3&language=en-US&query=${inputValue}&page=1`;
            const genreApi = 'https://api.themoviedb.org/3/genre/movie/list?api_key=d85fc3f866e5fc77be2f384a028b16d3'

            //This is to clean the home screen from previous search.
            homeGridContainer.innerHTML = ''

            // Fetch both movies and genres in parallel
            Promise.all([
                fetch(searchAPI).then(response => response.json()),//Fetch movies
                fetch(genreApi).then(resp => resp.json())//Fetch genres
            ])

            .then(([movieData, genreData]) => {
                const movieDataResults = movieData.results;
                const genreList = genreData.genres;

                displayMovieHomePage(movieDataResults, genreList)
            })
            .catch(err => {
                console.log('Error:', err);
            });
    }
}


//---------------------------------------------DISPLAY MOVIES ON SCREEN FUNCTION-----------------------------//
const arrListMovies = [];

function displayMovieHomePage(movieDataResults, genreList){

        const genreIdToName = {}

        genreList.forEach((genre) => {
            genreIdToName[genre.id] = genre.name
        })
        console.log(genreIdToName)

        movieDataResults.forEach(movie => {

            const genreMovies = movie.genre_ids; // Array of genre IDs for each movie

            const movieYear = new Date(movie.release_date).getFullYear();

            const movieContainer = document.createElement('div')
            movieContainer.classList.add('movie-grid-container')

            const moviePoster = movie.poster_path
            const movieBackdropPath = movie.backdrop_path
            const movieOverview = movie.overview

                // Create an array to store the genre names for this movie
                //Here, map is looking for the element(genreId) inside array genreMovies and comparing to genreId in the genreIdToName
                //and returnin the value to the new array genreNames
                // const genreNames = genreMovies.map((genreId) => {
                // return genreIdToName[genreId]
                // });

                const genreNames = genreMovies
                .map((genreId) => genreIdToName[genreId])
                .map((element) => `<p class="${element}">${element.toUpperCase()}</p>`)
  
                movieContainer.innerHTML = `
                        <div class="img-container">
                            <div class="littleIconContainer">
                            <img src="little icon.svg" class="littleIconMenu">
                                <div class="dropdownMenuContainer">
                                ${dropdownMenuContent(movie.title)}                          
                                </div>
                            </div>
                                ${displayMoviePoster(moviePoster, movieBackdropPath, movieOverview, genreNames)}
                            </div>
                        </div>
            
                        <div class="info-container">
                            <p class="movie-title">${movie.title}</p>
                            <p class="movie-year">${movieYear}</p>
                        </div>`
                    
                    // Attach event listener to the icon AFTER inserting it into the DOM
                    const littleIcon = movieContainer.querySelector('.littleIconMenu');
                    littleIcon.addEventListener('click', () => {
                        
                        

                    });
                homeGridContainer.appendChild(movieContainer)
        })
}


function dropdownMenuContent(movieTitleParam){

    return  `
        <a href="#" class="dropDownContent" 
        onclick="arrListMovies.push('${movieTitleParam}'); 
        console.log('${movieTitleParam} is added to the list'); 
        localStorage.setItem('MovieList', JSON.stringify(arrListMovies))">List one</a>
        
        
        <a href="#" class="dropDownContent createNewList" 
        onclick="const listName = prompt('Enter list name'); 
        console.log(listName)">New list +</a>
        `
}

function displayMoviePoster(moviePoster, movieBackdropPath, movieOverview, genreNames){

    return  `
        <img class="imgPoster" src="https://image.tmdb.org/t/p/w500${moviePoster || movieBackdropPath}" alt="" />
        <div class="figcaptionContainer">
        <p class="contentFigcaption">${movieOverview}</p>
        <div class="genreOneFigCaption">
        ${genreNames.join('')}
        </div>
        `
}





// EXERCISE 1
const countries = [
    { code: "US", name: "United States" },
    { code: "BR", name: "Brazil" },
    { code: "FR", name: "France" }
];

const lookUpObj = {}

countries.forEach((element) => {
   
    lookUpObj[element.code] = element.name
})

console.log(lookUpObj)



//EXERCISE 2
const userss = {
    101: "Alice",
    102: "Bob",
    103: "Charlie"
};

const userIDs = [102, 101, 103]; 

const newUserArray = userIDs.map((element) => {
    return userss[element]
})

console.log(newUserArray)



//EXERCISE 3
const productLookup = {
    1: "Laptop",
    2: "Keyboard",
    3: "Mouse",
    4: "Monitor"
};

const cartItems = [1, 3, 2, 4, 3];

const arrayObjects = cartItems.map((element) => {
    return productLookup[element]
})

console.log(arrayObjects)



// EXERCISE 4
const students = [
    { id: 201, name: "Lucas" },
    { id: 202, name: "Emma" },
    { id: 203, name: "Olivia" }
];

const grades = {
    201: "A",
    203: '',
    202: 'A+'
};

// const arrayStudents = []

// students.map((element) => {
//     arrayStudents.push({
//         name: element.name,
//         grade: grades[element.id] || 'N/A'
//     })
// })

// console.log(arrayStudents)

//IT ALSO CAN BE DONE THIS WAY, WITHOUT USING PUSH() BUT THEN YOU NEED THE KEYWORD "RETURN"
//IF YOU ARE NOT USING THE "RETURN" THAN IT'S JUST BEST TO USE THE "FOREACH" BECAUSE IT'S NOT THE RIGHT METHOD.
const newGrades = students.map((element) => {
    return {
        name: element.name,
        grade: grades[element.id]
    }
})
console.log(newGrades)


//EXERCISE 5
const departmentLookup = {
    10: "Engineering",
    20: "HR",
    30: "Marketing"
};

const employees = [
    { name: "Alice", departmentId: 10 },
    { name: "Bob", departmentId: 20 },
    { name: "Charlie", departmentId: 30 },
    { name: "David", departmentId: 10 }
];

const newDepartment = employees.map((element) => {
    return {
        name: element.name,
        departmentId: departmentLookup[element.departmentId]
    }
})
console.log(newDepartment)

//EXERCISE 6
const daysLookup = {
    Mon: "Monday",
    Tue: "Tuesday",
    Wed: "Wednesday",
    Thu: "Thursday",
    Fri: "Friday",
    Sat: "Saturday",
    Sun: "Sunday"
};

// const messages = [
//     "Meeting on Mon",
//     "Gym on Tue",
//     "Party on Fri",
//     "Study on Sun"
// ];

const messages = [
    "Mon I got to work",
    "Tue is day off",
    "Fri is a busy day",
    "Sun I got to study"
];

const updatedMessages = messages.map(element => {
    // Extract the last 3 characters (Mon, Tue, etc.)
    const abbrev = element.slice(0, 3); 

    // Replace abbreviation with full name
    return element.replace(abbrev, daysLookup[abbrev]);
});

console.log(updatedMessages)

//EXERCISE 7
const roles = {
    1: "Admin",
    2: "Editor",
    3: "Viewer"
};

const users = [
    { id: 101, name: "Alice", roleId: 1 },
    { id: 102, name: "Bob", roleId: 3 },
    { id: 103, name: "Charlie", roleId: 2 }
];


const newRole = users.map((role) => {
    return {
        id: role.id,
        name: role.name,
        roleId: roles[role.roleId]
    }
})

console.log(newRole)


//EXERCISE 8: Convert Temperature Units
const tempsInCelsius = [0, 10, 20, 30, 40];

let tempConverted = []

function celsiusToFahrenheit(celsius) {
    tempConverted = celsius.map(element => (element * 9/5) + 32)
    console.log(tempConverted)
}

celsiusToFahrenheit(tempsInCelsius)


//EXERCISE 9: Group Students by Grade
//1 - convert to an object
//2 - Where grade is the key
//3 - and value is array of students who got that grade

const studentGrades = [
    { name: "Alice", grade: "A" },
    { name: "Bob", grade: "B" },
    { name: "Charlie", grade: "A" },
    { name: "David", grade: "C" },
    { name: "Eve", grade: "B" }
];

const groupedByGrade = studentGrades.reduce((acc, student) => {
    const grade = student.grade;
    const name = student.name;
    // If the grade key doesn't exist in the object yet, initialize it
    if (!acc[grade]) {
        acc[grade] = [];
    }
    // Add the student name to the correct grade group
    acc[grade].push(name);

    return acc;
}, {});

console.log(groupedByGrade)


//EXERCISE 10: Convert an Array of Orders into a Lookup Object
const orders = [
    { id: "A123", customer: "Alice", total: 50 },
    { id: "B456", customer: "Bob", total: 30 },
    { id: "C789", customer: "Charlie", total: 20 }
];

let newOrrObjLookup = {}


orders.forEach((element) => {
    newOrrObjLookup[element.id] = {
        customer: element.customer, 
        total: element.total
    }
})

console.log(newOrrObjLookup)

// const newOrdersArray = {}

// const newArrOrders = orders.map((element) => {

//         return [element.id]: {
//             customer: element.customer,
//             total: element.total
//         }
// })
// console.log(newArrOrders)


const largeArr = new Array(500).fill('Juninho')
const arrExample = ['Dory', 'Junior','Maria', 'Nemo', 'ddd', 'qqqq', 'Isaias']

function perfArray(param){
    for(let i = 0; i <= param.length; i++){
        console.log(param[i])
        if(param[i] === 'Junior'){
            console.log(`Found Junior at index ${i}`)
            break //Use break to prevent the loop from keep running after finding the result, good for performance.
        }}
}

perfArray(arrExample)


const boxes = [3,6,8,23,5,12,54,365,3,1,0,4,24, 10]

function nestedLoops(array){
    let bigN = []
    let smallN = []

    for(let i = 0; i < array.length; i++){
        if(array[i] > 10){
            bigN.push(array[i])
        }else{
            smallN.push(array[i])
        }
    }
    console.log(bigN)
    console.log(smallN)
}


nestedLoops(boxes)