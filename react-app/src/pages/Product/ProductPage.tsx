import {
  useLoaderData,
  useActionData,
  useFetcher,
  type ActionFunctionArgs,
} from "react-router-dom";

let mockData = [
  { id: 1, name: "Product 1", inWishlist: false },
  { id: 2, name: "Product 2", inWishlist: true },
  { id: 3, name: "Product 3", inWishlist: false },
];

export async function ProductLoader() {
  return mockData;
}

export async function WishListAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const productId = formData.get("productId");

  if (typeof productId === "string") {
    const productIndex = mockData.findIndex(
      (product) => product.id === parseInt(productId),
    );
    if (productIndex !== -1) {
      mockData[productIndex].inWishlist = !mockData[productIndex].inWishlist;
    }
  }

  return { success: true };
}

export default function ProductPage() {
  const products = useLoaderData();

  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";

  return (
    <>
      <div>
        <h1>Product Page</h1>

        <fetcher.Form method="post">
          <ul>
            {products.map((product: any) => (
              <li key={product.id}>
                {product.name} -{" "}
                {product.inWishlist ? "In Wishlist" : "Not in Wishlist"}
                <input type="hidden" name="productId" value={product.id} />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="ml-2 border border-blue-500 bg-blue-500 text-white rounded px-2 py-1"
                >
                  {isSubmitting
                    ? "Updating..."
                    : product.inWishlist
                      ? "Remove from Wishlist"
                      : "Add to Wishlist"}
                </button>
              </li>
            ))}
          </ul>
        </fetcher.Form>
      </div>
    </>
  );
}
