import { useViewTransitionState, Link } from "react-router-dom";

type ProductCardProps1 = {
  id?: string;
  image?: string;
  title?: string;
};

export default function ProductCard({ id, image, title }: ProductCardProps1) {
  id = id || "1";
  image =
    "https://ix-marketing.imgix.net/bg-remove_after.png?auto=format,compress&w=1946";
  const targetPath = `/ProductDetails/${id}`;

  const isPending = useViewTransitionState(targetPath);

  return (
    <div>
      <Link
        to={targetPath}
        viewTransition
        className="border p-4 block rounded-lg"
      >
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover rounded-lg mb-4"
          style={{
            viewTransitionName: isPending ? "hero-product-image" : "none",
          }}
        />
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
      </Link>
    </div>
  );
}
