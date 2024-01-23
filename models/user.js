
const { Schema, model, Types } = require('mongoose'); 

const userSchema = new Schema(
  {
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
      // Regular expression to validate email address
    email: {
        type: String,
        required: true,
        unique: true,
        validate: { 
          validator: function(v) {
              return /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(v);
          }
      }
    },

    friends:[
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
  ],
    thoughts:[
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
    }
  ],
  },
  {
    toJSON: {
        // include any virtual properties when data is requested
      virtuals: true, 
    },
    // prevents virtuals from creating duplicate of _id as `id`
    id: false, 
}
);

// get total count of friends on retrieval
userSchema.virtual('friendCount').get(function(){
    return this.friends.length;
});

const User = model('user',userSchema)

module.exports = User