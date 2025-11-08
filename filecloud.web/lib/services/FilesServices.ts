import { fetchClient } from "@/lib/api/fetchClient";

export interface FileDTO {
  id: number;
  fileName: string;
  uploadUser: string;
  uploadDate:Date;
}

export async function getPublicFiles() {
  return fetchClient<FileDTO[]>("Files/public");
}