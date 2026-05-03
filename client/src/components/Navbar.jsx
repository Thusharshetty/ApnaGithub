import { Link ,useNavigate} from 'react-router-dom';
import Dock from './Dock';
import { VscHome, VscInfo, VscSignIn, VscAccount } from "react-icons/vsc";

export default function Navbar(){
  const navigate = useNavigate();
  const items = [
    { icon: <VscHome size={18} />,className:"text-white", label: 'Home', onClick: () => navigate('/') },
    { icon: <VscInfo size={18} />, className:"text-white", label: 'About', onClick: () => alert('Info!') },
    { icon: <VscSignIn size={18} />, className:"text-white", label: 'Login', onClick: () => navigate('/auth') },
    { icon: <VscAccount size={18} />, className:"text-white", label: 'Sign Up', onClick: () => navigate('/signup') },

  ];
    return(
      <div className="fixed top-0 left-0 w-full flex justify-center p-4">
         <Dock 
    items={items}
    panelHeight={90}
    baseItemSize={60}
    magnification={80}
  />
      </div>
      
    )
}