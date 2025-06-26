import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="py-20">{children}</div>
      <Footer />
    </div>
  );
};

export default layout;
