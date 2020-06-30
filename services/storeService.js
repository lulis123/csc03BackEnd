const StoreModel = require('../models/StoreModel');

class StoreService {
   
   toObject(StoreModel){
      return StoreModel ? CandidateModel.toObject() : null;
   }
   
   async create(storeData){
      const elapsedTime = storeData.insideMeasure.time - eventData.outsideMeasure.time
      if(elapsedTime < 0)

      const Store = new CandidateModel(storeData);

      return this.toObject(await Store.save()) 
   }

   async getAll(){
      return await StoreModel.find().lean();
   }

   async getQuery(query) {
      return await StoreModel.find(query).lean();
   }

   async getByStoreNumber({storeNumber}){
      return await StoreModel.findOne({storeNumber}).lean();
   }

   async updateStoreByNumber(storeData){
      const storeExists = await StoreModel.exists({storeNumber: storeData.storeNumber});
      if(!storeExists)
         return null
      return await StoreModel.patchUpdate({storeNumber: storeData.storeNumber});
   }

   async deleteById({_id}) {
      let storeExists = await StoreModel.exists({_id});
      if (!storeExists)
         return null;
      return await StoreModel.deleteOne({_id});
   }

   async deleteAll() {
      return await StoreModel.deleteMany();
   }
}

const storeServiceInstance = new StoreService();
module.exports = storeServiceInstance