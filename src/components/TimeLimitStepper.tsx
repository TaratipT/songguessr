import React from 'react';
import { soundFX } from '../services/soundEffects';

export const TIME_LIMIT_OPTIONS = [20, 25, 30, 0];
export const TIME_LIMIT_LABELS = ['20s', '25s', '30s', '∞ ไม่จำกัด'];

export const MULTIPLAYER_TIME_LIMIT_OPTIONS = [20, 25, 30];
export const MULTIPLAYER_TIME_LIMIT_LABELS = ['20s', '25s', '30s'];

interface TimeLimitStepperProps {
  value: number; // 20, 25, 30, 0
  onChange: (newValue: number) => void;
  mini?: boolean;
  allowUnlimited?: boolean;
}

export const TimeLimitStepper: React.FC<TimeLimitStepperProps> = ({
  value,
  onChange,
  mini = false,
  allowUnlimited = true
}) => {
  const options = allowUnlimited ? TIME_LIMIT_OPTIONS : MULTIPLAYER_TIME_LIMIT_OPTIONS;
  const labels = allowUnlimited ? TIME_LIMIT_LABELS : MULTIPLAYER_TIME_LIMIT_LABELS;

  // If allowUnlimited is false and value is 0 (or not in options), fallback to 30
  const normalizedValue = (!allowUnlimited && (value === 0 || !options.includes(value))) ? 30 : value;

  const currentIndex = options.indexOf(normalizedValue) !== -1
    ? options.indexOf(normalizedValue)
    : (allowUnlimited ? 0 : options.indexOf(30));

  const progressPercent = options.length > 1 ? (currentIndex / (options.length - 1)) * 100 : 0;

  return (
    <div className={`time-stepper-control ${mini ? 'mini' : ''}`}>
      {/* Interactive Step Track */}
      <div className="time-stepper-track-wrap">
        <div className="time-stepper-track">
          {/* Active progress fill */}
          <div
            className="time-stepper-fill"
            style={{ width: `${progressPercent}%` }}
          />

          {/* Clickable Step Nodes directly on the line */}
          {options.map((opt, idx) => {
            const nodePercent = options.length > 1 ? (idx / (options.length - 1)) * 100 : 0;
            const isActive = idx === currentIndex;
            const isPassed = idx <= currentIndex;

            return (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  soundFX.playClick();
                  onChange(opt);
                }}
                className={`time-stepper-dot ${isActive ? 'active' : isPassed ? 'passed' : ''}`}
                style={{ left: `${nodePercent}%` }}
                title={labels[idx]}
                aria-label={labels[idx]}
              >
                <span className="dot-inner" />
              </button>
            );
          })}

          {/* Glowing Thumb Handle exactly on active node */}
          <div
            className="time-stepper-thumb"
            style={{ left: `${progressPercent}%` }}
          />
        </div>

        {/* Step Labels centered exactly below each node */}
        <div className="time-stepper-labels">
          {labels.map((label, idx) => {
            const labelPercent = options.length > 1 ? (idx / (options.length - 1)) * 100 : 0;
            const isActive = idx === currentIndex;

            return (
              <button
                key={label}
                type="button"
                onClick={() => {
                  soundFX.playClick();
                  onChange(options[idx]);
                }}
                className={`time-stepper-label-btn ${isActive ? 'active' : ''}`}
                style={{
                  left: `${labelPercent}%`,
                  transform: 'translateX(-50%)'
                }}
              >
                <span>{label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
