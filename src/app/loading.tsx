import { Loader2 } from 'lucide-react';

export default function Loading() {
    return (
        <div className="min-h-[80vh] flex items-center justify-center">
            <div className="text-center">
                <div
                    className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #4f46e5, #8b5cf6, #14b8a6)' }}
                >
                    <Loader2 className="w-8 h-8 animate-spin text-white" />
                </div>
                <p className="text-surface-500 text-sm font-medium">Loading...</p>
            </div>
        </div>
    );
}
