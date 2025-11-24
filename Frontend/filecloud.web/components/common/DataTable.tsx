import { faSearch, faUser, faRotateRight, faSort, faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FileDTO } from "@/lib/services/FilesServices";
import { useState } from "react";
import { useTranslation } from "@/lib/helpers/useTranslation";

type DataTableProps = {
  loading: boolean;
  error: string | null;
  files: FileDTO[];
  query?: string;
  loadFiles: () => void;
};

export default function DataTable({ loading, error, files, query, loadFiles }: DataTableProps) {
  const [pageSize, setPageSize] = useState(10);
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  let sortedFiles = [...files];
  if (sortBy) {
    sortedFiles.sort((a, b) => {
      let aValue = a[sortBy as keyof FileDTO];
      let bValue = b[sortBy as keyof FileDTO];
      if (sortBy === "uploadDate") {
        aValue = new Date(aValue as string);
        bValue = new Date(bValue as string);
      }
      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }

  const filteredFiles = (sortedFiles && sortedFiles.length && typeof query === "string" && query.length > 0)
    ? sortedFiles.filter(
        (file) =>
          file.fileName.toLowerCase().includes(query!.toLowerCase()) ||
          file.uploadUser.toLowerCase().includes(query!.toLowerCase())
      )
    : sortedFiles;
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
            <label htmlFor="pageSize" className="mr-2 text-primary">{t("records_per_page")}</label>
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
                <th className="px-4 py-3 text-left font-semibold text-primary cursor-pointer" onClick={() => handleSort("fileName")}> 
                  <span className="flex items-center">{t("name")}
                    <FontAwesomeIcon
                      icon={sortBy === "fileName" ? (sortOrder === "asc" ? faSortUp : faSortDown) : faSort}
                      className="ml-2"
                    />
                  </span>
                </th>
                <th className="px-4 py-3 text-left font-semibold text-primary cursor-pointer" onClick={() => handleSort("uploadDate")}> 
                  <span className="flex items-center">{t("date")}
                    <FontAwesomeIcon
                      icon={sortBy === "uploadDate" ? (sortOrder === "asc" ? faSortUp : faSortDown) : faSort}
                      className="ml-2"
                    />
                  </span>
                </th>
                <th className="px-4 py-3 text-left font-semibold text-primary cursor-pointer" onClick={() => handleSort("uploadUser")}> 
                  <span className="flex items-center">{t("user")}
                    <FontAwesomeIcon
                      icon={sortBy === "uploadUser" ? (sortOrder === "asc" ? faSortUp : faSortDown) : faSort}
                      className="ml-2"
                    />
                  </span>
                </th>
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