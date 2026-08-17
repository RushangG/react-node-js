import { useParams } from "react-router-dom";

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="max-w-2xl mx-auto p-4">
      <img
        src={`https://ix-marketing.imgix.net/bg-remove_after.png?auto=format,compress&w=1946`}
        alt={`Product ${id || "1"}`}
        className="w-full h-64 object-cover rounded-lg mb-4"
        style={{ viewTransitionName: "hero-product-image" }}
      />

      <div>
        <h1 className="text-3xl font-black">Detailed Product View</h1>
        <p className="mt-4 text-gray-600">
          This image smoothly morphed into place!
        </p>
      </div>
    </div>
  );
}
