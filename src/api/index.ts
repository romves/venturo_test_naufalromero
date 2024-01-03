import { TOrderData } from "../types";

export const fetchCourse = async () => {
  const response = await fetch("https://tes-mobile.landa.id/api/menus");

  const data = await response.json();
  return data.datas;
};

export const createOrder = async (orderData: TOrderData) => {
  const response = await fetch("https://tes-mobile.landa.id/api/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  });

  return await response.json();
};

export const fetchVoucher = async (query: string) => {
  const response = await fetch(
    `https://tes-mobile.landa.id/api/vouchers?kode=${query}`
  );

  const data = await response.json();
  return data.datas;
};

export const cancelOrder = async (id: number) => {
  if (!id) {
    return "";
  }
  const response = await fetch(
    `https://tes-mobile.landa.id/api/order/cancel/${id}`,
    {
      method: "POST",
    }
  );

  return await response.json();
};
