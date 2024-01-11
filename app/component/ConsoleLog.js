// ConsoleLogComponent.js
import React from 'react';

const ConsoleLog = ({ messages }) => {
  return (
    <div id="consoleLog" className="max-h-[700px] overflow-auto">
      {messages.map((message, index) => (
        <p key={index}><strong>{message.type}:</strong> {message.content}</p>
      ))}
    </div>
  );
};

export default ConsoleLog;
