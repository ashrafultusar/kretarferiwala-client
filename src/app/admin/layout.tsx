import AdminLayout from "./AdminLayout";


export default function AdminWrapper({ children }: { children: React.ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>;
}
