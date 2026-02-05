import Image from "next/image";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { journal } from "@/lib/data/home";

export function JournalGrid() {
  return (
    <section className="sec sec-flush" id="journal">
      <div className="wrap">
        <SectionHeader eyebrow="Journal" title="Notes from the workbench" />
        <div className="journal">
          {journal.map((story) => (
            <article className="jc" key={story.slug}>
              <div className="jimg">
                <Image
                  src={story.image.url}
                  alt={story.image.altText}
                  width={story.image.width}
                  height={story.image.height}
                  sizes="(max-width: 860px) 50vw, 33vw"
                  style={
                    story.image.objectPosition
                      ? { objectPosition: story.image.objectPosition }
                      : undefined
                  }
                />
              </div>
              <div className="eyebrow">
                {story.category} · {story.readTime}
              </div>
              <h3>{story.title}</h3>
              <p>{story.excerpt}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
