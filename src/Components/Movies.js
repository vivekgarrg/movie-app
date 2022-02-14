import React, { Component } from 'react'
import axios from 'axios';

export default class Movies extends Component {
    constructor(){
        super();
        this.state = {
              hover:'',
              parr : [1],
              currentP : 1,
              movie: []
        }
    }

   async componentDidMount(){
       let res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=20b7dac373c2e985d153e16ebbc26ff8&language=en-US&page=${this.state.currentP}`)
       let data = res.data;
     this.setState({
         movie : [...data.results]
     })
   }
  render() {
    return (
      <>
{
    this.state.movie.length == 0 ?
    <div className="spinner-border" role="status">
  <span className="visually-hidden">Loading...</span>
</div> :
<div>
    <h3 className='text-center'><strong>Trending</strong></h3>
    <div className='movie-list'>{
        this.state.movie.map((movieObj) =>{
            return(
                
                <div className="card movie-card" onMouseEnter={()=> this.setState({hover : movieObj.id})} onMouseLeave={()=> this.setState({hover: ""})}>
                <img src={`https://image.tmdb.org/t/p/original/${movieObj.backdrop_path}`}  className="card-img-top movie-img" alt="..."/>
                {/* <div className="card-body movie-body"> */}
                  <h5 className="card-title movie-title">{movieObj.title}</h5>
                  <div className='button-wrapper' style={{display:"flex", width:"100%", justifyContent:"center"}}>
                    { this.state.hover == movieObj.id &&  <a className="btn btn-primary movie-button">Add to Favourites</a>}
                 
                {/* </div> */}
                </div>
              </div> 
            )
        })}
 
</div>

<div style={{display:'flex',justifyContent:'center'}}>
<nav aria-label="Page navigation example">
  <ul class="pagination">
    <li class="page-item"><a class="page-link" href="#">Previous</a></li>
 {this.state.parr.map((value)=>{
       return(
        <li class="page-item"><a class="page-link" href="#">{value}</a></li>
       )
 })}
    <li class="page-item"><a class="page-link" href="#">Next</a></li>
  </ul>
</nav>
</div>
      </div>
}

      </>
    )
  }
}
