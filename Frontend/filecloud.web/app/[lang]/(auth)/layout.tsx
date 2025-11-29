import Logo from "@/components/layout/Logo";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex items-center justify-between p-2">
        <Logo />
      </div>
      {children}
    </div>
  );
}