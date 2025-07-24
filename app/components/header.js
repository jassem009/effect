"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

export default function Header({ cart = [] }) {
  const router = useRouter();

  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    setTotalCount(count);
  }, [cart]);

  const handleGoToCart = () => {
    router.push("/cart");
  };

  const handleGoHome = () => {
    router.push("/");
  };

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/products" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="bg-blue-800 text-white p-4 flex items-center justify-between shadow-md">
      {/* Left: Logo and Title */}
      <div
        className="flex items-center gap-3 cursor-pointer flex-shrink-0"
        onClick={handleGoHome}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && handleGoHome()}
        aria-label="Go to homepage"
      >
        <svg
          width="73"
          height="40"
          viewBox="0 0 73 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          focusable="false"
        >
          <defs>
            <linearGradient
              id="grad1"
              x1="0"
              y1="0"
              x2="73"
              y2="40"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#4f46e5" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
            <filter
              id="shadow"
              x="-5"
              y="-5"
              width="83"
              height="50"
              filterUnits="userSpaceOnUse"
            >
              <feDropShadow
                dx="0"
                dy="2"
                stdDeviation="2"
                floodColor="#000"
                floodOpacity="0.25"
              />
            </filter>
          </defs>

          <rect
            width="73"
            height="40"
            rx="10"
            fill="url(#grad1)"
            filter="url(#shadow)"
          />

          <circle cx="22" cy="20" r="14" fill="#fff" />
          <path
            d="M38 12 L52 28 L38 34 Z"
            fill="#2563eb"
            opacity="0.85"
            filter="url(#shadow)"
          />

          <text
            x="58"
            y="25"
            fill="#fff"
            fontSize="16"
            fontWeight="700"
            fontFamily="Segoe UI, Tahoma, Geneva, Verdana, sans-serif"
            textAnchor="middle"
          >
            My
          </text>
          <text
            x="58"
            y="37"
            fill="#dbeafe"
            fontSize="12"
            fontWeight="600"
            fontFamily="Segoe UI, Tahoma, Geneva, Verdana, sans-serif"
            textAnchor="middle"
          >
            Store
          </text>
        </svg>
        <h1 className="text-2xl font-bold select-none">My Store</h1>
      </div>

      {/* Center: Navbar links */}
      <nav className="flex gap-8 flex-1 justify-center">
        {navLinks.map(({ label, href }) => (
          <a
            key={href}
            href={href}
            className="hover:text-blue-300 transition font-medium whitespace-nowrap"
          >
            {label}
          </a>
        ))}
      </nav>

      {/* Right: Search bar + Cart + User */}
      <div className="flex items-center gap-4 flex-shrink-0">
        <input
          type="search"
          placeholder="Search..."
          aria-label="Search products"
          className="rounded px-3 py-2 text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-300 hidden sm:block"
          style={{ minWidth: "180px" }}
        />

        <button
          onClick={handleGoToCart}
          aria-label={`Go to cart with ${totalCount} item${totalCount !== 1 ? "s" : ""}`}
          className="relative bg-white text-blue-800 px-4 py-2 rounded hover:bg-blue-100 transition focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Cart
          {totalCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs px-2 py-0.5">
              {totalCount}
            </span>
          )}
        </button>

        {/* User Profile Icon */}
        <button
          aria-label="User profile"
          className="bg-blue-700 hover:bg-blue-600 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <svg
            className="w-6 h-6 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M12 12a5 5 0 100-10 5 5 0 000 10zm-7 9a7 7 0 0114 0H5z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}
