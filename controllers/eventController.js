const express = require('express');
const eventService = require('../services/eventService');
const router = express.Router();

router.get('/getQueryData', async (req,res,next)=> {
   try{
      const eventList = await eventService.getQueryData(req.query);
      if(eventList != null)
         res.status(201).json({eventList});
      else
         res.status(204).send();
   } catch {
      res.status(404).send({error: "Error"});
   }
   next();
});

router.get('/getAll', async(req,res,next)=>{
   try{
      const evenList = await eventService.getQuery();
      if(eventList != null)
         res.status(201).json({eventList});  
      else
         res.status(204).send();
   } catch {
      res.status(404).send();
   }
   next();
});

router.post('/create', async(req,res,next)=> {
   try{
      console.log(req.body);
      const createdEvent = await eventService.create(req.body);
      console.log(createdEvent);
      if(createdEvent != null)
         res.status(200).json({createdEvent});
      else
         res.status(403).send({error: "Não foi possível criar o evento"})
   } catch(error){
      res.status(400).send();
   }
});

module.exports = router;
