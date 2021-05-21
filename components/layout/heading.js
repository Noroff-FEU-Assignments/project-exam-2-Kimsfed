import Link from "next/link";

export default function Heading({ title }) {
  return (
    <div className="header_container">
      <div className="header_title-container">
        <h1>{title}</h1>
      </div>
      <div className="navigation_container">
        <ul>
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/contact">
              <a>Contact</a>
            </Link>
          </li>
          <li>
            <Link href="/login">
              <a>Login</a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
