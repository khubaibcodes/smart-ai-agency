import { AGENCY } from "@/lib/constants";
import type { LegalSection } from "@/lib/types";

export default function LegalDocument({
  title,
  updated,
  sections,
}: {
  title: string;
  updated: string;
  sections: LegalSection[];
}) {
  return (
    <article className="container-site mx-auto max-w-3xl py-16 md:py-24">
      <header className="mb-10 text-center sm:text-left">
        <h1 className="text-3xl font-bold md:text-4xl">{title}</h1>
        <p className="mt-3 text-sm text-muted-foreground">Last updated: {updated}</p>
      </header>

      <div className="space-y-10">
        {sections.map((section) => (
          <section key={section.title}>
            <h2 className="mb-4 text-xl font-semibold">{section.title}</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.list ? (
                <ul className="list-disc space-y-2 pl-5">
                  {section.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-12 rounded-xl border border-border bg-card p-6">
        <h3 className="font-semibold">Contact</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Questions about this policy? Email{" "}
          <a href={`mailto:${AGENCY.email}`} className="text-brand-primary hover:underline">
            {AGENCY.email}
          </a>
          .
        </p>
      </div>
    </article>
  );
}
