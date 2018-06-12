// 过滤markdown标识符
async function filter_markdown(content){ 
	var reg = /[\\\`\*\_\[\]\#\+\-\!\>]|\([^\(\)]*\)/g;
	content = content.replace(reg,'');
	return content;
}

module.exports = filter_markdown;