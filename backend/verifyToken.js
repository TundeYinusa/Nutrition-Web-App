

const jwt = require ("jsonwebtoken");




function verifyToken (req, res, next) {

    if(req.headers.authorization !== undefined)
    {
        let token = req.headers.authorization.split(" ")[1];

        jwt.verify(token, "NutrifyApp", (err, data) => {
            if(!err)
            {
                next();
            }
            else
            {
                res.send({message: "Invalid Token"});
            }
        })
    }
    else
    {
        res.send({message: "Please send a token"});
    }
}

module.exports = verifyToken;