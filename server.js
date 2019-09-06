const express = require('express');
const app = express();
app.set('view engine', 'pug');
const bluaBlue = require('./blua-api.js');


bluaBlue.init('your-username','your-password').then(blua=>{
    app.get('/', function (req, res) {
        blua.get('articleList?author=neoan').then(d=>{
            res.render('list', {articles:d.data}, function(err,html){
                res.send(html);
            })
        });
    });

    app.listen(3000, function () {
        console.log('Example app listening on port 3000!');
    });
});

