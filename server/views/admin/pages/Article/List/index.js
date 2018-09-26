import './index.less';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { test, fetchList } from 'actions/article';
import { Switch } from 'antd';
import Table from 'containers/Table/Common';
import {COLUMNS, QUERY} from 'constants/article';


@connect(
  (state, props) => ({
    reducerResult: state.reducerResult,
    listResult: state.getArticleResult
  })
)
class Article extends Table{
	constructor(props){
		super(props);
		this.columnsConfig = COLUMNS;
		this.queryConfig = QUERY;
		this.fetchList = fetchList
		this.onclick = this.onclick.bind(this);
	}
	componentWillReceiveProps(newProps){
		let { reducerResult, getArticleResult } = newProps;
		if(reducerResult !== this.props.reducerResult &&reducerResult && reducerResult.loading === false && !reducerResult.hasError) {
	
	    }
	}
	addCustomCloumns() {
		COLUMNS.forEach((col) => {
			switch (col.key) {
			  	case 'opt': {
			    	col.render = (text, record, index) => {
			      	return (
			        	<div className="table-opt">
				            <Link to={`/article/detail?id=${record.article_id}`} >查看 </Link>
				            <Link to={`/article/edit?id=${record.article_id}`} >编辑 </Link>
				            <a href="javascript:void(0);">删除</a>
			        	</div>
			      	)}
			    	break;
			  	} 
			}
		})
	}
	onclick= ()=>{
		this.props.dispatch(test());
		this.props.dispatch(fetchList({id: '18'}));
	}
	// render(){
	// 	return (
	// 		<div className={'article-container'}>
	// 			<button onClick={this.onclick}>添加</button>
	// 			{this.props.getArticleResult&&this.props.getArticleResult.info&&this.props.getArticleResult.info.article}
	// 			{this.props.reducerResult&&this.props.reducerResult.counter}
	// 			<Switch />
	// 		</div>
	// 	)
	// }
}

export default Article