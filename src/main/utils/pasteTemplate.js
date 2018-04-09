export default (style, url) => {
	const tpl = {
		'Markdown': `![]($url)`,
		'HTML': `<img src="${url}">`,
		'URL': url
	}
	return tpl[style];
}