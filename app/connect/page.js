'use client'
import React, { useEffect } from 'react';
import PhoneInterface from './PhoneInterface';
import MembershipTable from './MembershipTable';
import AmazonConnectCCP from './AmazonConnectCCP';



export default function page() {

    return (
        // <div className='flex'>
        //     <SideNavBar />
        //     <div className='flex-1 md:flex h-screen relative'>
        //         <Header />
        //     </div>
        //     {/* <AmazonConnectCCP /> */}
        //     <PhoneInterface />
        //     <MembershipTable />
        // </div>

        
        <div className="container mx-auto">
            <div className="flex flex-row bg-lime-300">
                           <div className='flex-1 p-4 bg-yellow-50 mr-4'><MembershipTable /></div> 
                            <div>
                                <PhoneInterface />
                                {/* <AmazonConnectCCP />     */}
                                
                            </div>
            </div>
        </div>

    );
}
