
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.stream=function(req,res){
    req.api.stream('statuses/filter').post({
    track: ['school', 'bored']
  }, function (err, stream) {
    carrier.carry(stream, function (line) {
      var line = JSON.parse(line);
      res.write(line.text + '\n');
    });
  });	
}

exports.status=function(req,res){
  req.api('statuses/update').post({
    status: req.body.status
  }, function (err, json) {
    if (err) {
      res.json({error: err});
    } else {
      res.redirect('http://twitter.com/' + json.user.screen_name + '/status/' + json.id_str);
    }
  });
}

exports.index=function(req,res){
   req.api('account/verify_credentials').get(function (err, profile) {
   //res.send('Hi ' + profile.screen_name + '! <form action="/status" method="post"><input name="status"><button>Post Status</button></form>');
   res.render('index',{title:'CAN YOU SEE THIS TITLE',profile:profile});
    })
}







