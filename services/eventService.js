const EventModel = require('../models/EventModel');

class EventService {
   
   toObject(EventModel){
      return EventModel ? CandidateModel.toObject() : null;
   }
   
   async create(eventData){
      let eventExists = await EventModel.exists({rg: eventData.rg});
      if (eventExists)
         return null;
      const accessCode = Math.floor(100000 + Math.random()*900000);
      console.log(accessCode);
      //emailOctopus.createEvent(eventData,accessCode);
      EventData.hashedAccessCode = await bcrypt.hashSync(accessCode.toString(),saltRounds);
      const Event = new CandidateModel(eventData);

      return this.toObject(await Event.save()) 
   }

   async getQuery(query) {
      return await EventModel.find(query).lean();
   }

   async getPage(query){
      const defaultOptions = {
         page: 1,
         limit: 10,
         populate:[
            "additionalInfo",
            "eventStatus"
         ]
      }
      const defaultQuery = {}
      if(query.page <= 0)
         query.page = defaultOptions.page;
      if(limit <= 0)
         query.limit = defaultOptions.limit;
      
      return await EventModel.paginate({...defaultQuery},{...defaultOptions, ...query});
   }

   async populateAll() {
	   const listEvents = await CandidateModel.find();
	 
	   const populatedList = await listEvents.map(async  p=> {
		   console.log(p)
		   p = await p.populate('additionalInfo');
         console.log(p)
         p = await p.populate('eventStauts');
	   });
	 return populatedList;
   }
   
   async getById({_id}){
      console.log(_id);
      const event = await EventModel.findOne({_id}).populate('additionalInfo').populate('candidateStatus').lean();
      console.log(event);
      return event;
   }

   async getByRg({rg}){
      return await EventModel.findOne({rg}).populate('additionalInfo').populate('eventStatus').lean();
   }

   async updateByRg(EventData) {
      let eventExists = await EventModel.exists({rg: CandidateData.rg});
      if (!eventExists)
         return null;
      return await EventModel.patchUpdate({rg: CandidateData.rg}, CandidateData);
   }

   async deleteByRg({rg}) {
      let eventExists = await EventModel.exists({rg});
      if (!eventExists)
         return null;
      return await EventModel.deleteOne({rg});
   }

   async deleteAll() {
      return await EventModel.deleteMany();
   }
}

const eventServiceInstance = new EventService();
module.exports = eventServiceInstance
