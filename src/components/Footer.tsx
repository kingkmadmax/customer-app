import  {PaperAirplaneIcon}  from "@heroicons/react/24/outline";
import { FaFacebook } from "react-icons/fa";
import { FaGithub } from "react-icons/fa"; 
import { FaTwitter,FaInstagram,FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 py-5 mt-0">
      <div className=" mx-auto px-3  grid grid-cols-1 md:grid-cols-5 gap-1">
        
        {/* Brand */}
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-white">Exclusive</h3>

          <p className="text-sm">Subscription</p>

          {/* Smaller text */}
          <p className="text-xs">
            Get 10% off your first rental
          </p>

       <div className="relative w-52">
  <input
    type="text"
    placeholder="Enter your email"
    className="w-full border border-gray-400 rounded-md p-2 pr-10 text-xs outline-none"
  />

  <PaperAirplaneIcon
    className="
      w-4 h-4 text-gray-500 absolute 
      right-1 sm:right-2 md:right-3 
      top-1/2 -translate-y-1/2
    "
  />
</div>
          
  </div>
     <div className="space-y-3">
          <h3 className="text-xl font-bold text-white">Support</h3>

          <p className="text-sm">Contact Us</p>

          <p className="text-xs">
            Phone: +251 123 456 789
          </p>
           <p className="text-xs">
            Emaile:EthioRent@gmail.com
          </p>
          

          
          
        </div>   
             <div className="space-y-3">
          <h3 className="text-xl font-bold text-white">Accounts</h3>

          <ul>
            <li><a href="/" className="text-sm hover:text-white">Login/Register</a></li>
            <li><a href="/about" className="text-sm hover:text-white">Cart</a></li>
          </ul>

          
        </div>


        <div>
          <h3 className="text-white font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/"         className=" text-sm hover:text-white">Primery Polices</a></li>
            <li><a href="/about"    className=" text-sm hover:text-white">Term of use</a></li>
            <li><a href="/services" className=" text-sm hover:text-white">FAQ</a></li>
            <li><a href="/contact"  className=" text-sm hover:text-white">Contact</a></li>
          </ul>
        </div>

  
        <div className="space-y-3">
          <h3 className="text-white font-semibold mb-3">Our socials</h3>
          <div className="flex gap-4 text-sm">
            <a href="#" className="hover:text-white"><FaFacebook /></a>
            <a href="#" className="hover:text-white"><FaTwitter /></a>
            <a href="#" className="hover:text-white"><FaInstagram /></a>
            <a href="#" className="hover:text-white"><FaLinkedinIn /></a>
          </div>
        </div>

      </div>

      
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm">
      <p><a href="/contact" className="hover:text-white">terms and servise</a></p>
      </div>
    </footer>
  );
}   