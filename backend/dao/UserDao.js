var orm = require("orm");
var opts = {
    database: "JLRtc",
    protocol: "mysql",
    host: "levonshark.cn",
    username: "root",
    password: "root",
    query: {
        pool: true,
    },
};

// module.exports.getAllUser=function(callback){
    
//         orm.connect(opts, function (err, db) {
//             if (err) throw err;
//             var User = db.define("user", {
//                 id: String,
//                 name: String,
//                 passwd:String
//             });
//                 var newRecord = {
//                          id: 'Stringdfbbcs',
//                 name: 'Stringdfhhah',
//                 passwd:'Stringdfmmkn'
//             };

//                 User.create(newRecord, function (err, users) {             
//                  }); //添加新用户
//                 User.find( function (err, users) {
//                     callback(users);
//                 }); //添加新用户

//         });
// }
module.exports.creatUser=function(data,callback){

        orm.connect(opts, function (err, db) {
            if (err) throw err;
            var User = db.define("user", {
                id: String,
                name: String,
                passwd:String
            });
            
            User.create(data, function (err, users) {
                callback(users);
            });          
        });
};
