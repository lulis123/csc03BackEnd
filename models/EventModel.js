const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const mongoosePatchUpdate = require('mongoose-patch-update');
const autoIncrement = require('mongoose-plugin-autoinc');

///Schema declaration
const EventSchema = new mongoose.Schema({
   _id:{
      type: mongoose.Schema.Types.ObjectId,
      auto: true,
      description: "Auto generated id for the submitted form"
   },

   storeNumber:{
      type: mongoose.Schema.Types.Number,
      required: true,
      descrpition: "Numero da loja"
   },

   eventNumber:{
      type:mongoose.Schema.Types.Number,
      description: "Contagem do evento"
   },

   eventType:{
      type: mongoose.Schema.Types.String,
      required: true,
      description: "Classifica se foi uma entrada ou saída"
   },

   
}, {
   timestamps: true
});

///Index Creation
EventSchema.index({createdAt: 1});
EventSchema.index({eventType: 1, createdAt: 1});
EventSchema.index({eventType: 1, createdAt: -1});
EventSchema.index({createdAt: -1});

//Defining Protected Attributes
//A principio estou deixando todos protegidos (Usuário não pode mudar sua inscrição)
const protectedAttributes = [ 
];

//Defining sortable attributes
const sortableAttributes = [
   'createdAt',
   'eventType'
];

//Creating the Schema BoilerPlate
EventSchema.statics.getProtectedAttributes = () => protectedAttributes;
EventSchema.statics.getSortableAttributes = () => sortableAttributes;
EventSchema.plugin(mongoosePaginate);
EventSchema.plugin(mongoosePatchUpdate);
EventSchema.plugin(autoIncrement.plugin, {
   model: 'Event',
   field: 'eventNumber',
   startAt: 1,
   incrementBy: 1
});

module.exports = mongoose.model('Event',EventSchema);