import Sidebar from "./sidebar";

interface LayoutProps {
  children: React.ReactNode;
}
export default function Layout({children}: LayoutProps) {
  // Put Header or Footer Here
  return (
    <main className="flex">
      <Sidebar />
      <div className="ml-[220px] w-full h-full">{children}</div>
    </main>
  );
}