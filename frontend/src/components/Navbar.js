import React from 'react';

const Navbar = () => {
  return (
    <nav className="font-sans w-full flex justify-between items-center py-6 px-10">
      <div className="flex space-x-10">
        <a href="#" className="font-bold text-black text-xl">Home</a>
        <a href="#" className="font-bold text-black text-xl">Collection</a>
      </div>
      <div className="font-bold text-black text-4xl">AIrt</div>
      <button className="py-3 px-6 bg-blue-600 text-white font-bold rounded-full text-lg">
        View More
      </button>
    </nav>
  );
};

export default Navbar;