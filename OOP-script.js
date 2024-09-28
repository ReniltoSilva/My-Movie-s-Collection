
let movieCollection = {
    tmdbAPI: 'https://api.themoviedb.org/3/movie/popular?api_key=d85fc3f866e5fc77be2f384a028b16d3&append_to_response=images',
    fetch(){
        fetch(this.tmdbAPI)
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
            const movieArray = data.results
            displayMovieHomePage(movieArray)
        })
    }
}


fetch(tmdbAPI)
    .then(resp => resp.json())
    .then(data => {
        console.log(data)
        console.log(data.results)

        const movieArray = data.results
        displayMovieHomePage(movieArray)



function displayMovieHomePage(movieArray){
    const mainHOMEGridContainer = document.querySelector('.main-Home-grid-container')    

    movieArray.forEach(element => {

        let movieYear = new Date(element.release_date) 
        const movieYearConverted = movieYear.getFullYear()

        mainHOMEGridContainer.innerHTML = `
            <div class="movie-grid-container">
                <div class="img-container">
                    <img class="imgPoster" src="" alt="" />
                </div>
                <div class="info-container">
                    <p class="movie-title">${element.title}</p>
                    <p class="movie-year">${movieYearConverted}</p>
                </div>
            </div>`
    });

    console.log(movieArray)
}