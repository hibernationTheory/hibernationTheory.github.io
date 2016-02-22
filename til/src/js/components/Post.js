import React, { Component } from 'react'

import cheerio from 'cheerio'
import marked from 'marked'
import PostInfo from './PostInfo'

class Post extends Component {
	parseMarkup(value) {
		let wrapper_el = cheerio('<a class="post__title-link" href="post/'
			+ this.props.data.name.replace('.md', '')
			+ '"></a>'
		)
		let markup = marked(value, {sanitize: true})
		let cheerio_markup = cheerio.load(markup)
		cheerio_markup('h1').wrap(wrapper_el)
		let updated_markup = cheerio_markup.html()
		return { __html: updated_markup };
	}
	render() {
		var item = this.props.data
		return (
			<div className='post'>
				<div className="row">
					<div className="col-xs-12 col-md-9">
						<div className="post-content" dangerouslySetInnerHTML={ this.parseMarkup(item.content)} ></div>
					</div>
					<div className="col-xs-12 col-md-3">
						<PostInfo data={ this.props.data }/>
					</div>
				</div>

			</div>
		);
	}
}

export default Post
