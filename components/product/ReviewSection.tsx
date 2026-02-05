import type { CSSProperties } from "react";
import { Stars } from "@/components/ui/Stars";
import type { Product } from "@/lib/commerce/types";

export function ReviewSection({ product }: { product: Product }) {
  const { reviews, featuredReviews = [] } = product;
  const distribution = reviews.distribution;

  return (
    <section className="sec sec-flush" id="reviews">
      <div className="wrap rv-summary">
        <div>
          <div className="eyebrow">Reviews</div>
          <div className="rv-score">{reviews.average}</div>
          <Stars rating={reviews.average} />
          <p className="rv-basis">Based on {reviews.count} verified reviews</p>
          {distribution ? (
            <div className="bars">
              {distribution.map((count, index) => (
                <div key={index}>
                  {5 - index} ★
                  <i
                    style={
                      { "--w": `${Math.round((count / reviews.count) * 100)}%` } as CSSProperties
                    }
                  />
                  {count}
                </div>
              ))}
            </div>
          ) : null}
          {reviews.fit ? (
            <div className="fitnote">
              {reviews.fit.map((note) => (
                <div key={note.label}>
                  <b>{note.label}</b>
                  {note.value}
                </div>
              ))}
            </div>
          ) : null}
        </div>
        {featuredReviews.length > 0 ? (
          <div className="reviews r2">
            {featuredReviews.map((review) => (
              <div className="rv" key={review.author}>
                <Stars rating={review.rating} />
                <q>{review.body}</q>
                <div className="who">
                  <b>{review.author}</b>
                  <span>{review.variant} · Verified buyer</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="rv-empty">
            Written reviews for the {product.title} are being collected from verified buyers.
          </p>
        )}
      </div>
    </section>
  );
}
