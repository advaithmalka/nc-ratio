import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 py-12 border-t border-gray-800">
    <div className="text-center text-gray-400">
        <p>
            © 2025 <a 
                href='https://advaithmalka.github.io/' 
                className="text-blue-400 hover:text-blue-300 transition-colors font-medium underline-offset-2 hover:underline"
            >
                Advaith Malka
            </a>
            . All rights reserved.
        </p>
    </div>
</footer>
  );
}

export default Footer;