
/*
 * GET users listing.
 */

exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.findIP = function(req,res){
	// var ip = req.headers['x-forwarded-for'] || 
 //     req.connection.remoteAddress || 
 //     req.socket.remoteAddress ||
 //     req.connection.socket.remoteAddress;

  var ip = req.ip;

  console.log("client ip address: " + ip);
}