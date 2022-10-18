const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
app.use(bodyParser.json());

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
app.get('/api/products',(req,res)=>{
  let sqlQuery = "SELECT * FROM products";

  let query = db_con.query(sqlQuery,(err,results)=>{
    if(err) throw err;
    res.send(apiResponse(results));
  });
});
app.get('/api/products/:id',(req,res)=>{
  let sqlQuery = "SELECT * FROM products WHERE product_id=" +req.params.id;
  let query = db_con.query(sqlQuery,(err,results)=>{
    if(err) throw err;
    res.send(apiResponse(results));
  })
})
app.post('/api/products',(req,res)=>{
  let data = {product_name:req.body.product_name,retail_price:req.body.retail_price};
  let sqlQuery = "INSERT INTO products SET ?";
  let query = db_con.query(sqlQuery,data,(err,results)=>{
    if(err) throw err;
    res.send(apiResponse(results));
  });
});
app.put('/api/products/:id',(req,res)=>{
  let sqlQuery = "UPDATE products SET product_name='"+req.body.product_name+"',retail_price='"+req.body.retail_price+"'WHERE product_id="+req.params.id;
  let query = db_con.query(sqlQuery,(err,results)=>{
    if(err) throw err;
    res.send(apiResponse(results));
  });
});
app.delete('/api/products/:id',(req,res)=>{
  let sqlQuery = "DELETE FROM products WHERE product_id ="+req.params.id+"";
  let query = db_con.query(sqlQuery,(err,results)=>{
    if(err) throw err;
    res.send(apiResponse(results));
  });
});
function apiResponse(results) {
  return JSON.stringify({"status":200,"error":null,"response":results})
}
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});