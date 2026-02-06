import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { getInfoPage, infoPages } from "@/lib/data/pages";

interface InfoPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return infoPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: InfoPageProps): Promise<Metadata> {
  const page = getInfoPage((await params).slug);
  return page ? { title: page.title, description: page.intro } : {};
}

export default async function InfoPage({ params }: InfoPageProps) {
  const page = getInfoPage((await params).slug);
  if (!page) notFound();

  return (
    <div className="wrap info-page">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: page.title }]} />
      <div className="col-hero">
        <div>
          <div className="eyebrow">{page.eyebrow}</div>
          <h1 className="h-display">{page.title}</h1>
        </div>
        <p>{page.intro}</p>
      </div>
      <div className="info-sections">
        {page.sections.map((section) => (
          <section key={section.heading}>
            <h2>{section.heading}</h2>
            <p>{section.body}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
