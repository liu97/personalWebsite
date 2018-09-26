import './index.less';
import React, { Component } from 'react';
// import ReactMarkdown from 'react-markdown';
// import {MarkdownEditor} from 'react-markdown-editor';
// import marked from 'marked';
// import mditor from 'mditor';

class AboutMe extends Component{
	componentDidMount(){
	    var ele_textarea = document.getElementById('md_editor');
	    var mditor =  Mditor.fromTextarea(ele_textarea);
	}
	render(){
		return (
			<div className={''}>
				<textarea id="md_editor"></textarea>
			</div>
		)
	}
}

export default AboutMe