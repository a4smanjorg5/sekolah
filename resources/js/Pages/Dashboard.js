import React, { useState } from 'react';
import Authenticated from '@/Layouts/Authenticated';
import SecondaryButton from '@/Components/SecondaryButton';
import axios from 'axios';
import { Head, Link } from '@inertiajs/inertia-react';

export default function Dashboard(props) {
    const [auditLog, setAuditLog] = useState(props.auditLog);

    const loadMoreAudit = async ({ target }) => {
        target.disabled = !0;
        const nextLog = Object.assign({}, auditLog),
         { data: log } = await axios.get(auditLog.next_page_url);
        Object.assign(nextLog, log);
        nextLog.data = auditLog.data.concat(log.data);
        setAuditLog(nextLog);
        target.disabled = !1;
    };

    return (
        <Authenticated
            auth={props.auth}
            logo={props.logo}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">{auditLog.data.length ? (
                            <table style={{borderCollapse: 'separate'}} cellSpacing="5">
                                <thead>
                                    <tr>
                                        <td>Waktu</td>
                                        <td>Pelaku</td>
                                        <td>Aksi</td>
                                    </tr>
                                </thead>
                                <tbody>
                                {auditLog.data.map(log =>
                                    <tr>
                                        <td className="pr-4">{new Date(log.time).toLocaleString()}</td>
                                        <td><Link href="" className="hover:underline">{log.user.name}</Link></td>
                                        <td>{log.action}</td>
                                    </tr>
                                )}
                                    {auditLog.next_page_url && <tr>
                                        <td colSpan="3" align="center">
                                            <SecondaryButton handleClick={loadMoreAudit}>Muat lebih...</SecondaryButton>
                                        </td>
                                    </tr>}
                                </tbody>
                            </table>
                        ) : 'Anda masuk!'}</div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
