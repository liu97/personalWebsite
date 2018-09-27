import './index.less';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { Spin, message } from 'antd';
import ArticleForm from 'components/ArticleForm';

import { postArticleMessage } from 'actions/article/';
import { getGivenSearch } from 'utils/location';
import { getProxyURL } from 'utils/config';
@connect(
	(state, props) => ({
		getPutArticleResult: state.getPutArticleResult
	})
)
class ArticleAdd extends Component{
	constructor(props){
		super(props);
		this.mditor = {};
		this.proxyURL = getProxyURL();
	}
	componentDidMount(){
		this.setMessage();
	}
	componentWillReceiveProps(newProps){
		let { getPutArticleResult } = newProps;
		const props = this.props;
		if(getPutArticleResult !== this.props.getPutArticleResult && getPutArticleResult && getPutArticleResult.isLoading === false){
			if(getPutArticleResult.info.count != 0){
				message.info("修改成功",0.5);
				setTimeout(function(){
					props.history.push('/article/list');
				},600);
			}
		}
	}
	// 设置markdown内容
	setMessage = () =>{
		//设置外部editor
		const ele_textarea = document.getElementById('md_editor');
		const mditor =  Mditor.fromTextarea(ele_textarea);
		mditor.height='99%'
		this.mditor = mditor;
	}
	// 提交表单
	handleSubmit = (values) => {
		values.text = this.mditor.value;
		this.props.dispatch(postArticleMessage(values));
	}

	render(){
		return (
			<div className={'article-add'}>
				<div className={'add-editor'}>
					<textarea id="md_editor"></textarea>
				</div>
				<div className={'add-message'}>
					<ArticleForm handleSubmit={this.handleSubmit}></ArticleForm>
				</div>
			</div>
		)
	}
}

export default withRouter(ArticleAdd)