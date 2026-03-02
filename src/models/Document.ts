import mongoose, { Schema, models } from 'mongoose';

const DocumentSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    familyMemberId: { type: Schema.Types.ObjectId, ref: 'FamilyMember', default: null },
    familyMemberName: { type: String, default: '' },
    title: { type: String, required: true },
    description: { type: String, default: '' },
    fileUrl: { type: String, required: true },
    filePublicId: { type: String, required: true },
    fileType: { type: String, required: true },
    hospital: { type: String, default: '' },
    doctor: { type: String, default: '' },
    category: {
      type: String,
      enum: [
        'prescription',
        'lab-report',
        'imaging',
        'discharge-summary',
        'insurance',
        'vaccination',
        'consultation',
        'surgery',
        'other',
      ],
      default: 'other',
    },
    tags: [{ type: String }],
    aiExtractedData: {
      summary: String,
      diagnosis: [String],
      medications: [String],
      procedures: [String],
      doctorName: String,
      hospitalName: String,
      dateOfVisit: String,
      recommendations: [String],
      keyFindings: [String],
    },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

DocumentSchema.index({ userId: 1, date: -1 });
DocumentSchema.index({ userId: 1, category: 1 });

const Document = models.Document || mongoose.model('Document', DocumentSchema);
export default Document;
