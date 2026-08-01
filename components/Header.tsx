import React from "react";

function Header() {
  return (
    <div className='absolute top-0 left-0 border-b-[1px] border-border shadow-shadow w-full h-16 flex justify-between items-center px-24'>
      <div>
        <img
          className='w-32 aspect-auto'
          src='../../src/assets/cemrek_logo.png'
          alt=''
        />
      </div>
      <div>search bar</div>
      <div>actions</div>
    </div>
  );
}

export default Header;
