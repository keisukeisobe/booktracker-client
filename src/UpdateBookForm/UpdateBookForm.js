import React, { Component } from 'react'
import TokenService from '../services/token-service'
import config from '../config'
import { withRouter } from "react-router";
import './UpdateBookForm.css'

class UpdateBookForm extends Component {
  state = {
    open: false,
    error: null,
    ...this.props.book
  }

  static defaultProps = {
    history: {
      push: () => {}
    }
  }

  handlePatchBookSuccess = user => {
    const history = this.props.history
    history.push('/temp')
    history.goBack()
  }

  handleSubmit = event => {
    event.preventDefault();
    const {rating, plot, prose, characters, worldbuilding, theme, content, pagecount, maxpagecount, reading_status} = event.target;
    this.setState({error: null})
    fetch(`${config.API_ENDPOINT}/users/${this.props.userId}/books/${this.props.book.book_id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify({
        rating: Number(rating.value),
        plot: Number(plot.value),
        prose: Number(prose.value),
        characters: Number(characters.value),
        worldbuilding: Number(worldbuilding.value),
        theme: Number(theme.value),
        content: this.state.content,
        pagecount: pagecount.value,
        maxpagecount: maxpagecount.value,
        reading_status: reading_status.value,
        percent: Number(pagecount/maxpagecount)
      }),
    })
      .then(res => {
        if(!res.ok) {
          return res.json().then(e => Promise.reject(e));
        }
        return this.props.fetchBooks()
      })
      .then( () => {
        rating.value = '';
        plot.value = '';
        prose.value = '';
        characters.value = '';
        worldbuilding.value = '';
        theme.value = '';
        content.value = '';
        pagecount.value = '';
        maxpagecount.value = '';
        this.handlePatchBookSuccess();
      })
  }

  handleChange = (event, isNumber=false) => {
    const target = event.target
    const name = target.name
    if (isNumber){
      const val = Number(event.target.value)
      this.setState({[name]: val})
    } else {
      this.setState({[name]: event.target.value})
    }
  }

  handleEditClick = (open) => {
    this.setState({open: !open})
  }

  renderForm() {
    return (
      <form className="patch-book-form" onSubmit={this.handleSubmit}>
        <div className='grid-container-update'>
          <label className='reading-status-label' htmlFor="reading_status">Reading Status:</label>
          <select className='reading-status-select' onChange={e=>this.handleChange(e, false)} value={this.state.reading_status} name="reading_status">
            <option value="in progress" >In Progress</option>
            <option value="completed">Completed</option>
            <option value="dnf">Did Not Finish</option>
          </select>
          <label className='pagecount-label' htmlFor="pagecount">Current Page:</label>
          <input className='pagecount-input' type="number" min="0" max={this.state.maxpagecount} name="pagecount" id="pagecount" required value={this.state.pagecount} onChange={e=>this.handleChange(e, true)}></input>
          <label className='pagecount-label' htmlFor="maxpagecount">Total Page Count:</label>
          <input className='pagecount-input' type="number" min="0" name="maxpagecount" id="maxpagecount" required value={this.state.maxpagecount} onChange={e=>this.handleChange(e, true)}></input>
        </div>

        <label className='content-label' htmlFor="content">My Review: <br></br>
          <textarea className="content-textarea" name="content" value={this.state.content} onChange={this.handleChange} />
        </label>
        
        <div className='grid-container-update'>
          <label className='detailed-text'>Personal Rating:</label>
            <div className="star-rating rating">
              <input id="rating5" type="radio" name="rating" value="5" checked={this.state.rating===5} onChange={e => this.handleChange(e, true)} required></input>
              <label htmlFor="rating5" title="5 stars">
                <i className="active fa fa-star" aria-hidden="true"></i>
              </label>
              <input id="rating4" type="radio" name="rating" value="4" checked={this.state.rating===4} onChange={e => this.handleChange(e, true)}></input>
              <label htmlFor="rating4" title="4 stars">
                <i className="active fa fa-star" aria-hidden="true"></i>
              </label>
              <input id="rating3" type="radio" name="rating" value="3" checked={this.state.rating===3} onChange={e => this.handleChange(e, true)}></input>
              <label htmlFor="rating3" title="3 stars">
                <i className="active fa fa-star" aria-hidden="true"></i>
              </label>
              <input id="rating2" type="radio" name="rating" value="2" checked={this.state.rating===2} onChange={e => this.handleChange(e, true)}></input>
              <label htmlFor="rating2" title="2 stars">
                <i className="active fa fa-star" aria-hidden="true"></i>
              </label>
              <input id="rating1" type="radio" name="rating" value="1" checked={this.state.rating===1} onChange={e => this.handleChange(e, true)}></input>
              <label htmlFor="rating1" title="1 star">
                <i className="active fa fa-star" aria-hidden="true"></i>
              </label>
            </div>
          
          <br></br>
          <label className='detailed-text'>Plot:</label>
            <div className="star-rating plot">
              <input id="plot5" type="radio" name="plot" value="5" checked={this.state.plot===5} onChange={e => this.handleChange(e, true)} required></input>
              <label htmlFor="plot5" title="5 stars">
                <i className="active fa fa-star" aria-hidden="true"></i>
              </label>
              <input id="plot4" type="radio" name="plot" value="4" checked={this.state.plot===4} onChange={e => this.handleChange(e, true)}></input>
              <label htmlFor="plot4" title="4 stars">
                <i className="active fa fa-star" aria-hidden="true"></i>
              </label>
              <input id="plot3" type="radio" name="plot" value="3" checked={this.state.plot===3} onChange={e => this.handleChange(e, true)}></input>
              <label htmlFor="plot3" title="3 stars">
                <i className="active fa fa-star" aria-hidden="true"></i>
              </label>
              <input id="plot2" type="radio" name="plot" value="2" checked={this.state.plot===2} onChange={e => this.handleChange(e, true)}></input>
              <label htmlFor="plot2" title="2 stars">
                <i className="active fa fa-star" aria-hidden="true"></i>
              </label>
              <input id="plot1" type="radio" name="plot" value="1" checked={this.state.plot===1} onChange={e => this.handleChange(e, true)}></input>
              <label htmlFor="plot1" title="1 star">
                <i className="active fa fa-star" aria-hidden="true"></i>
              </label>
            </div>
          
          <br></br>
          <label className='detailed-text'>Prose:</label>
            <div className="star-rating prose">
              <input id="prose5" type="radio" name="prose" value="5" checked={this.state.prose===5} onChange={e => this.handleChange(e, true)} required></input>
              <label htmlFor="prose5" title="5 stars">
                <i className="active fa fa-star" aria-hidden="true"></i>
              </label>
              <input id="prose4" type="radio" name="prose" value="4" checked={this.state.prose===4} onChange={e => this.handleChange(e, true)}></input>
              <label htmlFor="prose4" title="4 stars">
                <i className="active fa fa-star" aria-hidden="true"></i>
              </label>
              <input id="prose3" type="radio" name="prose" value="3" checked={this.state.prose===3} onChange={e => this.handleChange(e, true)}></input>
              <label htmlFor="prose3" title="3 stars">
                <i className="active fa fa-star" aria-hidden="true"></i>
              </label>
              <input id="prose2" type="radio" name="prose" value="2" checked={this.state.prose===2} onChange={e => this.handleChange(e, true)}></input>
              <label htmlFor="prose2" title="2 stars">
                <i className="active fa fa-star" aria-hidden="true"></i>
              </label>
              <input id="prose1" type="radio" name="prose" value="1" checked={this.state.prose===1} onChange={e => this.handleChange(e, true)}></input>
              <label htmlFor="prose1" title="1 star">
                <i className="active fa fa-star" aria-hidden="true"></i>
              </label>
            </div>
          
          <br></br>
          <label className='detailed-text'>Worldbuilding:</label>
            <div className="star-rating worldbuilding">
              <input id="worldbuilding5" type="radio" name="worldbuilding" value="5" checked={this.state.worldbuilding===5} onChange={e => this.handleChange(e, true)} required></input>
              <label htmlFor="worldbuilding5" title="5 stars">
                <i className="active fa fa-star" aria-hidden="true"></i>
              </label>
              <input id="worldbuilding4" type="radio" name="worldbuilding" value="4" checked={this.state.worldbuilding===4} onChange={e => this.handleChange(e, true)}></input>
              <label htmlFor="worldbuilding4" title="4 stars">
                <i className="active fa fa-star" aria-hidden="true"></i>
              </label>
              <input id="worldbuilding3" type="radio" name="worldbuilding" value="3" checked={this.state.worldbuilding===3} onChange={e => this.handleChange(e, true)}></input>
              <label htmlFor="worldbuilding3" title="3 stars">
                <i className="active fa fa-star" aria-hidden="true"></i>
              </label>
              <input id="worldbuilding2" type="radio" name="worldbuilding" value="2" checked={this.state.worldbuilding===2} onChange={e => this.handleChange(e, true)}></input>
              <label htmlFor="worldbuilding2" title="2 stars">
                <i className="active fa fa-star" aria-hidden="true"></i>
              </label>
              <input id="worldbuilding1" type="radio" name="worldbuilding" value="1" checked={this.state.worldbuilding===1} onChange={e => this.handleChange(e, true)}></input>
              <label htmlFor="worldbuilding1" title="1 star">
                <i className="active fa fa-star" aria-hidden="true"></i>
              </label>
            </div>
          
          <br></br>
          <label className='detailed-text'>Characters:</label>
            <div className="star-rating characters">
              <input id="characters5" type="radio" name="characters" value="5" checked={this.state.characters===5} onChange={e => this.handleChange(e, true)} required></input>
              <label htmlFor="characters5" title="5 stars">
                <i className="active fa fa-star" aria-hidden="true"></i>
              </label>
              <input id="characters4" type="radio" name="characters" value="4" checked={this.state.characters===4} onChange={e => this.handleChange(e, true)}></input>
              <label htmlFor="characters4" title="4 stars">
                <i className="active fa fa-star" aria-hidden="true"></i>
              </label>
              <input id="characters3" type="radio" name="characters" value="3" checked={this.state.characters===3} onChange={e => this.handleChange(e, true)}></input>
              <label htmlFor="characters3" title="3 stars">
                <i className="active fa fa-star" aria-hidden="true"></i>
              </label>
              <input id="characters2" type="radio" name="characters" value="2" checked={this.state.characters===2} onChange={e => this.handleChange(e, true)}></input>
              <label htmlFor="characters2" title="2 stars">
                <i className="active fa fa-star" aria-hidden="true"></i>
              </label>
              <input id="characters1" type="radio" name="characters" value="1" checked={this.state.characters===1} onChange={e => this.handleChange(e, true)}></input>
              <label htmlFor="characters1" title="1 star">
                <i className="active fa fa-star" aria-hidden="true"></i>
              </label>
            </div>
          
          <br></br>
          <label className='detailed-text'>Theme:</label>
            <div className="star-rating theme">
              <input id="theme5" type="radio" name="theme" value="5" checked={this.state.theme===5} onChange={e => this.handleChange(e, true)} required></input>
              <label htmlFor="theme5" title="5 stars">
                <i className="active fa fa-star" aria-hidden="true"></i>
              </label>
              <input id="theme4" type="radio" name="theme" value="4" checked={this.state.theme===4} onChange={e => this.handleChange(e, true)}></input>
              <label htmlFor="theme4" title="4 stars">
                <i className="active fa fa-star" aria-hidden="true"></i>
              </label>
              <input id="theme3" type="radio" name="theme" value="3" checked={this.state.theme===3} onChange={e => this.handleChange(e, true)}></input>
              <label htmlFor="theme3" title="3 stars">
                <i className="active fa fa-star" aria-hidden="true"></i>
              </label>
              <input id="theme2" type="radio" name="theme" value="2" checked={this.state.theme===2} onChange={e => this.handleChange(e, true)}></input>
              <label htmlFor="theme2" title="2 stars">
                <i className="active fa fa-star" aria-hidden="true"></i>
              </label>
              <input id="theme1" type="radio" name="theme" value="1" checked={this.state.theme===1} onChange={e => this.handleChange(e, true)}></input>
              <label htmlFor="theme1" title="1 star">
                <i className="active fa fa-star" aria-hidden="true"></i>
              </label>
            </div>
          
          <br></br>
        </div>
        <button className='update-form-button' type='submit'>Update</button> 
      </form>
    )
  }

  render() {
    return (
      <>
        <button className='show-edit-button' onClick={() => this.handleEditClick(this.state.open)}>Edit Book</button>
        {this.state.open === true && this.renderForm()}
      </>
    )
  }
}

export default withRouter(UpdateBookForm);