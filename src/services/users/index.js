const router = require("express").Router();

const Users = require("./users.schema")

const {TokenPairs} = require("../../utils/jwt")

const {checkBearerToken} = require("../../middlewares/auth")

router.get("/",checkBearerToken,async(req,res,next)=>{
    try {
        const allUsers = await Users.find({});
        res.send(allUsers)
    } catch (error) {
        res.status(500).send(e.message)
    }
})

router.get("/me",checkBearerToken,async(req,res,next)=>{
    try {
        
        res.send(req.user.toJSON())

    } catch (error) {
        res.status(500).send(e.message)
    }
})

router.get("/:id",async(req,res,next)=>{
    try {
        const user = await Users.findById(req.params.id);
        res.send(user)
    } catch (error) {
        res.status(500).send(e.message)
    }
})

router.post("/",async(req,res,next)=>{
    try {
        const user = await new Users(req.body).save()

        const tokenPair  = await TokenPairs({_id:user._id})
        
        res.send(tokenPair)
    } catch (error) {
        
        res.status(500).send(error.message)
    }
})

router.put("/:id",async(req,res,next)=>{
    try {
        const user = await Users.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.send(user)
    } catch (error) {
        res.status(500).send(e.message)
    }
})

router.delete("/:id",async(req,res,next)=>{
    try {
         await Users.findByIdAndDelete(req.params.id);
        res.send("OK")
    } catch (error) {
        res.status(500).send(e.message)
    }
})



module.exports = router;