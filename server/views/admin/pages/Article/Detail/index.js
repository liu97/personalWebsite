import './index.less';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { Row, Col, Spin, Popover,Button } from 'antd';

import { fetchArticleMessage } from 'actions/article/';
import { getGivenSearch } from 'utils/location';
import { getProxyURL } from 'utils/config';
// import ReactMarkdown from 'react-markdown';
// import {MarkdownEditor} from 'react-markdown-editor';
// import marked from 'marked';
import mditor from 'mditor';
// import { markdown } from 'markdown';
@connect(
	(state, props) => ({
		ArticleMessageResult: state.getArticleMessageResult
	})
)
class ArticleDetail extends Component{
	constructor(props){
		super(props);
		this.mditor = {};
		this.proxyURL = getProxyURL();
	}
	componentDidMount(){
		this.setMessage();
	}
	componentWillReceiveProps(newProps){
		let { ArticleMessageResult } = newProps;
		if(ArticleMessageResult !== this.props.ArticleMessageResult && ArticleMessageResult && ArticleMessageResult.isLoading === false) {
			this.mditor.value = ArticleMessageResult.info.list[0].article_content;
			this.mditor.height = "99%";
	    }
	}
	setMessage(){

		const search = getGivenSearch(this.props,['article_id']);
		this.props.dispatch(fetchArticleMessage(search));
		//设置外部editor
		const ele_textarea = document.getElementById('md_editor');
		const mditor =  Mditor.fromTextarea(ele_textarea);
		mditor.height = "600px";
		this.mditor = mditor;
	}
	render(){
		const ArticleMessageResult = this.props.ArticleMessageResult;
		const article = ArticleMessageResult.info.list && ArticleMessageResult.info.list[0];
		return (
			<Spin spinning={ArticleMessageResult.isLoading}>
				<div className={'detail'}>
					<div className={'detail-editor'}>
						<textarea id="md_editor"></textarea>
					</div>
					<div className={'detail-message'}>
						<Row>
							<Col span={8} className={"col-key col"}>ID：</Col>
							<Col span={16} className={"col"}>{article && article.article_id}</Col>
						</Row>
						<Row>
							<Col span={8} className={"col-key col"}>标题：</Col>
							<Col span={16} className={"col"}>{article && article.title}</Col>
						</Row>
						<Row>
							<Col span={8} className={"col-key col"}>标签：</Col>
							<Col span={16} className={"col"}>{article && article.tags}</Col>
						</Row>
						<Row>
							<Col span={8} className={"col-key col"}>上传时间：</Col>
							<Col span={16} className={"col"}>{article && article.upload_time}</Col>
						</Row>
						<Row>
							<Col span={8} className={"col-key col"}>最后修改时间：</Col>
							<Col span={16} className={"col"}>{article && article.last_modify_time}</Col>
						</Row>
						<Row>
							<Col span={8} className={"col-key col"}>点赞数：</Col>
							<Col span={16} className={"col"}>{article && article.praise}</Col>
						</Row>
						<Row>
							<Col span={8} className={"col-key col"}>封面：</Col>
							<Col span={16} className={"col"}>
								<Popover placement="left" content={<img className={"cover"} src={article && `api/${article.img_path}`}></img>}>
									<img className={"article-cover"} src={article && `api/${article.img_path}`}></img>
								</Popover>
							</Col>
						</Row>
						<Row>
							<Col span={24} className={"col-btn"}>
								<Button type="primary">
									<Link to={`/article/list`}>返回</Link>
								</Button>
							</Col>
						</Row>
					</div>
				</div>
			</Spin>
		)
	}
}

export default withRouter(ArticleDetail)