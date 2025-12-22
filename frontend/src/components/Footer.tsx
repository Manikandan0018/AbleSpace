import {
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaFacebookF,
} from "react-icons/fa";

export default function LegalFooter() {
  return (
    <footer className="bg-black text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        {/* Left: Logo + text */}
        <div className="flex items-start gap-6">
          {/* Logo */}
          <div className="w-12 h-12 bg-pink-600 flex items-center justify-center font-bold text-white">
            TF
          </div>

          {/* Legal text */}
          <div className="text-sm text-gray-400 leading-relaxed max-w-md">
            © {new Date().getFullYear()} TaskFlow — a collaborative task
            management platform.
            <br />
            All Rights Reserved.
          </div>
        </div>

        {/* Right: Social Icons */}
        <div className="flex items-center gap-3">
          {[
            { icon: <FaInstagram />, label: "Instagram" },
            { icon: <FaTwitter />, label: "Twitter" },
            { icon: <FaLinkedinIn />, label: "LinkedIn" },
            { icon: <FaFacebookF />, label: "Facebook" },
          ].map((item, idx) => (
            <a
              key={idx}
              href="#"
              aria-label={item.label}
              className="
                w-10 h-10
                flex items-center justify-center
                border border-white/20
                text-white
                hover:bg-white hover:text-black
                transition
              "
            >
              {item.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
