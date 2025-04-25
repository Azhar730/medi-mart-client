import { baseApi } from "@/redux/api/baseApi";

const bicycleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllMedicine: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: { name: string; value: string }) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: "/medicines",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["medicines"],
    }),
    getSingleMedicine: builder.query({
      query: (id) => ({
        url: `/medicines/${id}`,
        method: "GET",
      }),
      providesTags: ["medicines"],
    }),
    deleteMedicine: builder.mutation({
      query: (id) => ({
        url: `/medicines/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["medicines"],
    }),
    addMedicine: builder.mutation({
      query: (formData) => ({
        url: "/medicines/create-medicine",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["medicines"],
    }),
    updateMedicine: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/medicines/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["medicines"],
    }),
  }),
});
export const {
  useGetAllMedicineQuery,
  useAddMedicineMutation,
  useGetSingleMedicineQuery,
  useDeleteMedicineMutation,
  useUpdateMedicineMutation,
} = bicycleApi;
