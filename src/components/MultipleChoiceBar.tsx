import React, { useEffect } from 'react';
import { soundFX } from '../services/soundEffects';

interface MultipleChoiceBarProps {
  choices: string[];
  targetTitle: string;
  onSelectChoice: (choice: string) => void;
  disabled: boolean;
  selectedChoice?: string;
  eliminatedChoices?: string[];
}

export const MultipleChoiceBar: React.FC<MultipleChoiceBarProps> = ({
  choices,
  onSelectChoice,
  disabled,
  selectedChoice,
  eliminatedChoices = []
}) => {
  const letters = ['A', 'B', 'C', 'D'];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (disabled) return;
      // Support 1-4 number keys
      const keyNum = parseInt(e.key, 10);
      if (keyNum >= 1 && keyNum <= choices.length) {
        const choice = choices[keyNum - 1];
        if (!eliminatedChoices.includes(choice)) {
          soundFX.playClick();
          onSelectChoice(choice);
        }
        return;
      }
      // Also support A, B, C, D keyboard keys!
      const letterIndex = ['a', 'b', 'c', 'd'].indexOf(e.key.toLowerCase());
      if (letterIndex >= 0 && letterIndex < choices.length) {
        const choice = choices[letterIndex];
        if (!eliminatedChoices.includes(choice)) {
          soundFX.playClick();
          onSelectChoice(choice);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [choices, disabled, onSelectChoice, eliminatedChoices]);

  const handleClick = (choice: string) => {
    if (disabled || eliminatedChoices.includes(choice)) return;
    soundFX.playClick();
    onSelectChoice(choice);
  };

  return (
    <div className="multiple-choice-container">
      <div className="choice-grid">
        {choices.map((choice, index) => {
          const isSelected = selectedChoice === choice;
          const isEliminated = eliminatedChoices.includes(choice);

          return (
            <button
              key={index}
              onClick={() => handleClick(choice)}
              disabled={disabled || isEliminated}
              className={`choice-button ${isSelected ? 'is-selected' : ''} ${isEliminated ? 'is-eliminated' : ''}`}
              title={isEliminated ? 'ตัวเลือกนี้ถูกตัดออกแล้วด้วยตัวช่วย 50:50' : choice}
            >
              <div className="choice-badges-group">
                <span className="choice-letter-badge">{letters[index]}</span>
                <span className="choice-key-badge">[{index + 1}]</span>
              </div>
              <span className="choice-text">
                {isEliminated ? <s>{choice}</s> : choice}
              </span>
            </button>
          );
        })}
      </div>
      <div className="choice-keyboard-hint">
        <span>💡 ทริค: แตะเลือกคำตอบ หรือกดปุ่ม <strong>[1] - [4]</strong> หรือ <strong>[A] - [D]</strong> บนคีย์บอร์ดได้ทันที</span>
      </div>
    </div>
  );
};
