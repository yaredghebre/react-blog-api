import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <footer class="bg-gray-900 shadow dark:bg-gray-900">
        <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          <div class="sm:flex sm:items-center sm:justify-between">
            <a
              href="https://flowbite.com/"
              class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
            >
              <span class="self-center text-gray-500 text-xl transfom transition duration-100 hover:text-white font-semibold whitespace-nowrap dark:text-white">
                My Blog.
              </span>
            </a>
            <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
              <li>
                <a
                  href="#"
                  class="transfom transition duration-100 hover:text-white hover:underline me-4 md:me-6"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="transfom transition duration-100 hover:text-white hover:underline me-4 md:me-6"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="transfom transition duration-100 hover:text-white hover:underline me-4 md:me-6"
                >
                  Licensing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="transfom transition duration-100 hover:text-white hover:underline"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <hr class="my-6 border-gray-500 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2023
            <a
              href="https://flowbite.com/"
              class="transfom transition duration-100 hover:text-white hover:underline"
            >
              My Blog.™
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
