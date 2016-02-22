import React, { Component } from 'react'

class PostInfo extends Component {
	render() {
		let item = this.props.data
		let date = new Date(item.created_at)
		let month = date.getMonth();
		let day = date.getDate();
		let year = date.getFullYear();
		let parsed_date = day + '/' + month + '/' + year;

		return (
			<div className='post-info'>
				<ul className="post-info__list">
					<li className="post-info__list__item">
						<div>{parsed_date}</div>
					</li>
					<li className="post-info__list__item">
						<a href={item.url}>Gist</a>
					</li>
					<li className="post-info__list__item">
						{ item.metadata.tags.split(',').map((tag) => {
							return <div className="post-info__list__item__tag">{ '#'+tag.trim() }</div>
						}) }
					</li>
				</ul>
			</div>
			);
	}
}

export default PostInfo
