import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { fetchCourse } from "../api";
import { addItem } from "../feature/cart/CartSlice";
import toast from "react-hot-toast";

export type TCourseItem = {
  id: number;
  nama: string;
  harga: number;
  tipe: string;
  gambar: string;
};

const CourseList = () => {
  const dispatch = useDispatch();
  const { data: courses, isLoading } = useQuery<TCourseItem[]>({
    queryKey: ["course"],
    queryFn: fetchCourse,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleAddToCart = (course: TCourseItem) => {
    const newItem = {
      id: course.id,
      nama: course.nama,
      harga: course.harga,
      gambar: course.gambar,
      quantity: 1,
    };
    console.log(newItem);
    dispatch(addItem(newItem));
  };

  return (
    <div>
      <div className="flex-wrap flex gap-4">
        {courses?.map((course) => (
          <div
            key={course.id}
            className="shadow-xl p-4 rounded-md w-[300px] space-y-2"
          >
            <img
              src={course.gambar}
              alt={course.nama}
              className="w-full aspect-square object-contain border"
            />
            <h3 className="text-lg font-semibold">{course.nama}</h3>
            <p className="text-primary font-semibold">Rp. {course.harga}</p>

            <button
              onClick={() => {
                handleAddToCart(course);
                toast.success("Item telah ditambahkan ke keranjang!");
              }}
              className="bg-primary text-white w-full py-2 px-4 rounded-md"
            >
              Tambahkan ke Keranjang
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;
