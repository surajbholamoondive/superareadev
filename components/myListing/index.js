import { useState, useRef, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useRouter } from 'next/router';
import threedot from "../../assets/M-verification/3vertical.svg"
import Image from 'next/image';
import Styles from './index.module.css';
import { GLOBALLY_COMMON_TEXT } from '@/textV2';
const{deleteButton}=GLOBALLY_COMMON_TEXT.buttons
const {editText,verifyPropertyText}=GLOBALLY_COMMON_TEXT.text

const OptionsMenu = ({ onEdit, onDelete, properties }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const router = useRouter();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleEdit = () => {
    onEdit();
    closeMenu();
  };

  const handleDelete = () => {
    onDelete();
    closeMenu();
  };

  const handleVerifying = () => {
    router.push(`/user/Mverification?propertyId=${properties[0]._id}`);
    closeMenu();
  };

  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      closeMenu();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        onClick={toggleMenu}
        className="inline-flex justify-center items-center p-2 rounded-full hover:bg-syan-600 focus:outline-none"
        id="options-menu-button"
        aria-haspopup="true"
        aria-expanded="true"
      >
        {/* Three dots icon */}

        <span>
          <Image src={threedot} width={5} height={5} alt='image' />
        </span>
      </button>

      {isOpen && (
        <div
          className={`absolute right-0 mt-2 w-44 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none ${Styles.menu}`}
          role="menu"
          aria-orientation="vertical"
          labelled="options-menu-button"
          tabIndex="-1"
        >
          <div className="py-1" role="menu">
            {/* Menu items */}
            <button onClick={handleEdit} className="text-gray-700 block px-4 py-2 text-sm hover:bg-syan-600" role="menuitem">
              <FaEdit className="inline mr-2" /> {editText}
            </button>
            <button onClick={handleDelete} className="text-red-600 block px-4 py-2 text-sm hover:bg-syan-600" role="menuitem">
              <FaTrash className="inline mr-2" /> {deleteButton}
            </button>
            <button onClick={handleVerifying} className="text-gray-700 block px-4 py-2 text-sm hover:bg-syan-600" role="menuitem">
              <FaEdit className="inline mr-2" /> {verifyPropertyText}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OptionsMenu;
