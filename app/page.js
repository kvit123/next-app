'use client'
import * as React from 'react';
import Grid from '@mui/system/Unstable_Grid/Grid';
import SideNavBar from './component/SideNavBar';
import Header from './component/Header';
import LeftColumn from './component/LeftColumn';
import RightColumn from './component/RightColumn';
import LandingPage from './component/LandingPage'

export default function page() {
  return (

    <div className="container mx-auto ">
        {/* <SideNavBar />
        <div className='flex-1 md:flex h-screen relative'>
          <Header />
          <LeftColumn />
          <RightColumn />
        </div> */}
        <LandingPage />
    </div>

  );
}