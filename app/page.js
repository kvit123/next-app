'use client'
import * as React from 'react';
import Grid from '@mui/system/Unstable_Grid/Grid';
import SideNavBar from './component/SideNavBar';
import Header from './component/Header';
import LeftColumn from './component/LeftColumn';
import RightColumn from './component/RightColumn';


export default function page() {
  return (

    <div className='flex'>
        <SideNavBar />
        <div className='flex-1 md:flex h-screen relative'>
          <Header />
          <LeftColumn />
          <RightColumn />
        </div>
    </div>

  );
}