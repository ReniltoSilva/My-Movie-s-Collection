const apiKey = 'd85fc3f866e5fc77be2f384a028b16d3';
const apiURL = 'https://api.themoviedb.org/3/movie/16?api_key=d85fc3f866e5fc77be2f384a028b16d3'
const apiGenreURL = 'https://api.themoviedb.org/3/genre/movie/list?api_key=d85fc3f866e5fc77be2f384a028b16d3'
const apiPopular = 'https://api.themoviedb.org/3/movie/popular?api_key=d85fc3f866e5fc77be2f384a028b16d3&&append_to_response=images'
const searchAPI = 'https://api.themoviedb.org/3/search/keyword?query=${query}&page=1'


//---------------MOVIE SEARCH SECTION---------------------//  
    const searchBTN = document.querySelector('.search-button')
    const searchInput = document.querySelector('.searchForm')

    searchBTN.addEventListener('click', fetchMoviesSearch)

        function fetchMoviesSearch(){

            console.log(searchInput.value)

            const query = document.querySelector('.searchForm')
            const inputValue = query.value;
    
            const searchAPI = `https://api.themoviedb.org/3/search/movie?api_key=d85fc3f866e5fc77be2f384a028b16d3&language=en-US&query=${inputValue}&page=1`
    
            fetch(searchAPI)
            .then(response => response.json())
            .then(data => {
                const movieList = data.results
    
                movieList.forEach(index => {
    
                    const mainHomeGrid = document.querySelector('.main-Home-grid-container')
    
                    const dateConverted = index.release_date;
                    const year = new Date(dateConverted).getFullYear();

                    const movieContainer = document.createElement('div')
                    movieContainer.classList.add('movie-grid-container')
                    
                    movieContainer.innerHTML = `
                        <div class="img-container">
                            <div class="littleIconContainer">
                            <img src="little icon.svg" class="littleIconMenu">
                            </div>
                            <img class="imgPoster" src="https://image.tmdb.org/t/p/w500${index.poster_path}" alt="" />
                            <div class="figcaptionContainer">
                            <p class="contentFigcaption">${index.overview}</p>
                            </div>
                        </div>

                        <div class="info-container">
                            <p class="movie-title">${index.title}</p>
                            <p class="movie-year">${year}</p>
                        </div>`
    
                mainHomeGrid.appendChild(movieContainer)
    
                })   
            })
            .catch(err => console.log(err))
        }

//------------------------------------------------------------//


//--------------HOME PAGE SECTION-----------------------------//
    document.addEventListener('DOMContentLoaded', fetchMovies)


    function fetchMovies(){
        
        
        fetch(apiPopular)
        .then(response => response.json())
        .then(data => {
            const movieInformation = data.results;

            console.log(data.results)

            movieInformation.forEach(index => {
                
                const homeGridContainer = document.querySelector('.main-Home-grid-container')
                const convertDate = index.release_date;
                movieYear = new Date(convertDate).getFullYear();

                const movieContainer = document.createElement('div')
                movieContainer.classList.add('movie-grid-container')
                movieContainer.innerHTML = `
                        <div class="img-container">
                            <div class="littleIconContainer">
                            <img src="little icon.svg" class="littleIconMenu">
                            </div>
                            <img class="imgPoster" src="https://image.tmdb.org/t/p/w500${index.poster_path}" alt="" />
                            <div class="figcaptionContainer">
                            <p class="contentFigcaption">${index.overview}</p>
                            </div>
                        </div>

                        <div class="info-container">
                            <p class="movie-title">${index.title}</p>
                            <p class="movie-year">${movieYear}</p>
                        </div>`

                homeGridContainer.appendChild(movieContainer)

            })
        })
    }
//------------------------------------------------------------//



















/* -------------------------------------------- ORIGINAL ------------------------------------------------------------ */
// const addMovieBtn = document.querySelector('.addMovieBTN')
// addMovieBtn.addEventListener('click', searchMovies)



// function searchMovies(){

//     const searchMovie = document.querySelector('#searchInput').value;

//     const apiURLSearch = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${searchMovie}&page=1`;

//     fetch(apiURLSearch)
//     .then(res => res.json())
//     .then(data => {
//         console.log(data)
//         console.log(data.results)
//         const movie = data.results;

//         movie.forEach(element => {
    
//             const masterMovieContainer = document.querySelector('.containerMoviesInsideListDashboard')
    
//             const movieContainer = document.createElement('div')
//             const titleContainerMovie = document.createElement('div')
//             movieContainer.innerHTML = `<img class="containerThumbnailMovieDashboard" src="https://image.tmdb.org/t/p/w500${element.poster_path}">

//                     <p>${element.release_date}</p>`
    
//             movieContainer.classList.add('containerMovieDashboard')
    
//             titleContainerMovie.innerHTML = `<p class="titleMovieDashboard">${element.title}</p>`
//             titleContainerMovie.classList.add('containerTitleMovieDashboard')

//             movieContainer.appendChild(titleContainerMovie)
//             masterMovieContainer.appendChild(movieContainer)

//         });
//     })

//         fetch(apiGenreURL)
//         .then(res => res.json())
//         .then(data => {
//             console.log(data)
//             // console.log(data.genres)
//             // console.log(data.genres[0].name)
//             // console.log(data.genres[1].name)
//             // console.log(data.genres[2].name)
            
//         })

// }





