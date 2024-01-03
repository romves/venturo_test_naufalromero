import {
  addCatatan,
  decrementItem,
  incrementItem,
} from "../feature/cart/CartSlice";
import { useDispatch } from "react-redux";
import { TAddCatatan, TCartItem } from "../types";

const CartItem = ({ item }: { item: TCartItem }) => {
  const dispatch = useDispatch();

  const handleIncrementItem = (itemId: number) => {
    dispatch(incrementItem(itemId));
  };

  const handleDecrementItem = (itemId: number) => {
    dispatch(decrementItem(itemId));
  };

  const handleAddCatatan = ({ id, catatan }: TAddCatatan) => {
    dispatch(addCatatan({ id, catatan }));
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <img
          src={item.gambar}
          alt="nama"
          className="w-16 h-16 object-contain rounded-md"
        />
        <div className="w-full">
          <h3 className="text-lg font-semibold">{item.nama}</h3>
          <p className="text-primary font-semibold">Rp. {item.harga}</p>

          <div className="flex items-center justify-between">
            <span>mantap</span>
            <div className="flex gap-2">
              <button
                onClick={() => handleDecrementItem(item.id)}
                className="text-white bg-primary aspect-square w-6 rounded-md"
              >
                -
              </button>
              <div className="w-6 aspect-square text-center">
                {item.quantity}
              </div>
              <button
                onClick={() => handleIncrementItem(item.id)}
                className="text-white bg-primary aspect-square w-6 rounded-md"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
      <input
        type="text"
        placeholder="Masukkan catatan disini..."
        className="border p-2 w-full rounded-md"
        value={item.catatan}
        onChange={(e) =>
          handleAddCatatan({ id: item.id, catatan: e.target.value })
        }
      />
    </div>
  );
};

export default CartItem;
