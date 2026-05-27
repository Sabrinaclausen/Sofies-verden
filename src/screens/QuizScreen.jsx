import React, { useState, useEffect } from 'react';
import { useApp } from '../AppContext';
import { MountainScene, TopBar } from '../components/shared';
import { QUIZ_QUESTIONS } from '../data';

const LABELS = ['A', 'B', 'C', 'D'];
const TOTAL_STEPS = QUIZ_QUESTIONS.length;

function getOptionStyle(idx, selected, revealed, correct) {
  if (!revealed) {
    if (idx === selected) return { background: '#977A25', borderColor: '#F5C842' };
    return { background: 'rgba(45,42,110,0.85)', borderColor: 'transparent' };
  }
  if (idx === correct) return { background: '#1A4A2E', borderColor: '#22C55E' };
  if (idx === selected) return { background: '#671A1A', borderColor: '#B22A2A' };
  return { background: 'rgba(45,42,110,0.85)', borderColor: 'transparent' };
}

function getLabelBg(idx, selected, revealed, correct) {
  if (revealed) {
    if (idx === correct) return '#22C55E';
    if (idx === selected) return '#B22A2A';
  }
  if (idx === selected) return '#F5C842';
  return '#17143A'; // mørk cirkel baggrund
}

function getLabelColor(idx, selected, revealed, correct) {
  if (revealed && idx === correct) return '#0A2A18';
  if (revealed && idx === selected) return '1A1600';
  if (!revealed && idx === selected) return '#1A1600';
  return '#AA85FF'; // lys lilla tekst
}

export default function QuizScreen() {
  const { state, navigate, updateState } = useApp();
  const qi = state.currentStep;
  const q = QUIZ_QUESTIONS[qi];

  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    setSelected(null);
    setRevealed(false);
  }, [qi]);

  if (!q) {
    navigate('completion');
    return null;
  }

  const pct = Math.round((qi / TOTAL_STEPS) * 100);
  const svarActive = selected !== null && !revealed;

  const handleSvar = () => {
    if (selected === null || revealed) return;
    const isCorrect = selected === q.correct;
    updateState({
      nodeResults: { ...state.nodeResults, [qi]: isCorrect },
      sessionCorrectAnswers: state.sessionCorrectAnswers + (isCorrect ? 1 : 0),
      points: state.points + (isCorrect ? 40 : 0),
    });
    setRevealed(true);
  };

  const handleNaeste = () => {
    if (state.mapQuizMode) {
      updateState({ mapQuizMode: false });
      navigate('map');
      return;
    }
    const nextStep = qi + 1;
    if (nextStep >= TOTAL_STEPS) {
      updateState({ quizCompleted: true, badges: 1 });
      navigate('completion');
    } else {
      updateState({ currentStep: nextStep });
      navigate('lesson');
    }
  };

  return (
    <div className="w-full h-full relative overflow-hidden">

      {/* Full-screen background */}
      <MountainScene fullscreen />
      <div className="absolute inset-0 z-[1]" style={{ background: 'rgba(8,6,26,0.55)' }} />

      {/* UI layer */}
      <div className="absolute inset-0 z-10 flex flex-col">
        <TopBar />

        {/* Progress */}
        <div className="flex items-center gap-2 px-4 pb-2 flex-shrink-0">
          <span className="text-white/70 text-xs font-bold whitespace-nowrap min-w-[44px]">
            {qi + 1} af {TOTAL_STEPS}
          </span>
          <div className="flex-1 h-1.5 bg-white/10 rounded-full">
            <div className="h-full bg-[#6C63FF] rounded-full transition-all duration-500"
                 style={{ width: `${Math.max(pct, 4)}%` }} />
          </div>
          <span className="text-white/70 text-xs font-bold whitespace-nowrap min-w-[38px] text-right">
            {pct}%
          </span>
        </div>

        {/* Spacer — pushes content to bottom */}
        <div className="flex-1" />

        {/* Question card + answers — anchored to bottom */}
        <div className="px-4 pb-2 flex flex-col gap-2">
          <div
            className="rounded-2xl px-8 py-9 text-white text-base font-opensans leading-snug flex-shrink-0"
            style={{ background: 'rgba(58,53,128,0.92)' }}
          >
            {q.question}
          </div>

          {q.options.map((opt, idx) => {
            const { background, borderColor } = getOptionStyle(idx, selected, revealed, q.correct);
            return (
              <button
                key={idx}
                onClick={() => { if (!revealed) setSelected(idx); }}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: 12,
                  borderRadius: 16, padding: '12px 16px', textAlign: 'left',
                  border: `2px solid ${borderColor}`,
                  background,
                  transition: 'background 0.2s, border-color 0.2s',
                }}
              >
                <div style={{
                  width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 20, fontFamily: 'Fredoka',
                  background: getLabelBg(idx, selected, revealed, q.correct),
                  color: getLabelColor(idx, selected, revealed, q.correct),
                  transition: 'background 0.2s',
                }}>
                  {LABELS[idx]}
                </div>
                <span style={{ color: 'white', fontSize: 16, fontFamily: 'Open Sans',  lineHeight: 1.35 }}>
                  {opt}
                </span>
              </button>
            );
          })}
        </div>

        {/* Svar / Næste button */}
        <div className="px-5 pt-2 pb-5 flex-shrink-0">
          {!revealed ? (
            <button
              onClick={handleSvar}
              style={{
                width: '100%', padding: '16px 0', borderRadius: 9999,
                fontSize: 16, fontWeight: 900, fontFamily: 'Open Sans, sans-serif',
                background: svarActive ? '#F5C842' : '#BDBDBD',
                color: svarActive ? '#1A1600' : '#888',
                cursor: svarActive ? 'pointer' : 'default',
                boxShadow: svarActive ? '0 4px 14px rgba(245,200,66,0.35)' : 'none',
                transition: 'background 0.2s',
              }}
            >
              Svar
            </button>
          ) : (
            <button
              onClick={handleNaeste}
              style={{
                width: '100%', padding: '16px 0', borderRadius: 9999,
                fontSize: 19, fontFamily: 'Open Sans, sans-serif', 
                background: '#F5C842', color: '#1A1600',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(245,200,66,0.4)',
              }}
            >
              Næste →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
