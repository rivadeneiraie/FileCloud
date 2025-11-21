
"use client";
import { useState, useEffect } from "react";
import { faUser, faUpload, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "@/components/layout/Logo";
import SearchBar from "@/components/common/SearchBar";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const router = useRouter();
  const isLogin = useAuthStore().token !== null;
  const logout = useAuthStore((state) => state.logout);

  return (
    <div className="min-h-screen h-screen flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-2">
        <Logo />
        <div className="w-1/3 flex items-center gap-2 relative">
          <div className="flex-1">
            <SearchBar placeholder="Buscar..." />
          </div>
          <div>
            <FontAwesomeIcon
              icon={faUser}
              className="w-20 h-20 hover:text-primary cursor-pointer"
              onClick={() => setMenuOpen((open) => !open)}
            />
            {menuOpen && (
              <div className="absolute right-0 mt-2 bg-white border rounded shadow-lg z-10 min-w-[120px]">
                {!isLogin ? (
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => {
                      router.push("/login");
                      setMenuOpen(false);
                    }}
                  >
                    Login
                  </button>
                ) : (
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => {
                      logout();
                      setMenuOpen(false);
                    }}
                  >
                    Logout
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Main content with sidebar */}
      <div className="flex grow px-4 pt-2 h-full min-h-0">
        {/* Sidebar */}
        <div
          className={`
            flex flex-col bg-surface rounded-lg shadow-lg p-2
            transition-all duration-300
            h-full min-h-full
            items-center
            relative
            ${sidebarOpen ? "w-48 min-w-48" : "w-16 min-w-16"}
            md:${sidebarOpen ? "w-48 min-w-48" : "w-16 min-w-16"}
            ${!sidebarOpen && "sm:w-12 sm:min-w-12"}
          `}
        >
          {/* Collapse/Expand button (only on small screens) */}
          <button
            className="absolute -right-4 top-4 z-20 md:hidden p-0 m-0 bg-transparent border-none shadow-none outline-none focus:outline-none"
            onClick={() => setSidebarOpen((open) => !open)}
            style={{ transform: sidebarOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
            tabIndex={0}
            aria-label="Expandir o contraer menú"
          >
            <FontAwesomeIcon icon={faPlay} className="w-6 h-6" />
          </button>
          {/* Menu items */}
          <div className="flex flex-col items-center w-full mt-8">
            <button
              className={`
                flex items-center w-full px-2 py-3 rounded hover:bg-gray-100 transition
                ${sidebarOpen ? "justify-start" : "justify-center"}
              `}
              onClick={() => router.push("/subir")}
            >
              <FontAwesomeIcon icon={faUpload} className="w-6 h-6 text-primary" />
              {sidebarOpen && <span className="ml-3 text-primary font-semibold">Subir Archivo</span>}
            </button>
            {/* Agrega más items aquí si lo necesitas */}
          </div>
        </div>
        {/* Main content */}
        <div className="grow flex ml-4">{children}</div>
      </div>
      <div className="flex items-center justify-center p-2">
        <span className="font-bold">Plataforma para subir archivos</span>
      </div>
    </div>
  );
}
