const express = require('express');

const Client = require('../models/Client');
const auth = require('../middlewares/auth');

const router = express.Router();

router.get('/', auth, async (req, res) => {
    try {
        const clients = await Client.find({user:req.user.id});
        if(!clients){
            return res.status(404).send({message:'You have no clients!', success: false});
        }
        res.status(200).send({clients,success:true});
    } catch (error) {
        console.log(error);
    }
});

router.get('/:id', auth, async(req,res)=>{
    try {
        const client = await Client.findOne({_id:req.params.id,user:req.user.id});
        if(!client){
            return res.status(404).send({message: 'Client was not found!', success: false});
        }
        res.status(200).send({client,success:true});
    } catch (error) {
        console.log(error);
    }
});

router.post('/', auth,async (req, res) => {
    try {
        const oldClient = await Client.findOne({email: req.body.email});
        if(!oldClient){
            const client = new Client({
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                balance: req.body.balance,
                user: req.user.id
            });
            const newClient = await client.save();
            res.status(201).send({client:newClient,message:`Client ${req.body.name} has been added!`, success:true});            
        } else {
            res.status(400).send({message:'You already have a client with this email!', success:false});
        }
        
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});

router.put('/:id', auth, async (req,res)=>{
    try {
        const updatedClient = await Client.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
        if(!updatedClient){
            return res.status(404).send({message: 'Client was not found!',success:false})
        }
        res.status(200).send({client:updatedClient,message:`Client ${updatedClient.name} has been updated!`,success: true});        
    } catch (error) {
        res.status(400).send(error);
        console.log(error);
    }
});

router.delete('/:id', auth, async (req, res)=>{
    try {
        const client = await Client.findByIdAndRemove(req.params.id);
        if(!client){
           return res.status(404).send({message: 'Client was not found!', success: false});
        }
        res.status(200).send({message:`Client ${client.name} has been deleted!`,success: true});
    } catch (error) {
        res.status(400).send(error)
        console.log(error);
    }
});

module.exports = router;