import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import DocumentModel from '@/models/Document';
import { ApiConfig } from '@/models/ApiConfig';
import { Users, FileText, Key, Activity } from 'lucide-react';

import AdminCharts from '@/components/admin/AdminCharts';

async function getAdminStats() {
    await dbConnect();

    const [userCount, docCount, recentDocs, apiConfigs, allDocs] = await Promise.all([
        User.countDocuments(),
        DocumentModel.countDocuments(),
        DocumentModel.find().sort({ createdAt: -1 }).limit(5).populate('userId', 'email name'),
        ApiConfig.find(),
        DocumentModel.find({
            createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
        }).select('createdAt')
    ]);

    // Aggregate docs by day for the last 7 days
    const last7Days = Array.from({ length: 7 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (6 - i));
        return {
            name: d.toLocaleDateString('en-US', { weekday: 'short' }),
            date: d.toISOString().split('T')[0],
            value: 0
        };
    });

    allDocs.forEach(doc => {
        const dateStr = doc.createdAt.toISOString().split('T')[0];
        const day = last7Days.find(d => d.date === dateStr);
        if (day) day.value++;
    });

    let totalApiRequests = 0;
    let rateLimitedKeys = 0;
    const apiUsageData: { name: string; value: number }[] = [];

    apiConfigs.forEach(config => {
        let providerTotal = 0;
        config.keys.forEach((key: any) => {
            totalApiRequests += key.requestCount || 0;
            providerTotal += key.requestCount || 0;
            if (key.isRateLimited) rateLimitedKeys++;
        });
        apiUsageData.push({ name: config.provider, value: providerTotal });
    });

    return {
        userCount,
        docCount,
        totalApiRequests,
        rateLimitedKeys,
        recentDocs: JSON.parse(JSON.stringify(recentDocs)),
        usageHistory: last7Days,
        apiUsageData
    };
}

export default async function AdminDashboardPage() {
    const stats = await getAdminStats();

    const statCards = [
        { name: 'Total Users', value: stats.userCount, icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
        { name: 'Total Documents', value: stats.docCount, icon: FileText, color: 'text-emerald-600', bg: 'bg-emerald-100' },
        { name: 'API Requests', value: stats.totalApiRequests, icon: Activity, color: 'text-purple-600', bg: 'bg-purple-100' },
        { name: 'Rate-Limited Keys', value: stats.rateLimitedKeys, icon: Key, color: stats.rateLimitedKeys > 0 ? 'text-red-600' : 'text-gray-600', bg: stats.rateLimitedKeys > 0 ? 'bg-red-100' : 'bg-gray-100' },
    ];

    return (
        <div className="space-y-8">
            {/* Overview Stats */}
            <div>
                <h2 className="text-xl font-semibold leading-tight text-gray-800 mb-4">Overview</h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {statCards.map((stat, idx) => {
                        const Icon = stat.icon;
                        return (
                            <div key={idx} className="overflow-hidden rounded-xl bg-white p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                <div className="flex items-center">
                                    <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${stat.bg}`}>
                                        <Icon className={`h-6 w-6 ${stat.color}`} />
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-sm font-medium text-gray-500">{stat.name}</h3>
                                        <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <AdminCharts
                    data={stats.usageHistory}
                    title="Document Uploads (Last 7 Days)"
                    type="area"
                    color="#10b981"
                />
                <AdminCharts
                    data={stats.apiUsageData}
                    title="API Provider Usage"
                    type="bar"
                    color="#8b5cf6"
                />
            </div>

            {/* Recent Activity Table */}
            <div className="overflow-hidden rounded-xl bg-white shadow-sm border border-gray-100">
                <div className="border-b border-gray-200 px-6 py-5">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Recent Documents Analyzed</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {stats.recentDocs.map((doc: any) => (
                                <tr key={doc._id} className="hover:bg-gray-50">
                                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-blue-600">
                                        {doc._id.substring(0, 8)}...
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                        {doc.userId?.email || 'Unknown User'}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                        {new Date(doc.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${doc.aiExtractedData ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {doc.aiExtractedData ? 'Analyzed' : 'Pending'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                            {stats.recentDocs.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">No documents found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

