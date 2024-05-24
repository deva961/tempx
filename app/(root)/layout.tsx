import { Navbar } from "@/components/navbar";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto pt-32">{children}</div>
    </>
  );
};

export default Layout;
