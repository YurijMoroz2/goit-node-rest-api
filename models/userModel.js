import { model, Schema } from 'mongoose';

const userSchema = new Schema(

{
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }

)

export const User = model('contacts', userSchema);