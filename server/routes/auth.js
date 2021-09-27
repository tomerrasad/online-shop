const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
let { execute } = require("../connection/dal");
const vu = require("../helpers/verifyUser");


router.post("/register1", async (req, res) => {
  const {id,email,pass1,pass2} = req.body;
  if (!id || !pass1 || !email || !pass2) {
    return res.status(400).send({some:"missing some info"});
  }
  if (pass1!==pass2) {
    return res.status(400).send({some:"Password confirmation doesn't match Password"});
  }
  
  try {
    const result = await execute(
      `SELECT * FROM users WHERE id='${id}'`
    );
    if (result.length > 0) {
      return res.status(400).send({some:"id is already exist"});
    }
  } catch (err) {
    return res.status(500).send(err);
  }
  
  
  const hashedpass = await bcrypt.hash(pass1.toString(), 10);
  try {
    await execute(
      `INSERT INTO users(isadmin,email,id,pass) VALUES(false,'${email}','${id}','${hashedpass}')`
    );
    return res.status(200).send({some:'registion accepted'})

  } catch (err) {
    return res.status(500).send(err);
  }
});
router.put("/register2", async (req, res) => {
    const { city,adrress,fname,lname,id} = req.body;
    if (!city || !adrress || !fname || !lname) {
      return res.status(400).send({some:"missing some info"});
    }
    try {
      await execute(
        `UPDATE users SET city='${city}',address='${adrress}',fname='${fname}',lname='${lname}' WHERE id='${id}'`
      );
      return res.status(200).send({some:'registion accepted'})
  
    } catch (err) {
      return res.status(500).send(err);
    }
});
router.post("/login", async (req, res) => {
  const { id, pass } = req.body;

  try {
     
    const user = await execute(
      `SELECT * FROM users WHERE id='${id}'`
    );
    console.log(user);
    if (user.length === 0) {
      return res.status(400).send({some:"id not recognized"});
    }
    if (!(await bcrypt.compare(pass, user[0].pass))) {
      return res.status(400).send({some:"wrong password"});
    }
    
    const token = jwt.sign(
      {
        id: user[0].id,
        isadmin: user[0].isadmin,
      },
      process.env.TOKEN_SECRET,
      { expiresIn: "30m" }
    );
    return res.status(200).send({some:{token:token,status:200}});
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});
router.get("/shippingdetails/:id", vu, async (req, res) => {
  try {
    console.log(req.params.id);
    const shippingDetails = await execute(
      `SELECT city,address FROM users WHERE id=${req.params.id}`
    );
    

    return res.status(200).send(shippingDetails);
  } catch (err) {
    return res.status(500).send(err);
  }
});



module.exports = router;
