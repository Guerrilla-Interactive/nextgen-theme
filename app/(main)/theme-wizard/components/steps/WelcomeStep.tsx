'use client';

import React, { useEffect } from 'react';
import { Check, BookOpen, Image as ImageIcon, Type, Palette } from 'lucide-react';

import { useWizardNavigation } from '../../context/useWizardNavigation';
import { useWizardState } from '../../context/WizardStateContext';

/**
 * WelcomeStep — Tailwind-only animation variant (left-aligned)
 *
 * ▸ Icons + text now left-aligned inside each tile
 * ▸ Refined descriptions for clearer guidance
 * ▸ Still pure Tailwind for animation (no external libs)
 */
export default function WelcomeStep() {
  const { state, dispatch } = useWizardState();
  const { next } = useWizardNavigation();

  /* ------------------------------------------------------------------
   * Initialise path B on mount
   * ----------------------------------------------------------------*/
  useEffect(() => {
    if (!state.path) dispatch({ type: 'SET_PATH', payload: 'B' });
  }, [dispatch, state.path]);

  /* ------------------------------------------------------------------
   * Toggle helpers (write directly to context)
   * ----------------------------------------------------------------*/
  const handleBrandGuideToggle = () =>
    dispatch({ type: 'SET_HAS_BRAND_GUIDE', payload: !state.hasBrandGuide });

  const handleLogoToggle = () =>
    dispatch({ type: 'SET_HAS_LOGO', payload: !state.hasLogo });

  const handleColoursToggle = () =>
    dispatch({ type: 'SET_HAS_COLOURS', payload: !state.hasColours });

  const handleFontsToggle = () =>
    dispatch({ type: 'SET_HAS_FONTS', payload: !state.hasFonts });

  const assets = [
    {
      id: 'brandGuide',
      label: 'Brandmanual',
      description:
        'Share a PDF, website link, or even plain text of your brand profile and we’ll craft a tailored theme.',
      icon: BookOpen,
      checked: state.hasBrandGuide,
      handler: handleBrandGuideToggle,
    },
    {
      id: 'logo',
      label: 'Logo',
      description:
        'Upload your logo—its colours and shapes will guide the theme we generate.',
      icon: ImageIcon,
      checked: state.hasLogo,
      handler: handleLogoToggle,
    },
    {
      id: 'fonts',
      label: 'Fonts',
      description:
        'Already chosen typefaces? Provide them so we can focus on fine-tuning instead of font hunting.',
      icon: Type,
      checked: state.hasFonts,
      handler: handleFontsToggle,
    },
    {
      id: 'colours',
      label: 'Colours',
      description:
        'Have a color palette ready? Add it here and we’ll skip the palette hunt.',
      icon: Palette,
      checked: state.hasColours,
      handler: handleColoursToggle,
    },
  ];

  return (
    <div className="max-w-2xl">
      {/* ------------------------------------------------------------ */}
      {/* Header                                                    */}
      {/* ------------------------------------------------------------ */}
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Theme Wizard</h1>
        <p className="text-gray-600 text-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </header>

      {/* ------------------------------------------------------------ */}
      {/* Prompt                                                     */}
      {/* ------------------------------------------------------------ */}
      <h2 className="text-xl font-medium text-gray-900 mb-8">
        What do you have ready already?
      </h2>

      {/* ------------------------------------------------------------ */}
      {/* Asset tiles                                                */}
      {/* ------------------------------------------------------------ */}
      <section className="grid grid-cols-2 gap-4 mb-12">
        {assets.map(({ id, label, description, icon: Icon, checked, handler }) => (
          <button
            key={id}
            onClick={handler}
            type="button"
            className={`relative flex flex-col items-start justify-start p-6 rounded-lg border transition-all duration-200 shadow-sm focus:outline-none
              ${checked ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white hover:border-gray-400'}`}
          >
            {/* Check badge scales in with Tailwind animation */}
            <span
              className={`absolute top-2 right-2 bg-blue-500 text-white rounded-full p-[2px] transform transition-all duration-200 ease-out
                ${checked ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
            >
              <Check className="w-4 h-4" />
            </span>

            {/* Icon representing the asset */}
            <Icon className="w-8 h-8 text-gray-700 mb-3" />
            <span className="text-gray-900 font-medium text-lg mb-1">{label}</span>
            <p className="text-gray-600 text-start text-sm leading-snug">{description}</p>
          </button>
        ))}
      </section>

      {/* ------------------------------------------------------------ */}
      {/* Continue — the wizard navigation handles routing           */}
      {/* ------------------------------------------------------------ */}
      <div className="text-right">
        <button
          type="button"
          onClick={next}
          className="inline-flex items-center px-6 py-3 rounded-lg bg-blue-600 text-white font-medium shadow-md hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
