import React from "react";

type CategoryHeaderProps = {
  children: React.ReactNode;
};

function CategoryHeader({ children }: CategoryHeaderProps) {
  return (
    <h2 className='relative pb-2 font-semibold'>
      {children}
      <div className='absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-red-700 to-transparent' />
    </h2>
  );
}

export default CategoryHeader;
