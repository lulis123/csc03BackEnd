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

   accessCode:{
      type: mongoose.Schema.Types.String,
      required: true,
      description: "Codigo de acesso para a loja"
   },

   storeNumber:{
      type: mongoose.Schema.Types.Number,
      required: true,
      descrpition: "Numero da loja"
   },

   storeRevenue:{
      type:mongoose.Schema.Types.Number,
      required: false,
      description: "Receita da loja"
   },

   storeCogs:{
      type: mongoose.Schema.Types.Number,
      required: false,
      description: "Custos da loja"
   },

   storeSales:{
      type: mongoose.Schema.Types.Number,
      required: false,
      description: "Numero de vendas da loja",
   }

}, {
   timestamps: true
});

///Index Creation
StoreSchema.index({createdAt: 1});
StoreSchema.index({eventType: 1, createdAt: 1});
StoreSchema.index({eventType: 1, createdAt: -1});
StoreSchema.index({createdAt: -1});

//Defining Protected Attributes
//A principio estou deixando todos protegidos (Usuário não pode mudar sua inscrição)
const protectedAttributes = [ 
];

//Defining sortable attributes
const sortableAttributes = [
   'createdAt',
   'storeNumber'
];

//Creating the Schema BoilerPlate
StoreSchema.statics.getProtectedAttributes = () => protectedAttributes;
StoreSchema.statics.getSortableAttributes = () => sortableAttributes;
StoreSchema.plugin(mongoosePaginate);
StoreSchema.plugin(mongoosePatchUpdate);
StoreSchema.plugin(autoIncrement.plugin, {
   model: 'Event',
   field: 'storeNumber',
   startAt: 8000,
   incrementBy: 1
});

module.exports = mongoose.model('Event',EventSchema);