import { Link } from "react-router-dom";

interface IProps {
  title: string;
  link: string;
  className?: string;
}
const NavLink: React.FC<IProps> = ({ title, link, className = "" }) => (
  <Link
    to={link}
    className={`text-gray-800 hover:text-sky-900 px-4 ${className}`}
  >
    {title}
  </Link>
);

export default NavLink;
