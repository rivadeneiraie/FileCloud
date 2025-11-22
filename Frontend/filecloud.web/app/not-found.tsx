import Logo from "@/components/layout/Logo";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex items-center justify-between p-2">
        <Logo />
      </div>

        <div className="grow flex items-center justify-center">
        <div className="bg-surface rounded-xl shadow-lg p-8 max-w-sm w-full flex flex-col items-center">
            <h2 className="text-primary text-2xl font-bold">Página no encontrada</h2>
        </div>
        </div>

    </div>
  );
}