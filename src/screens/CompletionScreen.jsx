import React from 'react';
import { useApp } from '../AppContext';
import { StarsWrapper, TopBar, C } from '../components/shared';
import { QUIZ_QUESTIONS } from '../data';

function getStars(correct) {
  if (correct >= 6) return 3;
  if (correct >= 3) return 2;
  return 1;
}

export default function CompletionScreen() {
  const { state, navigate } = useApp();
  const correct = state.sessionCorrectAnswers;
  const total = QUIZ_QUESTIONS.length;
  const xpEarned = correct * 40;
  const stars = getStars(correct);

  return (
    <StarsWrapper>
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />

        <div className="flex-1 flex flex-col items-center justify-around px-6 pt-2 pb-6">
          {/* Trophy */}
          <div className="w-[110px] h-[110px] rounded-full flex items-center justify-center text-5xl"
               style={{
                 background: 'linear-gradient(145deg, #F5C842, #E0A800)',
                 border: '3px solid rgba(255,255,255,0.2)',
                 boxShadow: '0 0 30px rgba(245,200,66,0.6)',
               }}>
            🏆
          </div>

          {/* Title */}
          <div className="text-center">
            <h1 className="text-white text-2xl font-black mb-1">Modul gennemført!</h1>
            <p className="text-brand-sub text-sm font-semibold">
              Du klarede {correct} af {total} spørgsmål rigtigt
            </p>
          </div>

          {/* Stars */}
          <div className="flex gap-2 text-4xl">
            {[1,2,3].map(s => (
              <span key={s} style={{ opacity: s <= stars ? 1 : 0.25 }}>⭐</span>
            ))}
          </div>

          {/* Stat cards */}
          <div className="flex gap-3 w-full">
            <div className="flex-1 bg-brand-navy rounded-2xl px-3 py-4 text-center border border-white/[0.08]">
              <p className="text-white text-4xl font-black">{xpEarned}</p>
              <p className="text-brand-sub text-sm font-semibold mt-1">XP optjent</p>
            </div>
            <div className="flex-1 bg-brand-navy rounded-2xl px-3 py-4 text-center border border-white/[0.08]">
              <p className="text-white text-4xl font-black">{correct}/{total}</p>
              <p className="text-brand-sub text-sm font-semibold mt-1">rigtige svar</p>
            </div>
          </div>

          {/* Badge card */}
          <div className="w-full bg-brand-navy rounded-2xl px-4 py-3 flex items-center gap-3 border border-white/[0.08]">
            <span className="text-4xl">🏔️</span>
            <div className="flex-1">
              <p className="text-brand-accent text-base font-extrabold">Hulelignelsen</p>
              <p className="text-brand-sub text-xs font-semibold">Nyt badge optjent!</p>
            </div>
            <div className="bg-[#7C3AED] rounded-full px-3 py-1 text-xs font-extrabold text-white">NY</div>
          </div>

          {/* Afslut */}
          <button
            onClick={() => navigate('hjem')}
            className="w-full py-[18px] rounded-full text-lg font-black text-brand-dark"
            style={{ background: C.accent, boxShadow: '0 4px 16px rgba(245,200,66,0.4)' }}
          >
            Afslut
          </button>
        </div>
      </div>
    </StarsWrapper>
  );
}
