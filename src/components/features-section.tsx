import { featuresV1, featuresV2 } from "../content/site-content"
import { Container } from "./ui/container"
import { SectionHeading } from "./ui/section-heading"

interface FeaturesSectionProps {
  version: 1 | 2
}

export function FeaturesSection({ version }: FeaturesSectionProps) {
  const features = version === 1 ? featuresV1 : featuresV2
  const isV1 = version === 1

  return (
    <section className="border-t border-border px-6 py-20 min-[901px]:px-12 min-[901px]:py-28">
      <Container>
        <div className="mb-12">
          <SectionHeading
            label="Features"
            headline={
              <>
                Everything you need to sell out.
                <br />
                <span className="text-accent">Nothing you don&apos;t.</span>
              </>
            }
          />
        </div>

        <div className="grid grid-cols-1 gap-px border border-border bg-border min-[901px]:grid-cols-3">
          {features.map((feature) => (
            <article key={feature.title} className="bg-bg p-8 min-[901px]:px-8 min-[901px]:py-10">
              <div className="mb-7 flex h-11 w-11 items-center justify-center rounded-[10px] border border-border text-lg text-accent">
                {feature.icon}
              </div>
              <h3
                className={`font-bold uppercase tracking-tight text-fg ${
                  isV1
                    ? "mb-3 text-[1.4rem]"
                    : "mb-4 text-[2rem] leading-none"
                }`}
              >
                {feature.title}
              </h3>
              <p className="text-[0.95rem] leading-relaxed text-fg-subtle">
                {feature.body}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
