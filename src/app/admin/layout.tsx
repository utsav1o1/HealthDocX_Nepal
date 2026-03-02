'use client';

import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, Users, FileText, Settings, User as UserIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import React from 'react';

const sidebarLinks = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Users', href: '/admin/users', icon: Users },
    { name: 'Documents', href: '/admin/documents', icon: FileText },
    { name: 'API Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const pathname = usePathname();

    React.useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/signin');
        } else if (status === 'authenticated' && (session?.user as any)?.role !== 'admin') {
            router.push('/dashboard');
        }
    }, [status, session, router]);

    if (status === 'loading') {
        return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
    }

    if (status === 'authenticated' && (session?.user as any)?.role !== 'admin') {
        return null; // Don't render while redirecting
    }

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200">
                <div className="flex h-16 items-center border-b border-gray-200 px-6">
                    <Link href="/admin" className="text-xl font-bold text-blue-600">Admin Panel</Link>
                </div>
                <nav className="flex-1 space-y-1 px-4 py-4">
                    {sidebarLinks.map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    isActive
                                        ? 'bg-blue-50 text-blue-600'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                                    'group flex items-center rounded-md px-2 py-2 text-sm font-medium'
                                )}
                            >
                                <Icon
                                    className={cn(
                                        isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-500',
                                        'mr-3 h-5 w-5 flex-shrink-0'
                                    )}
                                    aria-hidden="true"
                                />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
            </aside>

            {/* Main content */}
            <div className="flex flex-1 flex-col overflow-hidden">
                <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
                    <h1 className="text-2xl font-semibold text-gray-900">
                        {sidebarLinks.find(link => link.href === pathname)?.name || 'Admin'}
                    </h1>
                    <div className="flex items-center">
                        <span className="text-sm text-gray-500 mr-2">{session?.user?.email}</span>
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                            <UserIcon size={18} />
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
