import React from 'react';

interface Suggestion {
  prompt: string;
  label: string;
}

const SUGGESTIONS: Suggestion[] = [
  { prompt: 'Simptomlarımı qiymətləndir',        label: '🩺 Simptom qiymətləndirmə' },
  { prompt: 'Dərman dozası haqqında məlumat ver', label: '💊 Dərman dozası'          },
  { prompt: 'Laborator nəticəmi izah et',         label: '🔬 Laborator izah'         },
  { prompt: 'Hansı həkimə müraciət etməliyəm?',   label: '🏥 Həkimə yönləndirmə'    },
];

interface SuggestionChipsProps {
  onSelect: (prompt: string) => void;
}

export default function SuggestionChips({ onSelect }: SuggestionChipsProps) {
  return (
    <div className="suggestions-area">
      {SUGGESTIONS.map(({ prompt, label }) => (
        <button
          key={prompt}
          className="suggestion-chip"
          type="button"
          onClick={() => onSelect(prompt)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
