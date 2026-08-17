import {
  useForm,
  Controller,
  type SubmitHandler,
  useController,
  type UseControllerProps,
} from "react-hook-form";
import { Input } from "@mui/material";
import Select from "react-select";
type ProductFormValues = {
  name: string;
  price: number;
  stock: number;
  category: { value: string; label: string } | null;
  supplierNote: string;
};

export default function ProductAdd() {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormValues>({
    defaultValues: {
      name: "",
      price: 0,
      stock: 0,
      category: null,
      supplierNote: "",
    },
  });

  const formSubmit: SubmitHandler<ProductFormValues> = async (data) => {
    console.log("Form Data:", data);
    reset();
  };

  function InputTextArea(props: UseControllerProps<ProductFormValues>) {
    const { field, fieldState } = useController(props);
    return (
      <div>
        <textarea
          {...field}
          value={(field.value as string) || ""}
          placeholder="Enter supplier note"
          className="border border-gray-500 rounded-md p-2 w-full"
        />
        {fieldState.error && (
          <span className="text-red-500">{fieldState.error.message}</span>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Product Add Page</h1>

      <form onSubmit={handleSubmit(formSubmit)}>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Product Name:
          </label>
          <input
            type="text"
            {...register("name", {
              required: "Product name is required",
              minLength: {
                value: 3,
                message: "Product name must be at least 3 characters long",
              },
            })}
            placeholder="Enter product name"
            className="border border-gray-500 rounded-md p-2 w-full"
          />
          <div className="text-red-500 text-sm mt-1 mb-2">
            {errors.name ? (
              <span className="text-red-500">{errors.name.message}</span>
            ) : (
              <span>&nbsp;</span>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Product price
          </label>
          <input
            type="number"
            {...register("price", {
              required: "Product price is required",
              min: {
                value: 0,
                message: "Product price must be a positive number",
              },
            })}
            placeholder="Enter product price"
            className="border border-gray-500 rounded-md p-2 w-full"
          />
          <div className="text-red-500 text-sm mt-1 mb-2">
            {errors.price ? (
              <span className="text-red-500">{errors.price.message}</span>
            ) : (
              <span>&nbsp;</span>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Product Stock:
            <Controller
              name="stock"
              control={control}
              rules={{
                required: "Product stock is required",
                min: {
                  value: 0,
                  message: "Product stock must be a positive number",
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  className="border border-gray-500 rounded-md p-2 w-full"
                  placeholder="Enter product stock"
                />
              )}
            />
            <div className="text-red-500 text-sm mt-1 mb-2">
              {errors.stock ? (
                <span className="text-red-500">{errors.stock.message}</span>
              ) : (
                <span>&nbsp;</span>
              )}
            </div>
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            {" "}
            Category:{" "}
          </label>
          <Controller
            name="category"
            control={control}
            rules={{ required: "Category is required" }}
            render={({ field }) => (
              <Select
                {...field}
                options={[
                  { value: "electronics", label: "Electronics" },
                  { value: "clothing", label: "Clothing" },
                  { value: "books", label: "Books" },
                ]}
                className="border border-gray-500 rounded-md p-2 w-full"
              />
            )}
          />
          <div className="text-red-500 text-sm mt-1 mb-2">
            {errors.category ? (
              <span className="text-red-500">{errors.category.message}</span>
            ) : (
              <span>&nbsp;</span>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Supplier Note:
          </label>
          <InputTextArea
            name="supplierNote"
            control={control}
            rules={{
              required: "Supplier note is required",
              minLength: {
                value: 10,
                message: "Supplier note must be at least 10 characters long",
              },
            }}
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-4 bg-green-400 text-black font-bold py-2 px-4 rounded hover:bg-green-400 cursor-pointer hover: bg-green-500 transition duration-300"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
