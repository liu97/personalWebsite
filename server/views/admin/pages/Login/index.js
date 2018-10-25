import './index.less';
import React, { Component } from 'react';
import LoginForm from './LoginForm';
import { connect } from 'react-redux';
import { PostLoginMessage, Login } from 'actions/login';

@connect(
	(state, props) => ({
		postLoginResult: state.postLoginResult
	})
)
class Home extends Component{
	componentWillReceiveProps(newProps){
		let { postLoginResult } = newProps;
		const props = this.props;
		if(postLoginResult !== props.postLoginResult && postLoginResult && postLoginResult.isLoading === false){
			console.log(postLoginResult)
			if(postLoginResult.code == 1){
				props.dispatch(Login())
				props.history.push('/admin/');
			}
		}
	}
	handleSubmit = (values) => {
		console.log('Received values of form: ', values);
		this.props.dispatch(PostLoginMessage(values));
	}
	render(){
		return (
			<div className={'login'}>
				<div className={'login-cover'}></div>
				<div className={'login-main'}>
					<div className={'main-header'}>博客管理系统</div>
					<LoginForm handleSubmit={this.handleSubmit}></LoginForm>
				</div>
			</div>
		)
	}
}

export default Home;