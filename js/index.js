"use strict"

const IMAGEBASEURL = 'https://image.tmdb.org/t/p/w500'

const showData = () => {
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${APIKEY}`)
    .then( res => res.json())
    .then( data  => {
        //console.log(data)
        const results = data.results

        let HTMLCard = ''
        const container = document.getElementById('container')
    
        for (let index = 0; index < results.length; index++) {
            const data = results[index]
            console.log(data)
    
            const year = new Date(data.release_date).getFullYear()
            
            HTMLCard += `
            <a href="#" class="card" onclick="hapus('hero')" data-id="${data.id}">
                <img class="card__image" src="${IMAGEBASEURL}/${data.poster_path}"/>
                <div class="card__content">
                
                    <p class="card__title">${data.title} (${year})</p>
                    
                </div>
                <div class="card__attribute">
                    <p>
                    <i class="fa fa-star" style="color:yellow;"> ${data.vote_average}</i>  
                    <i class="fa fa-heart" style="color:red; float:right;"> ${data.popularity}</i>                     
                    </p>
                
                        
                    </div>
            </a>
            `  
            
            
        }
        container.innerHTML = HTMLCard    

        let links = document.getElementsByClassName('card')
        for (let link of links) {
            link.addEventListener('click', () => {
                let id = link.dataset.id
                

                showDetailMovie(id)            
    
            })
        }
        
    })

}

function hapus(hero) {
    var i;
    var x = document.getElementsByClassName("hero");
    for (i = 0; i < x.length; i++) {
    x[i].style.display = "none"; 
    }
    document.getElementById(hero).box.removeChild('hero');
    
   }



const showDetailMovie = (id) => {
    let movie =
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${APIKEY}&language=en-US`)
    .then( res => res.json() )
    .then( data => {
        let HTMLCard = ''
        const container = document.getElementById('container')
    
        const year = new Date(data.release_date).getFullYear()
        
        HTMLCard += `
        <div class="dcontent" >
            <div class="dposter">
                <img class="card__image" src="${IMAGEBASEURL}/${data.poster_path}"/>
            </div>
            <div class="dtitle">
                <h1> ${data.title} (${year}) </h1>
            </div>
            <div class="ddescription">
                <p>${data.overview}</p>
            </div>
            <div class="genre">
            
            <p>
                    <i class="fa fa-star" style="color:yellow; "> ${data.vote_average}</i>
                    <i class="fa fa-calendar" style="color:white;"> ${data.release_date}</i>
                      
                    <i class="fa fa-heart" style="color:red;  "> ${data.popularity}</i>
                    <i class="fa fa-check-circle" style="color:green; "> ${data.vote_count}</i>               
                    </p>
                    </div>
            <a href="index.html" id="back" onclick="tambah('hero')" >BACK</a>       
            
                
        </div>
        
                
        `
        

        //<button id="back">Back</button>
        container.innerHTML = HTMLCard
        

        var back = document.getElementById('back')
        //console.log(back)
        back.addEventListener('click', () => {
            showData();
            
        })
        
    })
}
function hapus(hero) {
    var i;
    var x = document.getElementsByClassName("hero");
    for (i = 0; i < x.length; i++) {
    x[i].style.display = "none"; 
    }
    document.getElementById(hero).box.appendChild('hero');
    
   }

window.addEventListener('DOMContentLoaded', () => {
    showData()
})


