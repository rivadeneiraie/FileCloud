"use client";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function SearchBar({ placeholder }: { placeholder?: string }) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams as any);
    params.set("page", "1");
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="flex-1 bg-surface rounded-lg shadow-lg flex items-center px-3 py-3">
      <input
        type="text"
        placeholder={placeholder || "Buscar..."}
        className="w-full bg-transparent outline-none text-primary placeholder:text-primary"
        defaultValue={searchParams.get("query")?.toString() || ""}
        onChange={e => handleSearch(e.target.value)}
      />
      <FontAwesomeIcon icon={faSearch} className="w-5 h-5 hover:text-primary" />
    </div>
  );
}
