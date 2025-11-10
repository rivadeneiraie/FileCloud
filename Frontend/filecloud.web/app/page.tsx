"use client";

import { faSearch, faUser, faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuthStore } from "@/lib/store/authStore";
import { getPublicFiles, FileDTO } from "@/lib/services/FilesServices";
import Logo from "@/components/layout/Logo";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


export default function Home() {
  const router = useRouter();
  const [files, setFiles] = useState<FileDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const isLogin = useAuthStore().token !== null;
  const logout = useAuthStore((state) => state.logout);

  const loadFiles = async () => {
    try {
      const data = await getPublicFiles();
      setFiles(data);
    } catch (err) {
      setError("Error al cargar los archivos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFiles();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex items-center justify-between p-2">
        <Logo />
        <div className="w-1/3 flex items-center gap-2 relative">
          <div className="flex-1 bg-surface rounded-lg shadow-lg flex items-center px-3 py-3">
            <input
              type="text"
              placeholder="Buscar..."
              className="w-full bg-transparent outline-none text-primary placeholder:text-primary"
            />
            <FontAwesomeIcon icon={faSearch} className="w-5 h-5 hover:text-primary" />
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
                      logout()
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
      <div className="grow flex px-4 pt-2 ">
        <div className="bg-surface rounded-lg shadow-lg w-full p-4">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-primary">Nombre</th>
                <th className="px-4 py-3 text-left font-semibold text-primary">Fecha</th>
                <th className="px-4 py-3 text-left font-semibold text-primary">Usuario</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file, idx) => (
                <tr
                  key={file.id}
                  className={`transition border-b border-gray-200 ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100`}
                >
                  <td className="px-4 py-3 border-b border-gray-200">{file.fileName}</td>
                  <td className="px-4 py-3 border-b border-gray-200">{new Date(file.uploadDate).toLocaleDateString()}</td>
                  <td className="px-4 py-3 border-b border-gray-200">{file.uploadUser}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-end">
            <FontAwesomeIcon icon={faRotateRight} className="w-10 h-10 hover:text-primary cursor-pointer p-2" onClick={loadFiles} />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center p-2">
         <span className="font-bold  ">Plataforma para subir archivos</span>
      </div>
    </div>
  );
}
 