"use client"
import React, {use} from 'react';

const MyInfo = ({infos}: { infos: Promise<any> }) => {
  const info = use(infos)
  return (
      <div>
        <h1>My Info</h1>
        <pre>{JSON.stringify(info)}</pre>
      </div>
  );
};

export default MyInfo;