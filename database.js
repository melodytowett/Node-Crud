class database_gateway{
    constructor(){

    }
    //method to connect to th mysql databse
    getDb(){
        const mysql = require('mysql');
        const db_con = mysql.createConnection({
            host:"localhost",
            user:"root",
            password:"meloA@3903.",
            database:"products"
        });
        db_con.connect(function (err) {
            if(!err){
                console.log("connected");
            }else
            console.log(err.message)
        });
        //return db_con;
    }
    ///perforn the http methods(insert,update,delete)
    execute(sql,params,callBack){
        var db_con =this.getDb();
        db_con.query(sql,params,function(err,result){
            if(err){
                callBack(err,null);
            }else{
                callBack(null,"Success");
            }
        });
    }
    //erformssql select command
    query(sql,params,callBack){
        var db_con = this.getDb();
        db_con.query(sql,params,function(err,result){
            if(err){
                callBack(err,null);
            }else{
                callBack(null,result);
            }
        });
    }
}
module.exports = database_gateway;