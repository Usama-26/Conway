import {TBreadCrumb} from '_types/ui';
import {ParsedUrlQuery} from 'querystring';
import categoryModel from 'server/models/categoryModel';
import productModel from 'server/models/productModel';
import {getSlugFromHierarchy} from 'server/utils/helper';

export const getCatalogProductProps = async (slug: string) => {
  const product = await productModel.findFirst({
    where: {slug: slug[1] as string},
    withJoins: [
      'pt',
      'product_identifiers',
      'product_medias',
      'related_products',
      '3d_file',
      'bom_parts',
    ],
  });
  const category = await categoryModel.findFirst({
    where: {slug: slug[0] as string},
    withJoins: ['parent', 'children'],
  });
  const breadcrumb: TBreadCrumb[] = [
    {
      title: 'Product Catalog',
      url: '/catalog',
    },
  ];
  if (category?.parent) {
    breadcrumb.push({
      title: category.parent.name,
      url: '/catalog/' + category.parent.slug,
    });
  }

  breadcrumb.push({
    title: category.name,
    url: '/catalog/' + category.slug,
  });

  breadcrumb.push({
    title: product?.title || '',
    url: '/catalog/' + category.slug + product?.slug,
    active: true,
  });
  // await closeConn();
  return {
    product,
    breadcrumb,
  };
};

export const getCatalogSlugProps = async (query: ParsedUrlQuery) => {
  const {slug, sub_category} = query;

  const category = await categoryModel.findFirst({
    where: {slug: slug as string},
    withJoins: ['parent', 'children'],
  });
  const breadcrumb: TBreadCrumb[] = [
    {
      title: 'Product Catalog',
      url: '/catalog',
    },
  ];
  if (category?.parent) {
    breadcrumb.push({
      title: category.parent.name,
      url: '/catalog/' + category.parent.slug,
    });
  }

  breadcrumb.push({
    title: category?.name,
    url: '/catalog/' + category.slug,
    active: true,
  });
  console.log('sub_category', sub_category);
  const products = await productModel.find({
    withJoins: ['created', 'pt', 'product_identifiers', 'product_medias'],
    where: {
      category_slugs: sub_category
        ? Array.isArray(sub_category)
          ? sub_category
          : [sub_category]
        : getSlugFromHierarchy(category),
    },
  });

  const sidebarCategories = await categoryModel.getCategoriesHierarchy();
  // await closeConn();
  return {
    products,
    sidebarCategories,
    breadcrumb,
    category,
  };
};
