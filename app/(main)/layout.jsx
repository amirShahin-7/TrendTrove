import Navbar from "@/components/Navbar";

const layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="py-20">{children}</div>
    </div>
  );
};

export default layout;
