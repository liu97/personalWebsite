import './index.less';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { Spin, message } from 'antd';
import ArticleForm from 'components/ArticleForm';

import { fetchArticleMessage, putArticleMessage } from 'actions/article/';
import { getGivenSearch } from 'utils/location';
import { getProxyURL } from 'utils/config';
@connect(
	(state, props) => ({
		ArticleMessageResult: state.getArticleMessageResult,
		getPutArticleResult: state.getPutArticleResult
	})
)
class ArticleEdit extends Component{
	constructor(props){
		super(props);
		this.mditor = {};
		this.article = {};
		this.proxyURL = getProxyURL();
	}
	componentDidMount(){
		this.setMessage();
	}
	componentWillReceiveProps(newProps){
		let { ArticleMessageResult, getPutArticleResult } = newProps;
		const props = this.props;
		if(ArticleMessageResult !== this.props.ArticleMessageResult && ArticleMessageResult && ArticleMessageResult.isLoading === false) {
			this.mditor.value = ArticleMessageResult.info.list[0].article_content;
		}
		if(getPutArticleResult !== this.props.getPutArticleResult && getPutArticleResult && getPutArticleResult.isLoading === false){
			if(getPutArticleResult.info.count != 0){
				message.info("修改成功",0.5);
				setTimeout(function(){
					props.history.goBack();
				},600);
			}
		}
	}
	// 设置markdown内容
	setMessage = () =>{

		const search = getGivenSearch(this.props,['article_id']);
		this.props.dispatch(fetchArticleMessage(search));
		//设置外部editor
		const ele_textarea = document.getElementById('md_editor');
		const mditor =  Mditor.fromTextarea(ele_textarea);
		mditor.height='99%'
		this.mditor = mditor;
	}
	// 提交表单
	handleSubmit = (values) => {
		values.article_path = this.article.article_path;
		values.text = this.mditor.value;
		values.article_id = getGivenSearch(this.props,"article_id");
		this.props.dispatch(putArticleMessage(values));
	}

	render(){
		const ArticleMessageResult = this.props.ArticleMessageResult;
		const article = ArticleMessageResult.info.list && ArticleMessageResult.info.list[0];
		this.article = article;
		return (
			<Spin spinning={ArticleMessageResult.isLoading}>
				<div className={'article-edit'}>
					<div className={'edit-editor'}>
						<textarea id="md_editor"></textarea>
					</div>
					<div className={'edit-message'}>
						{article && <ArticleForm 
										article={article} 
										handleSubmit={this.handleSubmit}
									>
									</ArticleForm>
						}
						
					</div>
				</div>
			</Spin>
		)
	}
}

export default withRouter(ArticleEdit)