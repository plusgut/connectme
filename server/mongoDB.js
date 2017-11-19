var mongoDb = require('mongojs');
var url = "mongodb://dd4552f7-a466-499c-9d42-213b0a4b104b:ARbXQAha62ffFeN9taF6xfRbV@a607dd9e1cd0611e7959306ec10ef888-938450560.eu-west-1.elb.amazonaws.com:27017/bc191994-7759-4fd0-a217-d0da4209fc03";
//var url = "raz:password@mongodb://dd4552f7-a466-499c-9d42-213b0a4b104b:ARbXQAha62ffFeN9taF6xfRbV@a607dd9e1cd0611e7959306ec10ef888-938450560.eu-west-1.elb.amazonaws.com:27017/bc191994-7759-4fd0-a217-d0da4209fc03";
//username:password@example.com/mydb
exports.saveLogs = saveLogs;


function saveLogs(channel, command) {
    var location = {
        channel: channel,
        command:  command,
        time : Date.now()
    };
    console.log('Saving log: ', command);

    var db = mongoDb(url);
    db.collection("logs").insert(
        location,
        function (err, res) {
            if (err) throw err;
        });
    console.log("log saved!");

    db.close();
}
