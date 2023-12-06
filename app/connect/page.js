'use client'
import React, { useEffect, useState } from 'react';
import PhoneInterface from './PhoneInterface';
import MembershipTable from './MembershipTable';
import ConnectCCP from '../component/ConnectCCP';



export default function page() {

    const [activeTab, setActiveTab] = useState('tab1');
    // Log the current value of activeTab
    console.log("Current active tab: ", activeTab);
    return (
        <div className='flex container mx-auto p-4"'>
            <MembershipTable />
            <PhoneInterface />
            <ConnectCCP />
        </div>


    );
}
