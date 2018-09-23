import './index.less';
import React,{Component} from 'react';
import { Link, NavLink } from 'react-router-dom';

class Left extends Component{
	render(){
		return (
			<div className={'left-container'}>
				<Link title="首页" to="/" replace>首页</Link>
				<Link title="文章" to="/article" replace>文章</Link>
			</div>
		)
	}
}

export default Left