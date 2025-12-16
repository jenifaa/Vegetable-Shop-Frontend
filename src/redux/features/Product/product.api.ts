import { baseApi } from "@/redux/baseApi";
import type { IResponse } from "@/types";
import type { IProduct } from "@/types/product.type";

type UpdateProductArgs = {
  id: number;
  data: {
    name: string;
    category: string;
    price: string;
    unit: string;
    stock: string;
    isAvailable: boolean;
    description?: string;
    discountPrice?: string;
    image?: string;
  };
};

export type CreateProduct = Omit<IProduct, "id">;
export type UpdateProduct = Partial<CreateProduct> & { id: number };

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addProduct: builder.mutation({
      query: (productData) => ({
        url: "/product/create",
        method: "POST",
        data: productData,
      }),
      invalidatesTags: ["PRODUCT"],
    }),
    AddProductType: builder.mutation({
      query: (productTypeName) => ({
        url: "/product/createProductType",
        method: "POST",
        data: productTypeName,
      }),
      invalidatesTags: ["PRODUCT"],
    }),
    removeProductType: builder.mutation({
      query: (productTypeId) => ({
        url: `/product/productType/${productTypeId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["PRODUCT"],
    }),
    getProductType: builder.query({
      query: (params) => ({
        url: "/product/productType",
        method: "GET",
        params,
      }),
      providesTags: ["PRODUCT"],
      transformResponse: (response) => response.data,
    }),
    getAllProducts: builder.query<IProduct[], unknown>({
      query: (params) => ({
        url: "/product/all-products",
        method: "GET",
        params: params,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "PRODUCT" as const, id })),
              { type: "PRODUCT", id: "LIST" },
            ]
          : [{ type: "PRODUCT", id: "LIST" }],
      transformResponse: (response: IResponse<IProduct[]>) => response.data,
    }),

    deleteProduct: builder.mutation<IResponse<null>, string>({
      query: (id) => ({
        url: `/product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "PRODUCT", id: "LIST" }],
    }),

    getProduct: builder.query<IProduct, string>({
      query: (id) => ({
        url: `/product/${id}`,
        method: "GET",
      }),
      providesTags: ["PRODUCT"],
    }),

    updateProduct: builder.mutation<IProduct, UpdateProductArgs>({
      query: ({ id, data }) => ({
        url: `/product/${id}`,
        method: "PATCH",
        data: data,
      }),
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductTypeQuery,
  useAddProductMutation,
  useAddProductTypeMutation,
  useRemoveProductTypeMutation,
  useDeleteProductMutation, // Add this export
  useGetProductQuery, // Optional
  useUpdateProductMutation, // Optional
} = productApi;
