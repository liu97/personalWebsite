import './index.less';
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { test, fetchPost } from 'actions/test'

@connect(
  (state, props) => ({
    reducerResult: state.reducerResult,
    getArticleResult: state.getArticleResult
  })
)
class Article extends Component{
	constructor(props){
		super(props);
		this.onclick = this.onclick.bind(this);
	}
	componentWillReceiveProps(newProps){
		let { reducerResult, getArticleResult } = newProps;
		if(reducerResult !== this.props.reducerResult &&reducerResult && reducerResult.loading === false && !reducerResult.hasError) {
	    
	    }
	}
	onclick= ()=>{
		this.props.dispatch(test());
		this.props.dispatch(fetchPost({id: '18'}));
	}
	render(){
		return (
			<div className={'article-container'}>
				<button onClick={this.onclick}>添加</button>
				{this.props.getArticleResult&&this.props.getArticleResult.info&&this.props.getArticleResult.info.article}
				{this.props.reducerResult&&this.props.reducerResult.counter}
			</div>
		)
	}
}

export default Article