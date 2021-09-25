const Group = require("../../models/group");

const router = require("express").Router();

router.get("/:id", async(req,res)=>{
    try{
        let group = await Group.find({_id: req.params.id});
        res.status(200).json({"group":group})
    }catch(err){
        res.status(500).json({"error": err});
    }
})

router.post("/", async(req,res,next)=>{
    try{
        let count = Group.count(),
        group = new Group({
            "name": req.body.name,
            "password": req.body.password,
            "id": count? count+1 : 1,
            "user":req.body.user,
            "creator": req.body.creator,
        }),
        newGroup = await group.save();
        res.status(200).json({
            body:{"group":newGroup}
        })
    }catch(error){
        res.status(500).json({
            body:{"error":error}
        })
    }
});

router.put("/:id",(req,res)=>{

})

module.exports = router;