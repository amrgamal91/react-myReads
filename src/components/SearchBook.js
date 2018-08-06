import React,{ Component} from 'react'
import {Link} from 'react-router-dom';
import Book from './Book'
 import * as BooksAPI from '../BooksAPI'

class SearchBook extends Component{
  state={
    books:[]
  }

  sendShelfChange(book,shelf){
    this.props.sendShelfChange(book,shelf)
  }

  fetchBooks(query){
    if(!!query){
      BooksAPI.search(query).then(data=>{
        if(!!data.error){
          this.setState({
            books:[]
          })
        }else {
          let checkForShelfs=data.map(book=>{
            for(var i=0;i<this.props.shelfedBooks.length;i++){
              if(this.props.shelfedBooks[i].id===book.id){
                book.shelf=this.props.shelfedBooks[i].shelf;
              }
            }
            return book;
          })
          this.setState({
            books:checkForShelfs
          })
        }
      })
    }
  }

  render(){
    const{books}=this.state;
    return(
        <div className="search-books">
          <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          
            <div className="search-books-input-wrapper">
              {/*
                NOTES: The search from BooksAPI is limited to a particular set of search terms.
                You can find these search terms here:
                https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                you don't find a specific author or title. Every search is limited by search terms.
              */}
              <input type="text" placeholder="Search by title or author"
              onChange={(event)=>this.fetchBooks(event.target.value)}/>

            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
            {
              books.length !==0 && books.map((book,index)=>(
                <Book key={index} book={book} sendShelfChange={(book,shelf)=>{this.sendShelfChange(book,shelf)}}/>
              ))
            }
            </ol>
          </div>
        </div>
    )
  }



}

 export default SearchBook
