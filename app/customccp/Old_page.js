'use client'

import React from 'react'
import { useEffect, useState } from 'react';
import connectCore from '../../public/connect-release/connect-streams.js'

export default function page() {

  const [connected, setConnected] = useState(false);

  useEffect(() => {

    const connect = new connectCore.Connect({

      instanceId: '1ad7df0b-4a0c-4e65-a14a-22b4fc4b55fd',

      region: 'ap-southeast-1'

    });


    connect.initCCP({

      container: document.getElementById('ccp-container'),

    });


    setConnected(true);

  }, []);

  return (
    <div className="ccp-page">

      <h1>Amazon Connect CCP</h1>

      <div id="ccp-container"></div>

      {connected ? (

        <button onClick={() => connect.start()}>Start CCP</button>

      ) : (

        <p>Loading...</p>

      )}

    </div>

  )
}
