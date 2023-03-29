import React, { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import pages from '@/Components/GuestPages';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/inertia-react';

export default function Guest({ auth, header, canLogin, canRegister, canEntry, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                <Link href="/">
                                    <ApplicationLogo className="block h-9 w-auto text-gray-500" />
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                {Object.keys(pages).map(function(n) {
                                    return (
                                        <NavLink key={n} href={route(n)} active={route().current(n)}>
                                            {pages[n]}
                                        </NavLink>
                                    )
                                })}
                            </div>
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ml-6">
                            <div className="ml-3 relative">
                                {auth.user ? (
                                    <Link href={route('dashboard')} className="text-sm text-gray-700 underline">
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        {canLogin && (
                                            <Link href={route('login')} className="text-sm text-gray-700 underline">
                                                Masuk
                                            </Link>
                                        )}

                                        {canEntry ? (
                                            <Link href={route('ppdb')} className="ml-4 text-sm text-gray-700 underline">
                                                PPDB
                                            </Link>
                                        ) : canRegister && (
                                            <Link href={route('register')} className="ml-4 text-sm text-gray-700 underline">
                                                Daftar
                                            </Link>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="-mr-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                    <div className="pt-2 pb-3 space-y-1">
                        {Object.keys(pages).map(function(n) {
                            return (
                                <ResponsiveNavLink key={n} href={route(n)} active={route().current(n)}>
                                    {pages[n]}
                                </ResponsiveNavLink>
                            )
                        })}
                    </div>

                    <div className="pt-1 pb-2 border-t border-gray-200">
                        <div className="space-y-1">
                            {auth.user ? (
                                <ResponsiveNavLink href={route('dashboard')} as="button">
                                    Dasbor
                                </ResponsiveNavLink>
                            ) : (
                                <>
                                    {canLogin && (
                                        <ResponsiveNavLink href={route('login')} as="button">
                                            Masuk
                                        </ResponsiveNavLink>
                                    )}

                                    {canEntry ? (
                                        <ResponsiveNavLink href={route('ppdb')} as="button">
                                            PPDB
                                        </ResponsiveNavLink>
                                    ) : canRegister && (
                                        <ResponsiveNavLink href={route('register')} as="button">
                                            Daftar
                                        </ResponsiveNavLink>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
