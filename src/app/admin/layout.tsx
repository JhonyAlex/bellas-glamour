import { AdminNavbar } from "@/components/bellas/AdminNavbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AdminNavbar />
      <main className="flex-1 pt-20">{children}</main>
    </div>
  );
}
