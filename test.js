const express = require('express')
const app = express()
const port = 3000 //localhost:3000
app.use(express.urlencoded({
  extented: true
}))
app.use(express.static(__dirname));

const {PythonShell} = require('python-shell')

const hbase = require('hbase')
const client = hbase({
  host: '127.0.0.1',
  port: 8080
}) 

const router = express.Router();

router.use(function(req, res, next) {
	console.log('API request happening from ' + req.ip);

	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization");
	next();
});

app.post('/post', (req,res) => {
	
	let options = {
		args: [req.body.url]
	};
	
	PythonShell.run('essai.py', options, function(err,results) {
		if (err) console.log(err)
		let urls = results[0]
		let metas = results[1]
		let htmlAll = results[2]
		let title = results[3]
		console.log('results: ',urls,metas,title);
		
		client.table('my_table').create('my_column_family', function(err,success) {
			client.table('my_table').row(title).put('my_column_family:my_column_url', urls, function(err,success){
				if (err) console.log(err);
			})
			client.table('my_table').row(title).put('my_column_family:my_column_metadata', metas, function(err,success){
				if (err) console.log(err);
			})
			client.table('my_table').row(title).put('my_column_family:my_column_html', htmlAll, function(err,success){
				if (err) console.log(err);
			})
		})
	});
	
	res.redirect('back');
});

app.get('/get', (req,res) => {
	client.table('my_table')
	.row('[\'Example Domain\']')
	.get('my_column_family:my_column_html', (error, value) => {
		res.send('<p>some html</p>');
	})
})

app.post('/view', (req, res) => {
	client.table('my_table')
	.row(req.body.text)
	.get('my_column_family:my_column_html', (error, value) => {
		res.send(value[0].$);
    })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
