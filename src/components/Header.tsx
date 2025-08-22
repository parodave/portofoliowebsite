import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import LanguageSelector from "./LanguageSelector";
import ThemeToggle from "./ThemeToggle";
import SocialLinks from "./SocialLinks";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const { t } = useTranslation();
  const navItems = [
    { label: t("nav.home"), to: "/#hero" },
    { label: t("nav.about"), to: "/#about" },
    { label: t("nav.skills"), to: "/#skills" },
    { label: t("nav.projects"), to: "/#projects" },
    { label: t("nav.experience"), to: "/#experience" },
    { label: t("nav.contact"), to: "/#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 py-4 px-6 md:px-10 ${
        scrolled ? "bg-light/90 dark:bg-darker/90 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          {/* KH. logo animé */}
          <motion.a
            href="/"
            initial={{ opacity: 0, scale: 0.6, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{
              duration: 1.2,
              ease: "easeOut",
              type: "spring",
              stiffness: 70,
              damping: 10,
            }}
            className="text-2xl font-bold text-black dark:text-white drop-shadow-xl tracking-wide"
          >
            KH.
          </motion.a>
          <div className="hidden md:block">
            <SocialLinks />
          </div>
        </div>

        {/* Language selector + theme toggle */}
        <div className="hidden md:flex items-center ml-4 space-x-4">
          <LanguageSelector />
          <ThemeToggle />
        </div>

        {/* Menu desktop */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hidden md:flex space-x-8"
        >
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.to}
              className="text-black hover:text-gray-700 dark:text-white dark:hover:text-gray-300 transition-colors duration-300"
            >
              {item.label}
            </Link>
          ))}
        </motion.nav>

        {/* Bouton menu mobile */}
        <button
          className="md:hidden text-black dark:text-white"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close Menu" : "Open Menu"}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Menu mobile */}
      <motion.div
        ref={menuRef}
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: isOpen ? 1 : 0,
          height: isOpen ? "auto" : 0,
          display: isOpen ? "flex" : "none",
        }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 top-16 bg-white dark:bg-darker flex-col items-center pt-10 z-40 md:hidden"
      >
        <div className="flex flex-col items-center space-y-8 w-full">
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.to}
              onClick={() => setIsOpen(false)}
              className="text-xl text-black hover:text-gray-700 dark:text-white dark:hover:text-gray-300 transition-colors duration-300"
            >
              {item.label}
            </Link>
          ))}
          <SocialLinks />
          <ThemeToggle />
          <div className="md:hidden">
            <LanguageSelector />
          </div>
        </div>
      </motion.div>
    </header>
  );
};

export default Header;