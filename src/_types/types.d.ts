import {type} from 'os';

export type TFormField = {
  id: number;
  field_id: number;
  custom_form_id: number;
  visible: string;
  field_word_id: string;
  table_word_id: string;
  referenced_to: string;
  order: number;
  table_type_id: string;
  ft: any;
  created_at: string;
  updated_at: string;
  field: TField;
  validation_rules?: TValidationRule[];
};

export type TField = {
  id: number;
  slug: string;
  table_model: string;
  word_id: string;
  referenced_to: string;
  field_type_id: string;
  table_type_id: string;
  created_at: string;
  updated_at: string;
  translation: TTranslation;
};

export type TTranslation = {
  id: number;
  description: string;
  word_id: string;
  language_id: string;
  created_at: string;
  updated_at: string;
};

export type TCustomForm = {
  id: number;
  name: string;
  is_active: string;
  created_at: string;
  updated_at: string;
};

export type TView = {
  id: number;
  description: string;
  route: string;
  custom_form_id: number;
  created_at: string;
  updated_at: string;
};

export type TValidationRule = {
  id: number;
  description: string;
  slug: string;
  input: string;
  message: string;
  created_at: string;
  updated_at: string;
};

export type TCustomer = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  email_verified_at: string;
  password: string;
  company_id: string;
  remember_token: string;
  created_at: string;
  updated_at: string;
  status: string;
  locked: string;
};

export type TToken = {
  email: string;
  token: string;
  created_at: string;
};

export type TCategory = {
  id: number;
  parent_id: number;
  lft: string;
  rgt: string;
  depth: string;
  name: string;
  description: string;
  image: string;
  long_description: string;
  active: string;
  locked: string;
  created_at: string;
  updated_at: string;
  slug: string;
  children?: TCategory[];
  category_media?: TModuleMediaRel | null;
};

export type TProduct = {
  id: number;
  title: string;
  category_id: string;
  short_description: string;
  description: string;
  status_id: string;
  created_by: string;
  modified_by: string;
  slug: string;
  availability: string;
  purchasability: string;
  product_brand_id: string;
  product_model_id: string;
  type_id: string;
  product_type_id: string;
  created_at: string;
  updated_at: string;
  product_identifiers?: TProductIdentifierRel[];
  product_medias?: TModuleMediaRel[];
  related_products?: TProduct[];
  default_image: TModuleMediaRel | null;
  '3d_file'?: TModuleMediaRel | null;
  bom_parts?: TProductPartsRel[];
};

export type TProductIdentifier = {
  id: string;
  name: string;
  short_name: string;
  default: string;
  created_at: string;
  updated_at: string;
};

export type TProductIdentifierRel = {
  id: number;
  product_identifier_id: number;
  product_id: number;
  value: string;
  parent: string;
  pi: TProductIdentifier;
};

export type TModuleMediaRel = {
  id: number;
  record_id: string;
  media_id: string;
  module_id: string;
  table_rel: string;
  created_at: string;
  updated_at: string;
  media?: TMedia;
  description;
  default: number;
  order: number;
};

export type TMedia = {
  id: number;
  name: string;
  url_id: number;
  path: string;
  extension: string;
  media_directory_id: number;
  restore_media_directory_id: number;
  created_at: string;
  updated_at: string;
};

export type TOrderProduct = {
  id: number;
  quantity: number;
  cmiPartNumber: string;
  description: string;
  oemPartNumber: string;
};

export type TProductPartsRel = {
  id: number;
  product_part_id: number;
  product_id: number;
  item_nu: number;
  qty: number;
  color: string;
  description: string;
  created_by: number;
  modified_by: number;
  created_at: string;
  updated_at: string;
  pp: TProduct;
};
