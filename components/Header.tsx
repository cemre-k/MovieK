import logo from "@/src/assets/cemrek_logo.png";

function Header() {
  return (
    <div className='absolute top-0 left-0 border-b border-border shadow-shadow w-full h-16 flex justify-between items-center md:px-24 px-3'>
      <div>
        <img
          className='w-32 aspect-auto'
          src={logo}
          alt=''
        />
      </div>
      <div className='w-32'>search bar</div>
      <div>actions</div>
    </div>
  );
}

export default Header;
