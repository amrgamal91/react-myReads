import React, {Component} from 'react';


class Book extends Component{
handleChange(value){
  this.props.sendShelfChange(this.props.book,value)
}

  render(){
     const{book}=this.props;
     JSON.stringify({book})
let bookCover;
if(!!this.props.book.imageLinks){
  bookCover=this.props.book.imageLinks.smallThumbnail;
}else {
  bookCover="url('http://via.placeholder.com/193x128')"
}
    return(
      <li>
      <div className="book">
        <div className="book-top">

          <div className="book-cover" style={{
             width: 128,
             height: 193,
             backgroundImage:  `url("${ bookCover }")`
            }}></div>

          <div className="book-shelf-changer">
            <select
            value={this.props.book.shelf || "none"}
            onChange={(event)=>this.handleChange(event.target.value)}
            >
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>

        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.author}</div>
      </div>
      </li>
    );
  }
}
 export default Book
