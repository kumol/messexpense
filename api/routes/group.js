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
            "message": "Successfully created",
            "body":{"group":newGroup}
        })
    }catch(error){
        res.status(500).json({
            "message": "Failed while creating new group",
            "body":{"error":error}
        })
    }
});

router.put("/:id", async(req,res,next)=>{
    try{
        let updatedGroup = {...req.body},
            group = await group.updateOne({_id: req.params.id},{$set:updatedGroup});
        
        res.status(200).json({
            "message": "Successfully updated",
            "body":{"group":group}
        })
    }catch(error){
        res.status(500).json({
            "message": "Update failed!",
            "body":{"error":error}
        })
    }
})

module.exports = router;