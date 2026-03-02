import mongoose, { Schema, models } from 'mongoose';

const FamilyMemberSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    name: { type: String, required: true },
    relationship: { type: String, required: true },
    dateOfBirth: { type: String, default: '' },
    bloodGroup: { type: String, default: '' },
    allergies: [{ type: String }],
    notes: { type: String, default: '' },
  },
  { timestamps: true }
);

const FamilyMember = models.FamilyMember || mongoose.model('FamilyMember', FamilyMemberSchema);
export default FamilyMember;
