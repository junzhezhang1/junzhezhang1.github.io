import { Reveal } from "@/components/reveal";

type PageIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
  aside?: string;
};

export function PageIntro({ eyebrow, title, description, aside }: PageIntroProps) {
  return (
    <section className="page-intro content-shell">
      <Reveal className="page-intro-heading">
        <p>{eyebrow}</p>
        <h1>{title}</h1>
      </Reveal>
      <Reveal className="page-intro-copy" delay={0.1}>
        <p>{description}</p>
        {aside ? <span>{aside}</span> : null}
      </Reveal>
    </section>
  );
}
