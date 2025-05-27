import React from 'react';
import WizardLayout from './components/WizardLayout';
import StepRenderer from './components/StepRenderer';
import ThemeManager from './components/ThemeManager';

export const metadata = {
  title: 'Theme Wizard',
  description: 'Create a custom theme from your brand assets',
};

export default function ThemeWizardPage() {
  return (
    <>
      <WizardLayout>
        <StepRenderer />
      </WizardLayout>
      <ThemeManager />
    </>
  );
} 