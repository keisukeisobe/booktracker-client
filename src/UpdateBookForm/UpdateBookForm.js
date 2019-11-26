import React, { Component } from 'react'
import TokenService from '../services/token-service'
import config from '../config'
import { withRouter } from "react-router";

class UpdateBookForm extends Component {
  state = {
    open: false,
    content: this.props.book.content,
    rating: this.props.book.rating,
    plot: this.props.book.plot,
    prose: this.props.book.prose,
    characters: this.props.book.characters,
    worldbuilding: this.props.book.worldbuilding,
    theme: this.props.book.theme,
    pagecount: this.props.book.pagecount,
    maxpagecount: this.props.book.maxpagecount,
    error: null
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
    //history.push(`/users/${this.props.userId}/books/${this.props.book.book_id}`)
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
      <form className="PatchBookForm" onSubmit={this.handleSubmit}>
        <div className="reading_status">
          <label htmlFor="reading_status">Reading Status:</label>
            <select onChange={e=>this.handleChange(e, false)}name="reading_status">
              <option value="inProgress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="dnf">Did Not Finish</option>
            </select>
        </div>
        <div className="pagecount">
          <label htmlFor="pagecount">Current Page:
            <input type="number" min="0" max={this.state.maxpagecount} name="pagecount" id="pagecount" required value={this.state.pagecount} onChange={e=>this.handleChange(e, true)}></input>
          </label>
        </div>
        <div className="maxpagecount">
          <label htmlFor="maxpagecount">Total Page Count:
            <input type="number" min="0" name="maxpagecount" id="maxpagecount" required value={this.state.maxpagecount} onChange={e=>this.handleChange(e, true)}></input>
          </label>
        </div>
        <label htmlFor="content">My Review: <br></br>
          <textarea className="content" name="content" value={this.state.content} onChange={this.handleChange} />
        </label>
        <div className="rating">
          <p>Overall Personal Rating:</p>
          <label htmlFor="rating1">1</label>
          <input type="radio" id="rating1" name="rating" value="1" checked={this.state.rating===1} onChange={e => this.handleChange(e, true)} required></input>
          <label htmlFor="rating1">2</label>
          <input type="radio" id="rating2" name="rating" value="2"checked={this.state.rating===2} onChange={e => this.handleChange(e, true)}></input>
          <label htmlFor="rating1">3</label>
          <input type="radio" id="rating3" name="rating" value="3"checked={this.state.rating===3} onChange={e => this.handleChange(e, true)}></input>
          <label htmlFor="rating1">4</label>
          <input type="radio" id="rating4" name="rating" value="4"checked={this.state.rating===4} onChange={e => this.handleChange(e, true)}></input>
          <label htmlFor="rating1">5</label>
          <input type="radio" id="rating5" name="rating" value="5"checked={this.state.rating===5} onChange={e => this.handleChange(e, true)}></input>
        </div>
        <div className="plot">
          <p>Plot:</p>
          <label htmlFor="plot1">1</label>
          <input type="radio" id="plot1" name="plot" value="1" required checked={this.state.plot===1} onChange={e => this.handleChange(e, true)}></input>
          <label htmlFor="plot1">2</label>
          <input type="radio" id="plot2" name="plot" value="2" checked={this.state.plot===2} onChange={e => this.handleChange(e, true)}></input>
          <label htmlFor="plot1">3</label>
          <input type="radio" id="plot3" name="plot" value="3" checked={this.state.plot===3} onChange={e => this.handleChange(e, true)}></input>
          <label htmlFor="plot1">4</label>
          <input type="radio" id="plot4" name="plot" value="4" checked={this.state.plot===4} onChange={e => this.handleChange(e, true)}></input>
          <label htmlFor="plot1">5</label>
          <input type="radio" id="plot5" name="plot" value="5" checked={this.state.plot===5} onChange={e => this.handleChange(e, true)}></input>
        </div>
        <div className="prose">
          <p>Prose:</p>
          <label htmlFor="prose1">1</label>
          <input type="radio" id="prose1" name="prose" value="1" required checked={this.state.prose===1} onChange={e => this.handleChange(e, true)}></input>
          <label htmlFor="prose1">2</label>
          <input type="radio" id="prose2" name="prose" value="2" checked={this.state.prose===2} onChange={e => this.handleChange(e, true)}></input>
          <label htmlFor="prose1">3</label>
          <input type="radio" id="prose3" name="prose" value="3" checked={this.state.prose===3} onChange={e => this.handleChange(e, true)}></input>
          <label htmlFor="prose1">4</label>
          <input type="radio" id="prose4" name="prose" value="4" checked={this.state.prose===4} onChange={e => this.handleChange(e, true)}></input>
          <label htmlFor="prose1">5</label>
          <input type="radio" id="prose5" name="prose" value="5" checked={this.state.prose===5} onChange={e => this.handleChange(e, true)}></input>
        </div>
        <div className="characters">
          <p>Characters:</p>
          <label htmlFor="characters1">1</label>
          <input type="radio" id="characters1" name="characters" value="1" required checked={this.state.characters===1} onChange={e => this.handleChange(e, true)}></input>
          <label htmlFor="characters1">2</label>
          <input type="radio" id="characters2" name="characters" value="2" checked={this.state.characters===2} onChange={e => this.handleChange(e, true)}></input>
          <label htmlFor="characters1">3</label>
          <input type="radio" id="characters3" name="characters" value="3" checked={this.state.characters===3} onChange={e => this.handleChange(e, true)}></input>
          <label htmlFor="characters1">4</label>
          <input type="radio" id="characters4" name="characters" value="4" checked={this.state.characters===4} onChange={e => this.handleChange(e, true)}></input>
          <label htmlFor="characters1">5</label>
          <input type="radio" id="characters5" name="characters" value="5" checked={this.state.characters===5} onChange={e => this.handleChange(e, true)}></input>
        </div>
        <div className="worldbuilding">
          <p>Worldbuilding:</p>
          <label htmlFor="worldbuilding1">1</label>
          <input type="radio" id="worldbuilding1" name="worldbuilding" value="1" required checked={this.state.worldbuilding===1} onChange={e => this.handleChange(e, true)}></input>
          <label htmlFor="worldbuilding1">2</label>
          <input type="radio" id="worldbuilding2" name="worldbuilding" value="2" checked={this.state.worldbuilding===2} onChange={e => this.handleChange(e, true)}></input>
          <label htmlFor="worldbuilding1">3</label>
          <input type="radio" id="worldbuilding3" name="worldbuilding" value="3" checked={this.state.worldbuilding===3} onChange={e => this.handleChange(e, true)}></input>
          <label htmlFor="worldbuilding1">4</label>
          <input type="radio" id="worldbuilding4" name="worldbuilding" value="4" checked={this.state.worldbuilding===4} onChange={e => this.handleChange(e, true)}></input>
          <label htmlFor="worldbuilding1">5</label>
          <input type="radio" id="worldbuilding5" name="worldbuilding" value="5" checked={this.state.worldbuilding===5} onChange={e => this.handleChange(e, true)}></input>
        </div>
        <div className="theme">
          <p>Theme:</p>
          <label htmlFor="theme1">1</label>
          <input type="radio" id="theme1" name="theme" value="1" required checked={this.state.theme===1} onChange={e => this.handleChange(e, true)}></input>
          <label htmlFor="theme1">2</label>
          <input type="radio" id="theme2" name="theme" value="2" checked={this.state.theme===2} onChange={e => this.handleChange(e, true)}></input>
          <label htmlFor="theme1">3</label>
          <input type="radio" id="theme3" name="theme" value="3" checked={this.state.theme===3} onChange={e => this.handleChange(e, true)}></input>
          <label htmlFor="theme1">4</label>
          <input type="radio" id="theme4" name="theme" value="4" checked={this.state.theme===4} onChange={e => this.handleChange(e, true)}></input>
          <label htmlFor="theme1">5</label>
          <input type="radio" id="theme5" name="theme" value="5" checked={this.state.theme===5} onChange={e => this.handleChange(e, true)}></input>
        </div>
        <button type='submit'>Update</button> 
      </form>
    )
  }

  render() {
    return (
      <>
        <button onClick={() => this.handleEditClick(this.state.open)}>Edit Book</button>
        {this.state.open === true && this.renderForm()}
      </>
    )
  }
}

export default withRouter(UpdateBookForm);