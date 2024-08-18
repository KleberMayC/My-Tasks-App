function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto flex justify-between items-center">
        <p>&copy; 2024 My Tasks App. All rights reserved.</p>
        <ul className="flex space-x-4">
          <li>
            <a href="#" className="hover:text-gray-400">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-400">
              Terms of Service
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-400">
              Contact Us
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
