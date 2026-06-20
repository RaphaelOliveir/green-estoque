import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { components } from './schema';

// Export types from the OpenAPI schema for convenience
export type Product = components['schemas']['CreateProductDto'] & { id: string, createdAt?: string, updatedAt?: string };
export type CreateProductDto = components['schemas']['CreateProductDto'];
export type UpdateProductDto = components['schemas']['UpdateProductDto'];

export type InventoryUnit = {
  id: string;
  productId: string;
  status: 'EM_ESTOQUE' | 'INSTALADO';
  observations?: string;
  name?: string;
  vendor?: string;
  customer?: string;
  purchaseDate?: string;
  entryStockDate?: string;
  cost?: number;
  type?: 'SOLAR_PANEL' | 'INVERTER' | 'STRUCTURE';
  description?: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type UpdateItemStatusDto = components['schemas']['UpdateItemStatusDto'];

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'https://green-estoque-api.vercel.app',
    prepareHeaders: (headers) => {
      // In a real app, you might get the token from state or localStorage
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Products', 'Movements', 'Dashboard'],
  endpoints: (builder) => ({
    // --- Products ---
    getProducts: builder.query<any, { search?: string; vendor?: string; type?: string; page?: number; limit?: number }>({
      query: (params) => ({
        url: '/api/v1/products',
        params,
      }),
      providesTags: ['Products'],
    }),
    getProductById: builder.query<any, string>({
      query: (id) => `/api/v1/products/${id}`,
      providesTags: (result, error, id) => [{ type: 'Products', id }],
    }),
    createProduct: builder.mutation<any, CreateProductDto>({
      query: (body) => ({
        url: '/api/v1/products',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Products', 'Movements', 'Dashboard'],
    }),
    updateProduct: builder.mutation<any, { id: string; data: UpdateProductDto }>({
      query: ({ id, data }) => ({
        url: `/api/v1/products/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Products', id }, 'Products', 'Movements', 'Dashboard'],
    }),
    deleteProduct: builder.mutation<any, string>({
      query: (id) => ({
        url: `/api/v1/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Products', 'Movements', 'Dashboard'],
    }),

    // --- Movements / Inventory Units ---
    getInventoryUnits: builder.query<any, { productId?: string; status?: string; limit?: number; page?: number }>({
      query: (params) => ({
        url: '/api/v1/inventory/units',
        params,
      }),
      providesTags: ['Movements'],
    }),
    getInventoryUnitById: builder.query<any, string>({
      query: (id) => `/api/v1/inventory/items/${id}`,
      providesTags: (result, error, id) => [{ type: 'Movements', id }],
    }),
    updateInventoryUnitStatus: builder.mutation<any, { id: string; data: UpdateItemStatusDto }>({
      query: ({ id, data }) => ({
        url: `/api/v1/inventory/items/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Movements', id }, 'Movements', 'Products', 'Dashboard'],
    }),

    // --- Dashboard / Reports ---
    getStockReport: builder.query<any, void>({
      query: () => '/api/v1/reports/stock',
      providesTags: ['Dashboard'],
    }),
    getOverview: builder.query<any, void>({
      query: () => '/api/v1/reports/overview',
      providesTags: ['Dashboard'],
    }),
    getBestSelling: builder.query<any, void>({
      query: () => '/api/v1/reports/best-selling',
      providesTags: ['Dashboard'],
    }),
    getTimeline: builder.query<any, { period: 'weekly' | 'monthly' | 'yearly'; startDate?: string; endDate?: string }>({
      query: (params) => ({
        url: '/api/v1/reports/timeline',
        params,
      }),
      providesTags: ['Dashboard'],
    }),
    getStockByType: builder.query<any, void>({
      query: () => '/api/v1/reports/stock-by-type',
      providesTags: ['Dashboard'],
    }),
    // --- Auth ---
    login: builder.mutation<any, any>({
      query: (credentials) => ({
        url: '/api/v1/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    registerUser: builder.mutation<any, any>({
      query: (userData) => ({
        url: '/api/v1/users',
        method: 'POST',
        body: userData,
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetInventoryUnitsQuery,
  useGetInventoryUnitByIdQuery,
  useUpdateInventoryUnitStatusMutation,
  useGetStockReportQuery,
  useGetOverviewQuery,
  useGetBestSellingQuery,
  useGetTimelineQuery,
  useGetStockByTypeQuery,
  useLoginMutation,
  useRegisterUserMutation,
} = apiSlice;
