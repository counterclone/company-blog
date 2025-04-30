// src/components/Header.tsx
import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-gray-800 text-white shadow-md">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h3>
          {" "}
          <Link href="/" className="text-xl font-bold hover:text-gray-300">
            Indrita Fintech Pvt. Ltd. Blog
          </Link>
        </h3>
        {/* Add other nav links here if needed later */}
        {/* <div>
          <Link href="/about" className="px-3 hover:text-gray-300">About</Link>
        </div> */}
      </nav>
    </header>
  );
};

export default Header;
