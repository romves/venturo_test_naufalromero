import { useMutation } from "@tanstack/react-query";
import { cancelOrder } from "../api";
import toast from "react-hot-toast";

const CancelOrderToast = ({ data }: any) => {
    console.log(data)
  const { mutateAsync: cancelOrderMutation } = useMutation({
    mutationFn: cancelOrder,
    onSuccess: () => {
      toast.success("Order telah dibatalkan!");
    },
  });

  return (
    <div className="p-4 shadow-lg border bg-white space-y-2 text-lg font-semibold">
      <p>Order telah dibuat</p>
      <button
        onClick={() => {
          cancelOrderMutation(data.id);
        }}
        className="bg-primary text-white w-full py-2 px-4 rounded-md"
      >
        Cancel Order
      </button>
    </div>
  );
};

export default CancelOrderToast;
