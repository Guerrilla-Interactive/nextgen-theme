import { Container, Section } from "@/features/unorganized-components/nextgen-core-ui";
import RepeatingSvgBanner from "./repeating-svg-banner";
interface HeadingAndParagraphCenteredProps {
  heading: string;
  paragraph: string;
}

export default async function HeadingAndParagraphCenteredBlockComponent(props:
Partial<HeadingAndParagraphCenteredProps>) {
  

  return (
    <>
      
      <Section className="py-20  pt-12">
        <Container className="text-center items-center gap-y-6 max-w-screen-md ">
          <h2 className=" font-semibold max-w-[550px] md:text-5xl text-balance text-4xl tracking-wider font-title text-center">{props.heading}</h2>
          <p className="text-lg text-center">{props.paragraph}</p>
        </Container>

      </Section>
    </>
  )
}


