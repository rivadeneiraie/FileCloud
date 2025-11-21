"use client";

import { getPublicFiles, FileDTO } from "@/lib/services/FilesServices";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import DataTable from "@/components/common/DataTable";
import CommonLayout from "@/components/layout/CommonLayout";

export default function Index() {
  const [files, setFiles] = useState<FileDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadFiles = async () => {
    try {
      setLoading(true);
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
    <CommonLayout showPanel={false}>
        <DataTable
          loading={loading}
          error={error}
          files={files}
          query={useSearchParams().get("query")?.toLowerCase() || ""}
          loadFiles={loadFiles}
        />
    </CommonLayout>
  );
}
 