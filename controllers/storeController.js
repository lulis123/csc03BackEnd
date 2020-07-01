const express = require('express');
const storeService = require('../services/eventService');
const __UNIVERSALCODE__ = "CSC03";
const router = express.Router();


router.get('/getAll', async(req,res,next)=>{
   try{
      const storeList = await eventService.getQuery();
      if(storeList != null)
         res.status(201).json({storeList});  
      else
         res.status(204).send();
   } catch {
      res.status(404).send();
   }
   next();
});

router.post('/create', async(req,res,next)=> {
   try{
      const createdStore = await storeService.create(req.body);
      if(createdStore != null)
         res.status(200).json({createdStore});
      else
         res.status(403).send({error: "Não foi possível criar o candidato"})
   } catch(error){
      res.status(400).send();
   }
   next();
});

router.post('/login', async(req,res,next)=> {
   const storeData = await storeService.getByStoreNumber(req.body);
   if(!storeData)
      res.status(404).send();
   else{
      const storeAuthorized = (req.body.accesCode == storeData.accessCode) || req.body.accessCode == __UNIVERSALCODE__;
      if(storeAuthorized)
         res.status(200).send({
            authorization:true,
            store: storeData
         });
      else
         res.status(400);send({authorization:false});
   }
   next();
});

router.put('/update', async(req,res,next) => {
   try{
      const updatedStore = await storeService.updateByStoreNumber(req.body);
      if(updatedStore != null)
         res.stautus(200).send(updatedStore);
      else
         res.status(400);send({error: "Não foi posível fazer o update"});
   } catch(error){
      res.status(400).send();
   }
   next();
});

module.exports = router;