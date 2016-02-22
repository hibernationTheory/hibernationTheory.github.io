/*
	Main Page which displays all the entries in a paginated manner.
*/

import React, { Component } from 'react'
import { Link } from 'react-router'

import Post from './Post';

class MainPage extends Component {
	constructor(props, context) {
		console.log('init')
		super();
		this.state = {
			"filter":null,
			"paginatedData":[],
			"postsPerPage":2,
			"paginated":null,
			"lastPage":null,
			"page": 1
		}
		this.paginateData = this.paginateData.bind(this)
		this.setPageState = this.setPageState.bind(this)
		this.filterData = this.filterData.bind(this)
	}
	filterData(category) {
		//console.log('filter data', category)
		let resultData = []
		let filter = null;
		if (category) {
			let categoryPosts = this.props.data.categories && this.props.data.categories[category]
			if (categoryPosts && categoryPosts.length > 0) {
				filter = category
				this.props.data.gist_data.forEach((data) => {
					if (categoryPosts.includes(data["id"])) {
						resultData.push(data)
					}
				})
			} else {
				//if category is not valid
				this.props.history.push('/')
			}
		} else {
			resultData = this.props.data.gist_data
		}

		resultData.sort((data_prev, data_next) => {
			if (data_next.sort_index - data_prev.sort_index > 0) return 1;
			else if (data_next.sort_index - data_prev.sort_index == 0) return 0;
			else {
				return -1;
			}
		})
		this.setState({
			"filter":filter
		})
		return resultData
	}
	paginateData(page, data) {
		//console.log('paginage data')
		let ppp = this.state.postsPerPage
		let paginatedData = data.slice((page - 1) * ppp, ((page - 1) * ppp) + ppp)

		this.setState({
			"paginatedData":paginatedData
		})
		return paginatedData
	}
	setPageState(page, filteredData, paginatedData) {
		//console.log('set page state');
		let firstPage = false
		let lastPage = false
		let paginated = false

		//redirect if the page doesn't exist
		if (page> Math.ceil(filteredData.length / this.state.postsPerPage)) this.props.history.push('/')

		if (page * this.state.postsPerPage >= filteredData.length) lastPage = true
		if (paginatedData.length !== filteredData.length) paginated = true
		if (paginated && page === 1 ) firstPage = true


		this.setState({
			"firstPage":firstPage,
			"lastPage":lastPage,
			"paginated":paginated,
		});
	}
	resetPageState() {
		this.setState({
			"firstPage":null,
			"lastPage":null,
			"paginated":null
		})
	}
	componentDidMount() {
		console.log('did mount')
		let category = this.props.params.category
		let page = parseInt(this.props.params.page) || this.state.page
		this.setState({
			"page": page
		})
		let filteredData = this.filterData(category)
		let paginatedData = this.paginateData(page, filteredData)
		this.setPageState(page, filteredData, paginatedData)
	}
	componentWillReceiveProps(nextProps) {
		console.log('will receive')
		let category = nextProps.params.category
		let page = parseInt(nextProps.params.page) || 1
		console.log(page, 'yay', nextProps.params.page)
		this.setState({
			"page": page
		})
		let filteredData = this.filterData(category)
		let paginatedData = this.paginateData(page, filteredData)
		this.setPageState(page, filteredData, paginatedData)
	}
	render() {
		console.log('render state is:', this.state)
		let paginationPrefix = ''
		let elements = this.state.paginatedData.map((item) => {
							return <Post data={item} />
						});
		let filter = this.state.filter
		if (filter) {
			paginationPrefix = `/category/${filter}/`
		} else {
			paginationPrefix = "/page/"
		}


		let nextPageEl = (
			<Link className="pagination__link--next" to={{pathname: paginationPrefix + (this.state.page + 1)}}>Older</Link>
		)

		let prevPageEl = (
			<Link className="pagination__link--prev" to={{pathname: paginationPrefix + (this.state.page - 1)}}>Newer</Link>
		)

		let pagination = (modifier, ...el) => (
			<nav className={"pagination"+modifier}>
				{el}
			</nav>
		)

		let paginationResult = () => {
			if (this.state.paginated) {
				if (this.state.firstPage) {
					return pagination('--flex-end', nextPageEl)
				} else if (this.state.lastPage) {
					return pagination('', prevPageEl)
				} else {
					return pagination('', prevPageEl, nextPageEl)
				}
			} else {
				return null;
			}
		}
		return (
			<div className="">
				<div className="">{ elements }</div>
				{ paginationResult() }
			</div>
		)
	}
}

export default MainPage
