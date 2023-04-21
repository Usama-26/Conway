export type TOrder = {
  id: number;
  customer_id: number;
  module_id: number;
  status_is: number;
  created_by: number;
  modified_by: number;
  created_at: string;
  updated_at: string;
  products: TOrderProductsRel[];
};

export type TOrderProductsRel = {
  id: number;
  product_id: number;
  product_parts_rel_id: number;
  item_nu: number;
  qty: number;
  description: string;
  created_at: string;
  updated_at: string;
};
