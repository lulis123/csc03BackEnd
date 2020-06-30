const EventModel = require('../models/EventModel');

class EventService {
   
   toObject(EventModel){
      return EventModel ? CandidateModel.toObject() : null;
   }
   
   async create(eventData){
      const elapsedTime = eventData.insideMeasure.time - eventData.outsideMeasure.time
      if(elapsedTime < 0)
         eventData.eventType = "Exit";
      else
         eventData.eventType = "Entrance";
      const Event = new CandidateModel(eventData);

      return this.toObject(await Event.save()) 
   }

   async getQueryData(query){
      const {startDate, finishDate} = query;
      startDate = startDate||Date.now().setHours(0,0,0,0);
      finishDate = startDate||Date.now().setHours(23,59,59,9999);
      if(typeof query.storeNumber === "undefined")
         return await EventModel.find({createdAt: {$lte: startDate, $gte: finishDate}}).lean();
      return await EventModel.find({storeNumber: query.storeNumber, createdAt: {$lte: startDate, $gte: finishDate}}).lean();
   }

   async getQuery(query) {
      return await EventModel.find(query).lean();
   }

   async deleteById({_id}) {
      let eventExists = await EventModel.exists({_id});
      if (!eventExists)
         return null;
      return await EventModel.deleteOne({_id});
   }

   async deleteAll() {
      return await EventModel.deleteMany();
   }
}

const eventServiceInstance = new EventService();
module.exports = eventServiceInstance
