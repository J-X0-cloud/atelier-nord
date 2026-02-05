import { SectionHeader } from "@/components/ui/SectionHeader";
import { Stars } from "@/components/ui/Stars";
import { storeReviews } from "@/lib/data/home";

export function StoreReviews() {
  return (
    <section className="sec">
      <div className="wrap">
        <SectionHeader eyebrow={storeReviews.eyebrow} title="Carried, then reviewed." />
        <div className="reviews">
          {storeReviews.items.map((review) => (
            <div className="rv" key={review.author}>
              <Stars rating={5} />
              <q>{review.quote}</q>
              <div className="who">
                <b>{review.author}</b>
                <span>{review.product}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
