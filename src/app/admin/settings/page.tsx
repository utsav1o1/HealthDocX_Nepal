export const dynamic = 'force-dynamic';
import { ApiConfig } from '@/models/ApiConfig';
import dbConnect from '@/lib/mongodb';
import { revalidatePath } from 'next/cache';
import { KeyRound, Plus, RefreshCw, Trash2, Power } from 'lucide-react';
import React from 'react';

// Server Actions
async function getApiConfigs() {
    await dbConnect();
    const configs = await ApiConfig.find().lean();
    return JSON.parse(JSON.stringify(configs));
}

async function addApiKey(formData: FormData) {
    'use server';
    const provider = formData.get('provider') as string;
    const alias = formData.get('alias') as string;
    const key = formData.get('key') as string;
    const secret = formData.get('secret') as string;

    await dbConnect();

    let config = await ApiConfig.findOne({ provider });
    if (!config) {
        config = new ApiConfig({ provider, keys: [] });
    }

    config.keys.push({ alias, key, secret, isActive: true, isRateLimited: false });
    await config.save();
    revalidatePath('/admin/settings');
}

async function removeApiKey(formData: FormData) {
    'use server';
    const provider = formData.get('provider') as string;
    const keyId = formData.get('keyId') as string;

    await dbConnect();
    await ApiConfig.updateOne(
        { provider },
        { $pull: { keys: { _id: keyId } } }
    );
    revalidatePath('/admin/settings');
}

async function toggleKeyStatus(formData: FormData) {
    'use server';
    const provider = formData.get('provider') as string;
    const keyId = formData.get('keyId') as string;
    const currentStatus = formData.get('isActive') === 'true';

    await dbConnect();
    await ApiConfig.updateOne(
        { provider, 'keys._id': keyId },
        { $set: { 'keys.$.isActive': !currentStatus } }
    );
    revalidatePath('/admin/settings');
}

async function resetRateLimit(formData: FormData) {
    'use server';
    const provider = formData.get('provider') as string;
    const keyId = formData.get('keyId') as string;

    await dbConnect();
    await ApiConfig.updateOne(
        { provider, 'keys._id': keyId },
        { $set: { 'keys.$.isRateLimited': false, 'keys.$.lastRateLimitedAt': null } }
    );
    revalidatePath('/admin/settings');
}

export default async function ApiSettingsPage() {
    const configs = await getApiConfigs();

    const renderConfigSection = (providerName: string, config: any) => {
        const keys = config ? config.keys : [];

        return (
            <div className="mb-8 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-xl font-semibold mb-4 capitalize text-gray-800 flex items-center">
                    <KeyRound className="mr-2 text-blue-500" />
                    {providerName} API Keys
                </h3>

                {keys.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Alias</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Usage</th>
                                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {keys.map((k: any) => (
                                    <tr key={k._id} className={!k.isActive ? 'bg-gray-50' : ''}>
                                        <td className="px-4 py-3 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{k.alias}</div>
                                            <div className="text-xs text-gray-500">
                                                {k.key.substring(0, 8)}...{k.key.substring(k.key.length - 4)}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap">
                                            {!k.isActive ? (
                                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                                    Disabled
                                                </span>
                                            ) : k.isRateLimited ? (
                                                <div className="flex flex-col space-y-1">
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                                                        Rate Limited
                                                    </span>
                                                    <span className="text-[10px] text-gray-500">
                                                        Since {new Date(k.lastRateLimitedAt).toLocaleString()}
                                                    </span>
                                                </div>
                                            ) : (
                                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                                    Active & Healthy
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{k.requestCount || 0} reqs</div>
                                            {k.lastUsedAt && (
                                                <div className="text-xs text-gray-500">
                                                    Last used {new Date(k.lastUsedAt).toLocaleString()}
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex items-center justify-end space-x-2">
                                                <form action={resetRateLimit}>
                                                    <input type="hidden" name="provider" value={providerName} />
                                                    <input type="hidden" name="keyId" value={k._id} />
                                                    <button
                                                        type="submit"
                                                        disabled={!k.isRateLimited}
                                                        title="Reset Rate Limit"
                                                        className={`p-1 rounded ${k.isRateLimited ? 'text-blue-600 hover:bg-blue-50' : 'text-gray-300 cursor-not-allowed'}`}
                                                    >
                                                        <RefreshCw size={16} />
                                                    </button>
                                                </form>

                                                <form action={toggleKeyStatus}>
                                                    <input type="hidden" name="provider" value={providerName} />
                                                    <input type="hidden" name="keyId" value={k._id} />
                                                    <input type="hidden" name="isActive" value={k.isActive.toString()} />
                                                    <button
                                                        type="submit"
                                                        title={k.isActive ? 'Disable Key' : 'Enable Key'}
                                                        className={`p-1 rounded ${k.isActive ? 'text-green-600 hover:bg-green-50' : 'text-gray-400 hover:bg-gray-100'}`}
                                                    >
                                                        <Power size={16} />
                                                    </button>
                                                </form>

                                                <form action={removeApiKey}>
                                                    <input type="hidden" name="provider" value={providerName} />
                                                    <input type="hidden" name="keyId" value={k._id} />
                                                    <button
                                                        type="submit"
                                                        title="Delete Key"
                                                        className="p-1 rounded text-red-600 hover:bg-red-50"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </form>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-sm text-gray-500 mb-4">No keys configured for this provider.</p>
                )}

                <div className="mt-6 border-t border-gray-100 pt-6">
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Add New {providerName} Key</h4>
                    <form action={addApiKey} className="flex gap-4 items-end flex-wrap">
                        <input type="hidden" name="provider" value={providerName} />
                        <div className="flex-1 min-w-[150px]">
                            <label className="block text-xs font-medium text-gray-700 mb-1">Alias (e.g. Free Tier 2)</label>
                            <input type="text" name="alias" required className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm" placeholder="Key Alias" />
                        </div>
                        <div className="flex-1 min-w-[200px]">
                            <label className="block text-xs font-medium text-gray-700 mb-1">API Key</label>
                            <input type="text" name="key" required className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm" placeholder="API Key" />
                        </div>
                        {providerName === 'cloudinary' && (
                            <div className="flex-1 min-w-[200px]">
                                <label className="block text-xs font-medium text-gray-700 mb-1">API Secret</label>
                                <input type="text" name="secret" required className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm" placeholder="API Secret" />
                            </div>
                        )}
                        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 flex items-center h-[38px]">
                            <Plus size={16} className="mr-1" /> Add Key
                        </button>
                    </form>
                </div>
            </div>
        );
    };

    const groqConfig = configs.find((c: any) => c.provider === 'groq');
    const cloudConfig = configs.find((c: any) => c.provider === 'cloudinary');

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-gray-900">API Key Management</h2>
                <p className="mt-1 text-sm text-gray-500">
                    Manage your rate-limits and keys here. The system will automatically cycle through Active and Healthy keys.
                </p>
            </div>

            {renderConfigSection('groq', groqConfig)}
            {renderConfigSection('cloudinary', cloudConfig)}
        </div>
    );
}
