import mongoose from 'mongoose';

const apiKeySchema = new mongoose.Schema({
    key: { type: String, required: true },
    secret: { type: String, required: false }, // Optional, useful for Cloudinary
    alias: { type: String, required: true }, // E.g., 'Groq Key 1', 'Cloudinary Backup'
    isActive: { type: Boolean, default: true },
    isRateLimited: { type: Boolean, default: false },
    requestCount: { type: Number, default: 0 },
    lastRateLimitedAt: { type: Date, default: null },
    lastUsedAt: { type: Date, default: null },
    createdAt: { type: Date, default: Date.now },
});

const apiConfigSchema = new mongoose.Schema(
    {
        provider: {
            type: String,
            required: true,
            enum: ['groq', 'cloudinary'],
            unique: true, // Only one config doc per provider
        },
        keys: [apiKeySchema],
        updatedAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

export const ApiConfig = mongoose.models.ApiConfig || mongoose.model('ApiConfig', apiConfigSchema);
