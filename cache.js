let redis = require('redis');
let client = redis.createClient();
let counter = 0;

function cache(req, res, next) {
  client.get(req.originalUrl, (err, data) => { 
    if (data !== null) {
      res.send(data);
    } else {
      res.render('api/index', {counter}, (err, html) => {
        client.setex(req.originalUrl, 60, html);
      });
      next();
    }
  });
}

module.exports = cache;

/*app.get('/api/counter/increment', (req, res) => {
  client.incr('counter');
  res.end();
});*/