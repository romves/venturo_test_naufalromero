import { BiDish } from "react-icons/bi";
import { FaShoppingCart } from "react-icons/fa";
import { useAppSelector } from "../hooks";
import { TCartItem } from "../types";

const Navbar = ({ handleCartOpen }: { handleCartOpen: () => void }) => {
  return (
    <nav className="container flex items-center justify-between p-4">
      <h1 className="flex items-center gap-2">
        <BiDish className="text-primary text-3xl" /> Main Course
      </h1>

      <button
        onClick={handleCartOpen}
        className="relative gap-2 flex items-center border border-primary px-6 py-2 rounded-md"
      >
        <CartLabel />
        <FaShoppingCart className="text-primary" /> Keranjang
      </button>
    </nav>
  );
};

export default Navbar;

const CartLabel = () => {
  const cartItemsData = useAppSelector((state) => state.cart.items);
  const calculateTotalItems = (items: TCartItem[]) => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  if (calculateTotalItems(cartItemsData) > 0)
    return (
      <div className="-top-[25%] -right-[7%] absolute bg-red-700 text-white rounded-full text-xs w-6 font-semibold aspect-square flex items-center justify-center text-center">
        {calculateTotalItems(cartItemsData)}
      </div>
    );
};
