"use client";

import DataTable from "@/components/common/DataTable";
import { FileDTO, getPublicFiles } from "@/lib/services/FilesServices";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "@/lib/helpers/useTranslation";


export default function Home() {
  const { t } = useTranslation();

  const [files, setFiles] = useState<FileDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadFiles = async () => {
    try {
      setLoading(true);
      const data = await getPublicFiles();
      setFiles(data);
    } catch (err) {
      setError(t("load_files_error"));
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