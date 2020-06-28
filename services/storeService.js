const EventModel = require('../models/EventModel');

class EventService {
   
   toObject(EventModel){
      return EventModel ? CandidateModel.toObject() : null;
   }
   
   async create(eventData){
      const elapsedTime = eventData.insideMeasure.time - eventData.outsideMeasure.time
      if(elapsedTime < 0)

      const Event = new CandidateModel(eventData);

      return this.toObject(await Event.save()) 
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