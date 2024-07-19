import { Link } from "react-router-dom";
const Navbar = (websiteTheme: any) => {
  return (
    <div
      style={{
        backgroundColor: websiteTheme.bgColor,
        color: websiteTheme.textColor,
      }}
      className="hidden  z-20 lg:flex text-[14px] sm:text-[16px]  gap-4 lg:gap-6 xl:gap-8 lg:text-[18px] xl:text-[20px] mt-[30px]  items-center "
    >
      <Link to={"/profile"}>
        <p>profile</p>
      </Link>
      <Link to={"/"}>
        <p>exit</p>
      </Link>
    </div>
  );
};

export default Navbar;
