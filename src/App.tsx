// import React from 'react';
import './globals.css';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="flex justify-center items-center bg-black overflow-y-scroll">
      <div className="w-[360px] min-h-screen bg-white">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
