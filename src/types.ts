export type TCartItem = {
  id: number;
  nama: string;
  harga: number;
  gambar: string;
  quantity: number;
  catatan?: string;
};

export type TAddCatatan = {
  id: number;
  catatan: string;
};

export type TOrderData = {
  nominal_diskon: number;
  nominal_pesanan: number;
  items: {
    id: number;
    catatan: string;
    harga: number;
  }[];
};

export type TVoucher = {
  id: number;
  kode: string;
  nominal: number;
  created_at: string;
  updated_at: string;
};

export interface CartState {
  items: TCartItem[];
  voucher?: string;
}
