import React from 'react'
import Book from './components/Book'
import BookShelf from './components/BookShelf'
import * as BooksAPI from './BooksAPI'
import SearchBook from './components/SearchBook'
import {Route} from 'react-router-dom';
import './App.css'

class BooksApp extends React.Component {
  state = {
    books:[],
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  }

  componentDidMount() {
    BooksAPI.getAll().then(data => {
        this.setState({
          books: data,
          loading: false})
    })
}


handleShelfChange(book,shelf){
  BooksAPI.update(book,shelf)
  .then(()=>{
    book.shelf=shelf;
    this.setState((state)=>({
      books:state.books.filter(item=> item.id!==book.id).concat([book])
    }))
  })
}

  render() {
    return (
      <div className="app">
      <SearchBook
        sendShelfChange={(book,shelf)=>{this.handleShelfChange(book,shelf)}}
        shelfedBooks={this.state.books}
      />

          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf
                  title="Currently Reading"
                  books={
                    this.state.books.filter(item=>item.shelf==='currentlyReading')
                  }
                  sendShelfChange={(book,shelf)=>{this.handleShelfChange(book,shelf)}}/>
                <BookShelf
                    title="Want To Read"
                    books={
                      this.state.books.filter(item=>item.shelf==='wantToRead')
                    }
                    sendShelfChange={(book,shelf)=>{this.handleShelfChange(book,shelf)}}/>
                <BookShelf
                      title="Read"
                      books={
                        this.state.books.filter(item=>item.shelf==='read')
                      }
                      sendShelfChange={(book,shelf)=>{this.handleShelfChange(book,shelf)}}
                      />
              </div>
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>

      </div>
    )
  }
}

export default BooksApp
