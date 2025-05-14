import { Link } from "react-router-dom";
import logo from "../Assets/Logo.png";

function Header() {
  return (
    <header className=" bg-bg-spring text-spring h-16 w-full grid  grid-cols-8 items-center font-bold">
      <Link to="/">
        <img className=" px-3 py-3 col-span-1 w-full h-16 object-contain" src={logo}></img>
      </Link>
      <form className="col-span-2 flex gap-2">
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </button>
        <input
          className="w-full pl-2 bg-transparent placeholder-spring border rounded border-spring"
          placeholder="축제명, 지역을 입력해주세요."
        />
      </form>
      <div className="col-span-2"></div>
      <nav className="col-span-2">
        <ul className="flex justify-around pr-5">
          <Link to="/region">
            <li>지역별</li>
          </Link>
          <Link to="month">
            <li>월별</li>
          </Link>
          <Link to="upcoming">
            <li>진행 예정 축제</li>
          </Link>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
