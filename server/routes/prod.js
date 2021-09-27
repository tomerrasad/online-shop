const router = require("express").Router();
let { execute } = require("../connection/dal");
const vu = require("../helpers/verifyUser");



router.post("/addprod",vu, async (req, res) => {
    const { name,category,img,price } = req.body;
    try {
              await execute(`insert into products(name,category,img,price) values('${name}','${category}','${img}','${price}')`)
              
      return res.status(200).send({some:"product added"});
    } catch (err) {
      return res.status(500).send(err);
    }
  });
  router.get("/getprod",async (req,res)=>{
      try {
        const prods= await execute(`SELECT * FROM products`)
        return res.status(200).send(prods)
      } catch (err) {
          console.log(err);
          
      }
  })
  router.put("/editprod",vu, async (req, res) => {
    const { id,name,category,img,price } = req.body;
    try {
      await execute(`UPDATE products SET name='${name}',category='${category}',img='${img}',price=${price} WHERE id=${id}`);

      
      
      return res.status(200).send({some:"The product has been edited"});
    } catch (err) {
      return res.status(500).send(err);
    }
  });
  router.delete("/deleteprod",vu, async (req, res) => {
    const { id } = req.body;
    try {
      await execute(`DELETE FROM products WHERE id=${id}`);

      const allProducts = await execute(
        `SELECT * FROM products`);
      
      return res.status(200).send(allProducts);
    } catch (err) {
      return res.status(500).send(err);
    }
  });
  router.get("/getnumberofprods",async (req,res)=>{
    try {
      const prods= await execute(`SELECT COUNT(*) as number FROM products`)
      return res.status(200).send(prods)
    } catch (err) {
        console.log(err);
        
    }
})
 router.get("/categorys/:categoty",async (req,res)=>{
  try {
    const prods= await execute(`SELECT *  FROM products WHERE category='${req.params.categoty}'`)
    return res.status(200).send(prods)
  } catch (err) {
      console.log(err);
      
  }
})
router.get("/categorys",async (req,res)=>{

  try {
    const prods= await execute(`SELECT distinct products.category as name FROM products`)
    return res.status(200).send(prods)
  } catch (err) {
      console.log(err);
      
  }
})
router.get("/getprod/:id",async (req,res)=>{
  try {
    const prods= await execute(`SELECT * FROM products where id=${req.params.id}`)
    return res.status(200).send(prods)
  } catch (err) {
      console.log(err);
      
  }
})











module.exports = router