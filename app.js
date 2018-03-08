const Koa = require('koa');
const	router = require('koa-router')();
const app = new Koa();

app.use(require('koa-bodyparser')())

router.post('/qiniu', (ctx) => {
	console.log(ctx.request.body)
});

app.use(router.routes());

app.listen(3300, () => {
	console.log('Koa is lietening in 3300');
});

module.exports = app;