const router = require("express").Router();
let { execute } = require("../connection/dal");
const vu = require("../helpers/verifyUser");
const moment = require("moment");
const PDFDocument = require('pdfkit');
const fs = require('fs');
const doc = new PDFDocument();

router.get("/getcart/:id", vu, async (req, res) => {
  try {
    console.log(req.params.id);
    const getCartId = await execute(
      `SELECT carts.id FROM carts WHERE userId=${req.params.id} and paid=0`
    );
    if (!getCartId[0]) {
      return res.status(200).send([]);
      
    }
    
    const getUserCart = await execute(
      `SELECT * FROM cartitem,products WHERE cartId=${getCartId[0].id} and products.id = cartitem.productId`
    );
    console.log(getUserCart);

    return res.status(200).send(getUserCart);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});
router.post("/pay", vu, async (req, res) => {
  const { userId, adrress, city, date, payment } = req.body;
  try {
    const getCartId = await execute(
      `SELECT carts.id FROM carts WHERE userId=${userId} and paid=0`
    );
    
    await execute(`UPDATE carts SET paid=1 WHERE userId=${userId} and paid=0`);
    await execute(
      `INSERT INTO orders(cartId,city,address,shippingDate,payment,paymentDate) values(${
        getCartId[0].id
      },'${city}','${adrress}',${date},${payment},${moment(new Date()).format(
        "YYYY-MM-DD"
      )})`
    );
    const getUserCart = await execute(
      `SELECT * FROM cartitem,products WHERE cartId=${getCartId[0].id} and products.id = cartitem.productId`
    );
    
    doc.pipe(fs.createWriteStream(`./recipes/rec.pdf`));
    doc
  
  .fontSize(25)
  .text('Thank you for buying in our store', 100, 100);
  doc.moveDown()
  for (const cart of getUserCart) {
    doc.text(`Product:${cart.name}, Price:${cart.price}$, units:${cart.quantity} units`,200)
    doc.moveDown()
  }
  doc.moveDown()
  doc.text(`${moment(new Date()).format(
    "YYYY-MM-DD"
  )}`,200)


  doc.end()
    return res.status(200).send({ some: "the cart is paid" ,status:200});
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});
router.post("/addtocart", vu, async (req, res) => {
  const { prodId, userId } = req.body;
  try {
    let getCartId = await execute(
      `SELECT carts.id FROM carts WHERE userId=${userId} and paid=0`
    );

    if (!getCartId[0]) {
      await execute(
        `insert into carts(paid,userId,createdDate) values(0,${userId},${moment(
          new Date()
        ).format("YYYY-MM-DD")})`
      );

      getCartId = await execute(
        `SELECT carts.id FROM carts WHERE userId=${userId} and paid=0`
      );
    }
    let cartItem = await execute(
      `SELECT quantity FROM cartitem WHERE cartId=${getCartId[0].id} AND productId=${prodId}`
    );

    if (cartItem[0]) {
      await execute(
        `UPDATE cartitem SET quantity=${
          cartItem[0].quantity + 1
        } WHERE cartId=${getCartId[0].id} AND productId=${prodId}`
      );
    } else {
      console.log(cartItem);
      await execute(
        `insert into cartitem(cartId,productId,quantity) values(${getCartId[0].id},${prodId},1)`
      );
    }

    const getUserCart = await execute(
      `SELECT * FROM cartitem,products WHERE cartId=${getCartId[0].id} and products.id = cartitem.productId`
    );
    // const getCartTotal = await execute(
    //   `select sum(products.price * cartitem.quantity) as number
    //       from products,carts,cartitem
    //       where carts.id = ${getCartId[0].id} and cartitem.productid = products.id`
    // );

    return res.status(200).send(getUserCart);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});
router.delete("/deletefromcart", vu, async (req, res) => {
  const { prodId, userId } = req.body;
  try {
    let getCartId = await execute(
      `SELECT carts.id FROM carts WHERE userId=${userId} and paid=0`
    );
    await execute(
      `DELETE FROM cartitem WHERE productId=${prodId} AND cartId=${getCartId[0].id}`
    );

    const allProducts = await execute(
      `SELECT * FROM cartitem,products WHERE cartId=${getCartId[0].id} and products.id = cartitem.productId`
    );

    return res.status(200).send(allProducts);
  } catch (err) {
    return res.status(500).send(err);
  }
});
router.get("/getorders", async (req, res) => {
  try {
    const getOrder = await execute(
      `SELECT COUNT(paid) as orders FROM carts WHERE paid = 1`
    );

    return res.status(200).send(getOrder);
  } catch (err) {
    return res.status(500).send(err);
  }
});
router.get("/getcarttotal/:id", vu, async (req, res) => {
  try {
    const getCartId = await execute(
      `SELECT carts.id FROM carts WHERE userId=${req.params.id} and paid=0`
    );
    
    const getCartTotal = await execute(
      `select sum( distinct(products.price * cartitem.quantity)) as number
      from products,carts,cartitem
      where cartitem.cartId = ${getCartId[0].id} and cartitem.productid = products.id`
    );

    return res.status(200).send(getCartTotal);
  } catch (err) {
    return res.status(500).send(err);
  }
});
router.put("/updatecart/:id", vu, async (req, res) => {
  const { quantity, productId } = req.body;
  try {
    const getCartId = await execute(
      `SELECT carts.id FROM carts WHERE userId=${req.params.id} and paid=0`
    );
    await execute(
      `UPDATE cartitem SET quantity =${quantity} WHERE cartId=${getCartId[0].id} and productId = ${productId} `
    );
    const getUserCart = await execute(
      `SELECT * FROM cartitem,products WHERE cartId=${getCartId[0].id} and products.id = cartitem.productId`
    );
    console.log(getUserCart);

    return res.status(200).send(getUserCart);
  } catch (err) {
    return res.status(500).send(err);
  }
});
router.get("/getdeliverydates", vu, async (req, res) => {
  try {
    const orderDatesArr = await execute(
      `SELECT count(shippingDate) as count, shippingDate FROM orders GROUP BY shippingDate`
    );
    console.log(orderDatesArr);

    const forbiddenDates =await orderDatesArr.reduce(
      (results, orderDate) =>
        orderDate.count >= 3
          ? [
              ...results,
              orderDate.shippingDate.toLocaleDateString("fr-CA", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              }),
            ]
          : results,
      []
    );
    console.log(forbiddenDates);

    return res.status(200).send(forbiddenDates);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

module.exports = router;
