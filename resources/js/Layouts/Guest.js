import React, { useEffect, useRef, useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import pages from '@/Components/GuestPages';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/inertia-react';
import { Transition } from '@headlessui/react';
import { createPortal } from 'react-dom';

export default function Guest({ auth, bgStyle, header, logo, theme, info: {
    npsn, tels, addr, links,
}, canLogin, canRegister, canEntry, children }) {
    const footer = useRef(),
      [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false),
      [showLinks, setShowLinks] = useState(!0);

    useEffect(() => {
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, []);

    const onScroll = () => {
        const fTop = footer.current.getBoundingClientRect().top;
        setShowLinks(fTop + 10 > window.innerHeight);
    };

    function nav_link(p) {
        return (typeof p.value == 'object' && !(p.value instanceof Array) ? (
                <NavLink>
                    {p.label}
                </NavLink>
            ) : (
                <NavLink key={p.value} href={route(typeof p.value == 'object' ? p.value[0] : p.value)} active={typeof p.value == 'object' ? p.value.findIndex(route().current, route()) >= 0 : route().current(p.value)}>
                    {p.label}
                </NavLink>
            )
        );
    }

    function rnav_link(p) {
        return (typeof p.value == 'object' && !(p.value instanceof Array) ? (
                <ResponsiveNavLink>
                    {p.label}
                </ResponsiveNavLink>
            ) : (
                <ResponsiveNavLink key={p.value} href={route(typeof p.value == 'object' ? p.value[0] : p.value)} active={typeof p.value == 'object' ? p.value.findIndex(route().current, route()) >= 0 : route().current(p.value)}>
                    {p.label}
                </ResponsiveNavLink>
            )
        );
    }

    return (
        <>
            <div className={`min-h-screen bg-${theme}-100`} style={bgStyle}>
                <div className={`bg-${theme}-50 border-b border-${theme}-100`}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between">
                            <span className={`text-${theme}-700`}>NPSN: {npsn}</span>
                            <a href="https://github.com/genrwork/yayasan#readme" className="text-gray-400" target="pengembang">Pengembang</a>
                        </div>
                    </div>
                </div>
                <nav className={`bg-${theme}-50 border-b border-${theme}-100`}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex">
                                <div className="shrink-0 flex items-center">
                                    <Link href="/">
                                        <ApplicationLogo src={logo} className={`block h-9 w-auto text-${theme}-500`} />
                                    </Link>
                                </div>

                                <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                    {pages.map(nav_link)}
                                </div>
                            </div>

                            <div className="hidden sm:flex sm:items-center sm:ml-6">
                                <div className="ml-3 relative">
                                    {auth.user ? (
                                        <Link href={route('dashboard')} className={`text-sm text-${theme}-700 underline`}>
                                            Dashboard
                                        </Link>
                                    ) : (
                                        <>
                                            {canLogin && (
                                                <Link href={route('login')} className={`text-sm text-${theme}-700 underline`}>
                                                    Masuk
                                                </Link>
                                            )}

                                            {canEntry ? (
                                                <Link href={route('ppdb')} className={`ml-4 text-sm text-${theme}-700 underline`}>
                                                    PPDB
                                                </Link>
                                            ) : canRegister && (
                                                <Link href={route('register')} className={`ml-4 text-sm text-${theme}-700 underline`}>
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
                            {pages.map(nav_link)}
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
                    <header className={`bg-${theme}-50 shadow text-${theme}-800`}>
                        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 md:flex md:justify-between lg:px-8">
                            <span className="md:block">{header}</span>
                            <span className="hidden md:flex md:shrink-0">{links.slice(0, 4).map(link =>
                                <a href={link.href} target="info">
                                    <div
                                        style={{ backgroundImage: `url(${link.icon_url})` }}
                                        className="h-6 w-6 mx-2 bg-contain bg-center"></div>
                                </a>
                            )}</span>
                        </div>
                    </header>
                )}

                <main>{children}</main>
            </div>
            {createPortal(
                <Transition
                    show={showLinks}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                    className="fixed bottom-4 left-0 w-full md:hidden"
                >
                    <div className="max-w-7xl flex justify-center mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        <div className={`px-6 py-2 bg-${theme}-300/60 rounded-full`}>
                            <div className="flex shrink-0 space-x-3">{links.slice(0, 4).map(link =>
                                <a href={link.href} target="info">
                                    <div
                                        style={{ backgroundImage: `url(${link.icon_url})` }}
                                        className="h-8 w-8 bg-contain bg-center"></div>
                                </a>
                            )}</div>
                        </div>
                    </div>
                </Transition>
            , document.body)}
            <div className={`bg-${theme}-50 shadow-top`} ref={footer}>
                <div className="py-6">
                    {addr && <div className="max-w-7xl mx-auto mb-4 px-4 sm:px-6 lg:px-8">
                        Lokasi: <a href={addr.url} className="underline" target="addr">{addr.label}</a>
                    </div>}
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="md:flex md:space-x-8">
                            {(links.length || '') && <div className="mb-4">
                                {/*<div>Tautan</div>*/}
                                {links.map(link =>
                                    <a href={link.href} className="block underline" target="info">{link.label}</a>
                                )}
                            </div>}
                            {(tels.length || '') && <div className="mb-4">
                                <div>Hubungi</div>
                                {tels.map(telp =>
                                    <a href={'tel:' + telp} className="block underline" target="info">{telp}</a>
                                )}
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
