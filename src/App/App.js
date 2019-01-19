import React, { Component } from 'react';
import _ from 'lodash';
import WasteItemList from '../WasteItemList/WasteItemList';
import data from '../swm_waste_wizard_APR.json';
import './App.css';

import {ReactComponent as SearchSvg} from '../asset/search.svg';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      searchList: [],
      favoriteList: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUnfav = this.handleUnfav.bind(this);
    this.handleSearchStar = this.handleSearchStar.bind(this);
  }

  handleUnfav(index) {
    let favList = this.state.favoriteList;
    favList.splice(index, 1);
    this.setState({favoriteList: favList});
  }

  handleSearchStar(index) {
    let favIndex = this.state.favoriteList.findIndex((favD) => 
        (_.isEqual(favD, this.state.searchList[index])));
    
    if (favIndex != -1) {
      this.handleUnfav(favIndex);
    }

    else {
      let favList = this.state.favoriteList;
      favList.push(_.cloneDeep(this.state.searchList[index]));
      this.setState({favoriteList: favList});
    }
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    if (event.target.value === '') {
      this.setState({searchList: []});
    }
  }

  handleSubmit(event) {
    let searchList = data.filter((d) => {
      let keywords = d.keywords;
      if (keywords.includes(this.state.value)) {
        return true;
      }
      return false;
    })
    this.setState({searchList: searchList})
    event.preventDefault();
  }

  render() {
    return (
      <div className="App">

        <div className="Top-title">
          Toronto Waste Lookup
        </div>

        <form onSubmit={this.handleSubmit} className="hide-submit">
          <div className="search-bar">
            <div className="search-box">
              <input type="text" value={this.state.value} onChange={this.handleChange} />
            </div>
            <label className="search-button">
              <input type="submit" value="Submit" />
              <SearchSvg className="search-svg"/>
            </label>
          </div>
        </form>

        <div className="Search-list">
          <WasteItemList 
            data={this.state.searchList} 
            favData={this.state.favoriteList}
            handleFav={this.handleSearchStar} />
        </div>

        <div className="Fav-list">
          <label className="Fav-text">
            Favourites
          </label>
          <WasteItemList 
            data={this.state.favoriteList}
            favData={this.state.favoriteList}
            handleFav={this.handleUnfav} />
        </div>
      </div>
    );
  }
}

export default App;
