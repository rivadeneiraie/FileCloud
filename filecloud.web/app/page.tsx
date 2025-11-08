"use client";

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuthStore } from "@/lib/store/authStore";
import { getPublicFiles, FileDTO } from "@/lib/services/FilesServices";
import Logo from "@/components/layout/Logo";
import { useEffect, useState } from "react";


export default function Home() {

  const [files, setFiles] = useState<FileDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadFiles = async () => {
      try {
        const data = await getPublicFiles();
        setFiles(data);
      } catch (err) {
        console.error(err);
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
        <div className="w-1/3 bg-surface rounded-lg shadow-lg flex items-center px-3 py-3 "> 
          <input
            type="text"
            placeholder="Buscar..."
            className="w-full bg-transparent outline-none text-primary placeholder:text-primary"
          />
          <FontAwesomeIcon icon={faSearch}  className="mr-2 w-5 h-5 hover:text-primary"  />
        </div>
      </div>
      <div className="grow flex px-4 pt-2 ">
        <div className="bg-surface rounded-xl shadow-lg w-full p-4">
          <table className="min-w-full border border-gray-200 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left border">id</th>
                <th className="px-4 py-2 text-left border">fileName</th>
                <th className="px-4 py-2 text-left border">uploadDate</th>
                <th className="px-4 py-2 text-left border">uploadUser</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file) => (
                <tr key={file.id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{file.id}</td>
                  <td className="border px-4 py-2">{file.fileName}</td>
                  <td className="border px-4 py-2">
                    {new Date(file.uploadDate).toLocaleDateString()}
                  </td>
                  <td className="border px-4 py-2">{file.uploadUser}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex items-center justify-center p-2">
         <span className="font-bold  ">Plataforma para subir archivos</span>
      </div>
    </div>
  );
}
 