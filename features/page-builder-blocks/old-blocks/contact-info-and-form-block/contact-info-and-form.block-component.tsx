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

  const adaptedFormProps = {
    formTitle: customContactForm?.formTitle,
    formDescription: customContactForm?.formDescription,
    submitButtonText: customContactForm?.submitButtonText,
    successMessage: customContactForm?.successMessage,
    formFields: (customContactForm?.formFields || [])
      .filter((f: any) => f && f.fieldType && f.fieldName && f.fieldLabel)
      .map((f: any) => ({
        fieldType: f.fieldType,
        fieldName: f.fieldName,
        fieldLabel: f.fieldLabel,
        placeholder: f.placeholder ?? undefined,
        isRequired: Boolean(f.isRequired),
        width: f.width,
        helpText: f.helpText ?? undefined,
        options: Array.isArray(f.options)
          ? f.options.map((o: any) => ({ label: o?.label ?? o?.value ?? "", value: o?.value ?? o?.label ?? "" }))
          : undefined,
        labelOnly: Boolean(f.labelOnly),
        preChecked: Boolean(f.preChecked),
        conditionalLogic: f?.conditionalLogic?.enabled
          ? {
              enabled: true,
              controllerFieldName: f.conditionalLogic?.controllerFieldName,
              action: f.conditionalLogic?.action,
              controllerValueChecked: f.conditionalLogic?.controllerValueChecked,
            }
          : undefined,
      })),
  } as const;


  return (
    <Section className="pt-24">
      <Container>
        <div className="flex flex-col md:flex-row gap-12">
          {/* Left: Contact Info */}
          <div className="md:w-1/2 space-y-4">
            <h2 className="text-3xl font-sans text-balance">{contactHeading}</h2>
            <p className="text-lg text-muted-foreground">{contactDescription}</p>
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
            <CustomContactFormBlockComponent {...(adaptedFormProps as any)} />
          </div>
        </div>
      </Container>
    </Section>

  );
}
