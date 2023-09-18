// import React from 'react';
import './globals.css';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="flex justify-center items-center bg-black">
      <div className="w-[360px] h-screen border bg-white flex flex-col justify-center items-center">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
