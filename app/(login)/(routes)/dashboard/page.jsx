"use client";

import { signOut } from "next-auth/react";

const DashboardPage = () => {
  return (
    <div>
      <button onClick={() => signOut()}>LOGOUT</button>
    </div>
  );
};

export default DashboardPage;
