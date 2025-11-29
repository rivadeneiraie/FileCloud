"use client";

import DataTable from "@/components/common/DataTable";
import { FileDTO, getUserFiles } from "@/lib/services/FilesServices";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {

  const [files, setFiles] = useState<FileDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadFiles = async () => {
    try {
      setLoading(true);
      const data = await getUserFiles();
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
    <DataTable
      loading={loading}
      error={error}
      files={files}
      query={useSearchParams().get("query")?.toLowerCase() || ""}
      loadFiles={loadFiles}
    />
  );
}