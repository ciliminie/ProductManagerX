const express=require("express");
const app=express();

app.use(express.urlencoded({extended:true}));

const produits=[
   {"id":1,"name":"Dell","price":12000},
   {"id":2,"name":"Mac","price":22000},
   {"id":3,"name":"HP","price":11000},
   {"id":4,"name":"Toshiba","price":10200}
];

app.get("/",(req,res)=>{
    res.send("<h2> Bienvenue dans nottre app express");
});
app.get("/products",(req,res)=>{
   res.json(produits);
});
app.get("/products/:id",(req,res)=>{
   const idP=req.params.id;
   const p=produits.find(prod=>prod.id==idP);
   res.json(p);
});

app.delete("/products/:id",(req,res)=>{
    const idP=req.params.id;
    const indexP=produits.findIndex(prod=>prod.id==idP);
    produits.splice(indexP,1);
    res.redirect("/products");
});

app.post("/products",(req,res)=>{
  const p={
     "id":produits.length+1,
     "name":req.body.name,
     "price":req.body.price
  };
  produits.push(p);
  res.redirect("/products");
});

app.listen(2233,()=>{
    console.log("Server is running");
});