"use client"
import React, { useEffect, useState } from 'react';

const Page = () => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "/connect-release/connect-streams-min.js";
    script.async = true;
    script.onload = () => setIsScriptLoaded(true);
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (isScriptLoaded) {
      const containerDiv = document.createElement("div");
      containerDiv.id = "containerDiv";
      document.body.appendChild(containerDiv);

      window.connect.core.initCCP(containerDiv, {
        ccpUrl: "https://thconnect.my.connect.aws/ccp-v2/",
        loginPopup: true,
        region: 'ap-southeast-1',
        // Other necessary configuration...
      });
    }
  }, [isScriptLoaded]);

  return (
    <div>
      <div id="containerDiv" className="hidden"></div>
      {/* Other elements */}
    </div>
  );
};

export default Page;
