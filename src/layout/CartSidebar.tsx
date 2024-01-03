import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiDish } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { createOrder, fetchVoucher } from "../api";
import CancelOrderToast from "../components/CancelOrderToast";
import CartItem from "../components/CartItem";
import { clearCart } from "../feature/cart/CartSlice";
import { useAppSelector } from "../hooks";
import { TCartItem, TVoucher } from "../types";

const CartSidebar = ({
  classname,
  handleCartOpen,
}: {
  handleCartOpen: () => void;
  classname: string;
}) => {
  const dispatch = useDispatch();
  const [totalPesanan, setTotalPesanan] = useState(0);
  const [nominalDiskon, setNominalDiskon] = useState(0);
  const [voucherData, setVoucherData] = useState<TVoucher>();
  const [voucherCode, setVoucherCode] = useState("");
  const cartItemsData = useAppSelector((state) => state.cart.items);

  const handleFetchVoucher = async () => {
    if (voucherCode === "") return;
    const res = await fetchVoucher(voucherCode);
    setVoucherData(res);
    if (res) return toast.success("Voucher berhasil ditambahkan!");
  };

  useEffect(() => {
    if (voucherCode) {
      handleFetchVoucher();
    }
  }, [voucherCode]);

  useEffect(() => {
    const nominalPesanan = calculateTotal();

    if (voucherData) {
      setNominalDiskon(voucherData.nominal);

      if (nominalDiskon < nominalPesanan) {
        setTotalPesanan(nominalPesanan - nominalDiskon);
      }
      if (nominalDiskon > nominalPesanan) {
        setTotalPesanan(0);
      }
    } else {
      setTotalPesanan(nominalPesanan);
    }
  }, [cartItemsData, voucherData]);

  const calculateTotal = () => {
    return cartItemsData.reduce(
      (total, item) => total + item.harga * item.quantity,
      0
    );
  };

  //   const { data: voucherData, refetch: refetchVoucher } = useQuery({
  //     queryKey: ["voucher", voucherCode],
  //     queryFn: () => {
  //       try {
  //         fetchVoucher(voucherCode);
  //         toast.success("Voucher berhasil ditambahkan!");
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     },
  //     enabled: false,
  //   });

  const { mutateAsync: createOrderMutation } = useMutation({
    mutationFn: createOrder,
    onSuccess: (data) => {
      dispatch(clearCart());
      setVoucherCode("");
      setVoucherData(undefined);
      toast.custom(<CancelOrderToast data={data} />, { duration: 1000 });
    },
  });

  const handleOrder = async () => {
    if (calculateTotal() === 0) return toast.error("Keranjang kosong!");

    await createOrderMutation({
      nominal_diskon: nominalDiskon,
      nominal_pesanan: totalPesanan,
      items: cartItemsData.map((item: TCartItem) => ({
        id: item.id,
        catatan: item.catatan ? item.catatan : "",
        harga: item.harga,
      })),
    });
  };

  return (
    <div
      className={`absolute h-screen top-0 right-0 max-w-[450px] w-[40vw] bg-white border shadow-lg p-4 space-y-2 ${classname}`}
    >
      <div className="flex items-center justify-between">
        <h1 className="flex items-center gap-2">
          <BiDish className="text-primary text-3xl" /> Main Course
        </h1>

        <button onClick={handleCartOpen}>
          <RxCross2 />
        </button>
      </div>

      <div className="space-y-4">
        {cartItemsData.map((item: TCartItem) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>

      <hr />

      <div className="space-y-2">
        <p>Tambah Voucher</p>
          <input
            type="text"
            placeholder="Masukkan vouchermu disini..."
            className="flex items-center justify-between border p-2 w-full rounded-md gap-2"
            value={voucherCode}
            onChange={(e) => setVoucherCode(e.target.value)}
          />
          {/* <button
            className="flex justify-between bg-gray-200 px-4 py-2 rounded-md"
            onClick={handleFetchVoucher}
            >
            Tambah
        </button> */}
        {/* <div className="flex items-center justify-between border p-2 w-full rounded-md gap-2">
        </div> */}

        <div className="flex justify-between bg-gray-200 px-4 py-2 rounded-md">
          <p>Total</p>
          <p>Rp. {totalPesanan}</p>
        </div>

        <button
          className="bg-primary text-white w-full py-2 px-4 rounded-md"
          onClick={handleOrder}
        >
          Buat Pesanan
        </button>
      </div>
    </div>
  );
};

export default CartSidebar;
