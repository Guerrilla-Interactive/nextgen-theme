"use client";


import { Container, Section } from "@/features/unorganized-components/nextgen-core-ui";
import { CustomContactFormBlockComponent } from "../custom-contact-form-block";
import { ContactInfoAndFormBlock } from "@/sanity.types";
// Import stegaClean from your utilities (assumes this exists)


export default function ContactInfoAndFormBlockComponent(props: ContactInfoAndFormBlock) {
  const {
    contactHeading,
    contactDescription,
    contactEmail,
    contactPhone,
    contactAddress,
    customContactForm,
  } = props;


  return (
    <Section className="pt-24">
      <Container>
        <div className="flex flex-col md:flex-row gap-12">
          {/* Left: Contact Info */}
          <div className="md:w-1/2 space-y-4">
            <h2 className="text-3xl font-sans text-balance">{contactHeading}</h2>
            <p className="text-lg text-gray-600">{contactDescription}</p>
            <div className="space-y-2">
              <p>
                <strong>Email:</strong>{" "}
                <a
                  href={`mailto:${contactEmail}`}
                  className="text-primary hover:underline"
                >
                  {contactEmail}
                </a>
              </p>
              <p>
                <strong>Telefon:</strong>{" "}
                <a
                  href={`tel:${contactPhone}`}
                  className="text-primary hover:underline"
                >
                  {contactPhone}
                </a>
              </p>
              <p>
                <strong>Addresse:</strong> <span>{contactAddress}</span>
              </p>
            </div>
          </div>
          {/* Right: Contact Form */}
          <div className="md:w-1/2">
            <CustomContactFormBlockComponent {...props.customContactForm} mobileFullWidth={true} />
          </div>
        </div>
      </Container>
    </Section>

  );
}
