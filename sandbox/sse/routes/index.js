
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' })
};

var records = []

exports.chat = function(req, res) {
	res.writeHead(200, {'Content-Type': 'text/event-stream'});
	var last = 0
	setInterval(function() {
		res.write('data: noop\n\n')
		for (var i = last; i < records.length; i++)
			res.write('data: ' + records[i].words + '\n\n')
		last = i
	}, 100)
}

exports.say = function(req, res) {
	records.push({words:req.body.words, time:Date.now()})
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.end('ok')
}