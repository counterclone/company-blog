// src/components/Footer.tsx
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-100 text-gray-600 py-4 mt-auto border-t">
      <div className="container mx-auto px-4 text-center text-sm">
        &copy; {currentYear} Indrita Fintech Pvt. Ltd. All rights reserved.
        <br />
        Managed by Rahul Gupta, COO.
        {/* Add more footer links or info if needed */}
      </div>
    </footer>
  );
};

export default Footer;
