import { Github, Linkedin, Phone } from "lucide-react";

const Footer = () => (
  <footer className="w-full mt-16 py-5 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white">
    <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-evenly px-4 gap-8">
      {/* Website Name */}
      <div className="flex flex-col items-center">
        <span className="text-xl font-extrabold tracking-wide bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-400 bg-clip-text text-transparent">
          Trend Trove
        </span>
        <span className="text-sm font-medium mt-1">
          &copy; {new Date().getFullYear()} Created By Amir Shahin
        </span>
      </div>
      {/* Contact */}
      <div className="flex flex-col items-center">
        <a
          href="tel:+201100445395"
          className="flex items-center space-x-2 text-lg font-semibold transition-colors hover:text-green-500"
        >
          <Phone className="w-5 h-5" />
          <span>+201100445395</span>
        </a>
      </div>
      {/* Social Links */}
      <div className="flex items-center space-x-6">
        <a
          href="https://github.com/amirShahin-7"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-black"
          aria-label="GitHub"
        >
          <Github className="w-6 h-6" />
        </a>
        <a
          href="https://www.linkedin.com/in/amir-shahin-7a1a80360/"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-cyan-500"
          aria-label="LinkedIn"
        >
          <Linkedin className="w-6 h-6" />
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
