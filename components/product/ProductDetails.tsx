import type { Product } from "@/lib/commerce/types";

const SHIPPING_COPY =
  "Free standard shipping on US orders over $250 (2–4 business days). Express available at checkout. Returns are free within 30 days of delivery, in unused condition.";

/** Spec accordions under the buy box. Native <details>, so they work without JS. */
export function ProductDetails({ product }: { product: Product }) {
  return (
    <div className="acc">
      <details open>
        <summary>Details</summary>
        <div className="body">
          {product.description}
          <ul>
            {product.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </div>
      </details>
      <details>
        <summary>Dimensions &amp; fit</summary>
        <div className="body">
          <table>
            <tbody>
              {product.dimensions.map((row) => (
                <tr key={row.label}>
                  <td>{row.label}</td>
                  <td>{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
      <details>
        <summary>Materials &amp; care</summary>
        <div className="body">{product.care}</div>
      </details>
      <details>
        <summary>Shipping &amp; returns</summary>
        <div className="body">{SHIPPING_COPY}</div>
      </details>
    </div>
  );
}
