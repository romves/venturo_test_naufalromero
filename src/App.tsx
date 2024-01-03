import { useState } from "react";
import Navbar from "./components/Navbar";
import CourseList from "./layout/CourseList";
import CartSidebar from "./layout/CartSidebar";

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleCartOpen = () => {
    setIsCartOpen((prev) => !prev);
  };

  return (
    <div className="container">
      <Navbar handleCartOpen={handleCartOpen} />
      <CourseList />
      <CartSidebar
        handleCartOpen={handleCartOpen}
        classname={`${isCartOpen ? "block" : "hidden"}`}
      />
    </div>
  );
}

export default App;
