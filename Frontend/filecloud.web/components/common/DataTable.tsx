import { faSearch, faUser, faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FileDTO } from "@/lib/services/FilesServices";
import { useState } from "react";

type DataTableProps = {
  loading: boolean;
  error: string | null;
  files: FileDTO[];
  query?: string;
  loadFiles: () => void;
};
export default function DataTable({ loading, error, files, query, loadFiles }: DataTableProps) {

    const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const filteredFiles = (files && files.length && typeof query === "string" && query.length > 0)
      ? files.filter(
          (file) =>
            file.fileName.toLowerCase().includes(query!) ||
            file.uploadUser.toLowerCase().includes(query!)
        )
      : files;
    const totalPages = Math.max(1, Math.ceil(filteredFiles.length / pageSize));
    const paginatedFiles = filteredFiles.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const goToPage = (page: number) => {
      setCurrentPage(page);
    };

    const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setPageSize(Number(e.target.value));
      setCurrentPage(1);
    };

    return (    
        <div className="bg-surface rounded-lg shadow-lg w-full p-4">
          <div className="mb-2 flex items-center">
            <label htmlFor="pageSize" className="mr-2 text-primary">Registros por página:</label>
            <select
              id="pageSize"
              value={pageSize}
              onChange={handlePageSizeChange}
              className="border rounded px-2 py-1 text-primary bg-white"
            >
              {[5, 10, 50, 100].map((size) => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-primary">Nombre</th>
                <th className="px-4 py-3 text-left font-semibold text-primary">Fecha</th>
                <th className="px-4 py-3 text-left font-semibold text-primary">Usuario</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={3} className="py-8 text-center">
                    <FontAwesomeIcon icon={faRotateRight} className="w-10 h-10 text-primary animate-spin mx-auto" />
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={3} className="py-8 text-center text-red-500 font-semibold">
                    {error}
                  </td>
                </tr>
              ) : (
                paginatedFiles.map((file, idx) => ( 
                  <tr
                    key={file.id}
                    className={`transition border-b border-gray-200 ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100`}
                  >
                    <td className="px-4 py-3 border-b border-gray-200">{file.fileName}</td>
                    <td className="px-4 py-3 border-b border-gray-200">{new Date(file.uploadDate).toLocaleDateString()}</td>
                    <td className="px-4 py-3 border-b border-gray-200">{file.uploadUser}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-1">
              <button onClick={() => goToPage(1)} disabled={currentPage === 1} className="px-2 py-1 rounded text-primary border bg-white disabled:opacity-50">{'<<'}</button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`px-2 py-1 rounded border ${page === currentPage ? 'bg-primary text-white' : 'bg-white text-primary'}`}
                >
                  {page}
                </button>
              ))}
              <button onClick={() => goToPage(totalPages)} disabled={currentPage === totalPages} className="px-2 py-1 rounded text-primary border bg-white disabled:opacity-50">{'>>'}</button>
            </div>
            <div className="flex justify-end">
              <FontAwesomeIcon icon={faRotateRight} className="w-10 h-10 hover:text-primary cursor-pointer p-2" onClick={loadFiles} />
            </div>
          </div>
        </div>
    );
}