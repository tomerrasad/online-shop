const jwt = require('jsonwebtoken')


function vu(req,res,next){
    console.log("token from mw:", req.headers.authorization)
try {
    jwt.verify(req.headers.authorization,process.env.TOKEN_SECRET, (err, payload)=>{
    })
} catch (error) {
    return res.status(401).send(err)

}
next()
}

module.exports = vu