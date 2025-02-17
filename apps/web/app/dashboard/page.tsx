import React from 'react';
import {signOut} from "@workspace/auth/auth";

const Page = () => {
  return (
      <div>
        <h1>Dashboard</h1>
        <form action={async () => {
          "use server"
          await signOut()
        }}>
          <button>Sign out</ button>
        </ form>
      </div>
  );
};

export default Page;