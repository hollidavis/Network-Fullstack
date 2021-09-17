import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const AccountSchema = new Schema(
  {
    subs: [{ type: String, unique: true }],
    email: { type: String, lowercase: true, unique: true },
    name: { type: String, required: true },
    picture: { type: String },
    bio: { type: String },
    coverImg: { type: String },
    github: { type: String },
    linkedin: { type: String },
    resume: { type: String },
    class: { type: String },
    graduated: { type: Boolean, default: false }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)
