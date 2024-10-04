const arrListConverted = JSON.parse(localStorage.getItem('MovieList'));

//Card info
const gitAPI = 'https://api.github.com/users/ReniltoSilva'
const imgProfileContainer = document.querySelector('.imgContainer')
const generalListContainer = document.querySelector('.generalMovieListContainer')
//Movie lists
const listContainer = document.querySelector('.ListContainer')    

        //AddEventListeners only accept 2 arguments(EventType and Listener), so the third argument is ignored.
        //that's why we have to put parentheses in the function if you have more than 2 funct. as arguments.                                    
document.addEventListener('DOMContentLoaded', fetchInfo, displayMovieList())

function fetchInfo(){ 

    fetch(gitAPI)
        .then(resp => resp.json())
        .then(data => {

            const profilePic = data.avatar_url
            console.log(data.name)
            console.log(data.twitter_username)
            console.log(data.avatar_url)
            console.log(data)

            const imgProfile = document.querySelector('.imgProfile')
                imgProfile.src = profilePic

        })

}

function displayMovieList(){

arrListConverted.forEach(element => {
    
    const movieContainerDiv = document.createElement('div')
    movieContainerDiv.innerHTML = `<div class="movieContainer">
          <div class="imgContainer">
            <img src="" alt="" />
          </div>
          <div class="infoContainer">
            <p class="title">${element}</p>
            <p class="year">2435</p>
          </div>
        </div>`

    listContainer.appendChild(movieContainerDiv)


})

}


