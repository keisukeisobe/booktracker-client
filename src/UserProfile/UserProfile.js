import React, { Component } from 'react'
import config from '../config'
import TokenService from '../services/token-service'
import RadarChart from 'react-svg-radar-chart'
import 'react-svg-radar-chart/build/css/index.css'
import './UserProfile.css'
const ss = require('simple-statistics')

export default class UserProfile extends Component {
  state = {
    finished: '',
    inProgress: '',
    didNotFinish: '',
    average: '',
    profileData: {},
    captions: [],
    ratingData: {},
    plotData: {},
    proseData: {},
    charData: {},
    worldData: {},
    themeData: {},
    bookOrder: [],
    callDone: false
  }
  componentDidMount() {
    const userId  = this.props.match.params.user_id;
    this.props.setUserId(userId);
    fetch(`${config.API_ENDPOINT}/users/${userId}/`, {
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`
      },
    })
      .then(res => {
        if(!res.ok) {
          return res.json().then(e => Promise.reject(e));
        }
        return res.json();
      })
      .then(books => {
        this.props.setBooks(books)
        //should collapse
        this.setState({finished: this.props.books.filter(book => book.status === "completed").length});
        this.setState({inProgress: this.props.books.filter(book => book.status === "in progress").length});
        this.setState({didNotFinish: this.props.books.filter(book => book.status === "did not finish").length});
        this.setState({average: Number((this.props.books.reduce((total, next) => total + next.rating, 0) / this.props.books.length).toPrecision(3))})
        //map once-- one loop instead of seven, create an object and store properties onto it or whatever
        const title = this.props.books.map(book => book.title);
        const rating = this.props.books.map(book => book.rating);
        const plot = this.props.books.map(book => book.plot);  
        const prose = this.props.books.map(book => book.prose);  
        const characters = this.props.books.map(book => book.characters);  
        const worldbuilding = this.props.books.map(book => book.worldbuilding);  
        const theme = this.props.books.map(book => book.theme);
        //leave for last
        let bookOrder = {};
        let ratingData = [
          {
            data: {}
          }
        ];
        let plotData = [
          {
            data: {}
          }
        ];
        let proseData = [
          {
            data: {}
          }
        ];
        let charData = [
          {
            data: {}
          }
        ];
        let worldData = [
          {
            data: {}
          }
        ];
        let themeData = [
          {
            data: {}
          }
        ];
        let plotCorr;
        let proseCorr;
        let charCorr;
        let worldCorr;
        let themeCorr;
        //loop this-- just use an object? of the variable names
        if (rating.length >= 2 && plot.length >= 2){
          plotCorr = ss.sampleCorrelation(rating, plot).toPrecision(2)
        }
        if (rating.length >=2 && prose.length >=2){
          proseCorr = ss.sampleCorrelation(rating, prose).toPrecision(2)
        }
        if (rating.length >=2 && worldbuilding.length >=2){
          worldCorr = ss.sampleCorrelation(rating, worldbuilding).toPrecision(2)
        }
        if (rating.length >=2 && characters.length >=2){
          charCorr = ss.sampleCorrelation(rating, characters).toPrecision(2)

        }
        if (rating.length >=2 && theme.length >=2){
          themeCorr = ss.sampleCorrelation(rating, theme).toPrecision(2)
        }
        if (plot.length >= 2 && prose.length >= 2 && characters.length >= 2 && worldbuilding.length >= 2 && theme.length >= 2){
          let profileData = [
            {
              data: {
                plot: Number(plotCorr),
                prose: Number(proseCorr),
                characters: Number(charCorr),
                worldbuilding: Number(worldCorr),
                theme: Number(themeCorr)
              },
              meta: {color: 'orange'}
            }
          ]
          const captions = {plot: 'Plot', prose: 'Prose', characters: 'Characters', worldbuilding: 'Worldbuilding', theme: 'Theme'}
          for (let index = 0; index < title.length; index++){
            bookOrder[String(title[index])] = title[index]
            ratingData[0].data[title[index]]=rating[index]/5
            ratingData[0].meta={color: 'orange'}
            plotData[0].data[title[index]]=plot[index]/5
            plotData[0].meta={color: 'red'}
            proseData[0].data[title[index]]=prose[index]/5
            proseData[0].meta={color: 'green'}
            charData[0].data[title[index]]=characters[index]/5
            charData[0].meta={color: 'blue'}
            worldData[0].data[title[index]]=worldbuilding[index]/5
            worldData[0].meta={color: 'purple'}
            themeData[0].data[title[index]]=theme[index]/5
            themeData[0].meta={color: 'grey'}
          }
          //collapse these into one
          this.setState({profileData: profileData})
          this.setState({captions: captions})
          this.setState({bookOrder})
          this.setState({ratingData})
          this.setState({plotData: plotData.concat(ratingData)})
          this.setState({proseData: proseData.concat(ratingData)})
          this.setState({charData: charData.concat(ratingData)})
          this.setState({worldData: worldData.concat(ratingData)})
          this.setState({themeData: themeData.concat(ratingData)})
        }
      })
      .then( () => this.setState({callDone: true})
      )
  }

  render() {
    if (!this.state.callDone){
      return <p className='loading-p'>Loading...</p>
    } else {
      if (Object.keys(this.state.bookOrder).length >= 10 && this.props.books.length >= 10){
        console.log('more than 10 books');
        return (
          <div className='user-profile'>
            <div className='user-statistics'>
              <h2 className='profile-h2'>My Profile</h2>
              <h3 className='profile-h3'>User Statistics</h3>
              <div className='grid-container-profile'>
                <span className='user-profile-p-left'>Books Finished:</span>
                <span className='user-profile-p-right'>{this.state.finished}</span>
                <span className='user-profile-p-left'>Books In Progress:</span>
                <span className='user-profile-p-right'>{this.state.inProgress}</span>
                <span className='user-profile-p-left'>Books DNF'd:</span>
                <span className='user-profile-p-right'>{this.state.didNotFinish}</span>
                <span className='user-profile-p-left'>Average Rating:</span>
                <span className='user-profile-p-right'>{this.state.average.toPrecision(2)}</span>
              </div>
            </div>
            <div className='user-graphs'>
              <h3 className='user-profile-h3'>Correlation of Various Factors to Overall Rating</h3>
              {Object.keys(this.state.bookOrder).length < 10 && <p className='loading-p'>Correlation coefficients chart may not appear until you add more books and ratings stabilize.</p>}
              {this.state.profileData.length > 0 && Object.keys(this.state.captions).length > 0 && <RadarChart captions={this.state.captions} data={this.state.profileData} options={{scales: 10, zoomDistance: 1.23, captionProps: ()=> ({fontSize: 16, textAnchor: 'middle', fontFamily: 'sans-serif'})}}size={300}/>}
              <h3 className='user-profile-h3'>Personal Rating vs. Plot</h3>
              {this.state.plotData.length > 0 && Object.keys(this.state.bookOrder).length > 0 && <RadarChart captions={this.state.bookOrder} data={this.state.plotData} options={{scales: 5, captions: false, captionProps: ()=> ({fontSize: 16, textAnchor: 'middle', fontFamily: 'sans-serif'})}}size={300}/>}
              <h3 className='user-profile-h3'>Personal Rating vs. Prose</h3>
              {this.state.proseData.length > 0 && Object.keys(this.state.bookOrder).length > 0 && <RadarChart captions={this.state.bookOrder} data={this.state.proseData} options={{scales: 5, captions: false, captionProps: ()=> ({fontSize: 16, textAnchor: 'middle', fontFamily: 'sans-serif'})}}size={300}/>}
              <h3 className='user-profile-h3'>Personal Rating vs. Characters</h3>
              {this.state.charData.length > 0 && Object.keys(this.state.bookOrder).length > 0 && <RadarChart captions={this.state.bookOrder} data={this.state.charData} options={{scales: 5, captions: false, captionProps: ()=> ({fontSize: 16, textAnchor: 'middle', fontFamily: 'sans-serif'})}}size={300}/>}
              <h3 className='user-profile-h3'>Personal Rating vs. Worldbuilding</h3>
              {this.state.worldData.length > 0 && Object.keys(this.state.bookOrder).length > 0 && <RadarChart captions={this.state.bookOrder} data={this.state.worldData} options={{scales: 5, captions: false, captionProps: ()=> ({fontSize: 16, textAnchor: 'middle', fontFamily: 'sans-serif'})}}size={300}/>}
              <h3 className='user-profile-h3'>Personal Rating vs. Theme</h3>
              {this.state.themeData.length > 0 && Object.keys(this.state.bookOrder).length > 0 && <RadarChart captions={this.state.bookOrder} data={this.state.themeData} options={{scales: 5, captions: false, captionProps: ()=> ({fontSize: 16, textAnchor: 'middle', fontFamily: 'sans-serif'})}}size={300}/>}
            </div>
          </div>
        )
      } else {
        return <p className='loading-p'>User profile data cannot be generated until more books have been logged.</p>
      }
    }
  }
}