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
      descrpition: "Numero "
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

   insideMeasure:{
      distance:{type:mongoose.Schema.Types.Number, required: true, description:"Medida do sensor interno à loja"},
      time:{type:mongoose.Schema.Types.Number, required: true, description:"Tempo em segundos em que foi feito a medida"},
   },
   
  outsideMeasure:{
      distance:{type:mongoose.Schema.Types.Number, required: true, description:"Medida do sensor interno à loja"},
      time:{type:mongoose.Schema.Types.Number, required: true, description:"Tempo em segundos em que foi feito a medida"},
   },
   
}, {
   timestamps: true
});

///Index Creation
CandidateSchema.index({createdAt: 1});
CandidateSchema.index({eventType: 1, createdAt: 1});
CandidateSchema.index({eventType: 1, createdAt: -1});
CandidateSchema.index({createdAt: -1});

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
CandidateSchema.statics.getProtectedAttributes = () => protectedAttributes;
CandidateSchema.statics.getSortableAttributes = () => sortableAttributes;
CandidateSchema.plugin(mongoosePaginate);
CandidateSchema.plugin(mongoosePatchUpdate);
CandidateSchema.plugin(autoIncrement.plugin, {
   model: 'Event',
   field: 'eventNumber',
   startAt: 1,
   incrementBy: 1
});

module.exports = mongoose.model('Event',EventSchema);