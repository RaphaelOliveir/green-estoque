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

export interface PaginatedResponse<T> {
  data: T[];
  total?: number;
  page?: number;
  limit?: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface LoginResponse {
  access_token: string;
  user: User;
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'https://green-estoque-api.vercel.app/api/v1',
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
    getProducts: builder.query<Product[] | PaginatedResponse<Product>, { search?: string; vendor?: string; type?: string; page?: number; limit?: number }>({
      query: (params) => ({
        url: '/products',
        params,
      }),
      providesTags: ['Products'],
    }),
    getProductById: builder.query<Product, string>({
      query: (id) => `/products/${id}`,
      providesTags: (result, error, id) => [{ type: 'Products', id }],
    }),
    createProduct: builder.mutation<Product, CreateProductDto>({
      query: (body) => ({
        url: '/products',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Products', 'Movements', 'Dashboard'],
    }),
    updateProduct: builder.mutation<Product, { id: string; data: UpdateProductDto }>({
      query: ({ id, data }) => ({
        url: `/products/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Products', id }, 'Products', 'Movements', 'Dashboard'],
    }),
    deleteProduct: builder.mutation<unknown, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Products', 'Movements', 'Dashboard'],
    }),

    // --- Movements / Inventory Units ---
    getInventoryUnits: builder.query<InventoryUnit[] | PaginatedResponse<InventoryUnit>, { productId?: string; status?: string; limit?: number; page?: number }>({
      query: (params) => ({
        url: '/inventory/units',
        params,
      }),
      providesTags: ['Movements'],
    }),
    getInventoryUnitById: builder.query<InventoryUnit, string>({
      query: (id) => `/inventory/items/${id}`,
      providesTags: (result, error, id) => [{ type: 'Movements', id }],
    }),
    updateInventoryUnitStatus: builder.mutation<InventoryUnit, { id: string; data: UpdateItemStatusDto }>({
      query: ({ id, data }) => ({
        url: `/inventory/items/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Movements', id }, 'Movements', 'Products', 'Dashboard'],
    }),

    // --- Dashboard / Reports ---
    getStockReport: builder.query<unknown, void>({
      query: () => '/reports/stock',
      providesTags: ['Dashboard'],
    }),
    getOverview: builder.query<{ inStock?: number; installed?: number }, void>({
      query: () => '/reports/overview',
      providesTags: ['Dashboard'],
    }),
    getBestSelling: builder.query<{ productId?: string; count?: number; product?: { name?: string; vendor?: string; cost?: number } }, void>({
      query: () => '/reports/best-selling',
      providesTags: ['Dashboard'],
    }),
    getTimeline: builder.query<Array<{ periodLabel?: string; inStock?: number; installed?: number }>, { period: 'weekly' | 'monthly' | 'yearly'; startDate?: string; endDate?: string }>({
      query: (params) => ({
        url: '/reports/timeline',
        params,
      }),
      providesTags: ['Dashboard'],
    }),
    getStockByType: builder.query<{ solarPanel?: number; inverter?: number; structure?: number }, void>({
      query: () => '/reports/stock-by-type',
      providesTags: ['Dashboard'],
    }),
    // --- Auth ---
    login: builder.mutation<LoginResponse, components['schemas']['LoginDto']>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    registerUser: builder.mutation<unknown, components['schemas']['CreateUserDto'] & { role?: string }>({
      query: (userData) => ({
        url: '/users',
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
