import Footer from "@/app/components/footer/Footer";
import Header from "@/app/components/header/Header";

const AppLayout = ({ children }) => {
  return (
    <div className="h-full flex flex-col">
      <Header />
      <main className="container max-w-7xl mx-auto flex-1 p-2">{children}</main>
      <Footer />
    </div>
  );
};

export default AppLayout;
