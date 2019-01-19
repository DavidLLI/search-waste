import React, { Component } from 'react';
import _ from 'lodash';
import {ReactComponent as StarSvg} from '../asset/star.svg';

import './WasteItemList.css';

class WasteItemList extends Component {

	constructor(props) {
		super(props);

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(index) {
		this.props.handleFav(index);
	}

	render() {
		return (
			<ul>
				{this.props.data.map((d, index) => {
					let fav = "emptystar";
					if (this.props.favData.some((favD) => (_.isEqual(favD, d)))) {
						fav = "fillstar";
					}
					let parser = new DOMParser;
					return (
						<li key={index}>
							<div className="item">
								<div className="stardiv">
									<StarSvg className={fav + ' star'} onClick={() => this.handleClick(index)}/>
								</div>
								<div className="itemTitle">
									{d.title}
								</div>
								<div className="itemBody">
									<div dangerouslySetInnerHTML=
										{{ __html: parser.parseFromString(d.body, 'text/html').body.textContent}} />
								</div>
							</div>
						</li>
					);
				})}
			</ul>

		);
	}

}

export default WasteItemList;