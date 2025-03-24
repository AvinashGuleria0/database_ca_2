const express = require('express');
const Restaurant = require('../Schemas/RestaurantSchema')

const routes = express();
routes.use(express.json());

routes.post('/add', async(req, res) => {
    try{
        const {name, location, cuisine, rating, menu} = req.body;

        if (!name || !location || !cuisine || !menu){
            res.status(400).json({message: `Validation failed: fields cannot be empty`})
        }

        const newRestaurant = await new Restaurant({name, location, cuisine, rating, menu});
        await newRestaurant.save();

        res.status(200).json({message: `Created`, res: newRestaurant});

    }catch(err){
        res.status(500).json({error: `Something went wrong ${err}`})
    }
})

routes.get('/info', async(req, res) => {
    try{
        const findRes = await Restaurant.find();

        if (!findRes){
            res.status(404).json({message: `restaurant not found`})
        }
        
        res.status(201).json({res: findRes});
        
    }catch(err){
        res.status(500).json({error: `Something went wrong ${err}`})
    }
})

routes.get('/infoid/:id', async(req, res) => {
    try{      
          
        if (!req.params.id){
            res.status(404).json({message: `restaurant not found`});
        }

        const findResid = await Restaurant.findById(req.params.id);
        
        res.status(200).json({res: findResid});

    }catch(err){
        res.status(404).json({error: `restaurant not found`})
    }
})
 
routes.put('/edit/:id', async(req, res) => {
    try{

        const {name, location, cuisine, rating, menu} = req.body;
        
        if (!name && !location && !cuisine && !menu){
            res.status(400).json({message: `Validation failed: fields cannot be empty`})
        }
        
        const editUser = await Restaurant.findByIdAndUpdate(req.params.id, {name, location, cuisine, rating, menu}, {new: true})
        
        res.status(201).json({edit: editUser})
    }
    catch(err){
        res.status(500).json({error: `Something went wrong ${err}`})
    }

})

routes.delete('/delete/:id', async(req, res) => {
    try{
        const deleteUser = await Restaurant.findByIdAndDelete(req.params.id)
        
        res.status(201).json({message: "deleted",  edit: deleteUser})
    }
    catch(err){
        res.status(500).json({error: `Something went wrong ${err}`})
    }
})


module.exports = routes;