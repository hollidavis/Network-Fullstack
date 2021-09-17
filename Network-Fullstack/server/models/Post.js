import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

export const PostSchema = new Schema(
  {
    body: { type: String, required: true },
    imgUrl: { type: String },
    creatorId: { type: ObjectId, ref: 'Account', required: true },
    likeIds: [{ type: String, ref: 'Account' }]
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

PostSchema.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})
