import React from 'react';
import { useApp } from '../AppContext';
import { StarsWrapper, TopBar, BottomNav, C } from '../components/shared';

export default function BadgesScreen() {
  const { state } = useApp();

  return (
    <StarsWrapper>
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />

        <div className="scrollable flex-1 px-5 pt-1 pb-3">
          <h1 className="text-brand-accent text-4xl font-black mb-5">Badges</h1>

          {/* Stats */}
          <div className="flex gap-4 mb-6">
            <div className="flex-1 bg-brand-navy rounded-2xl px-3 py-4 text-center"
                 style={{ border: `2px solid ${C.accent}` }}>
              <p className="text-brand-sub text-xs font-bold mb-1">Badges</p>
              <p className="text-brand-accent text-4xl font-black">{state.badges}</p>
            </div>
            <div className="flex-1 bg-brand-navy rounded-2xl px-3 py-4 text-center"
                 style={{ border: `2px solid ${C.accent}` }}>
              <p className="text-brand-sub text-xs font-bold mb-1">Point</p>
              <p className="text-brand-accent text-4xl font-black">{state.points}</p>
            </div>
          </div>

          {/* Badge card — only show after quiz completed */}
          {state.quizCompleted ? (
            <div className="bg-brand-navy rounded-2xl px-4 py-4 flex items-center gap-3 border border-white/[0.08]">
              <span className="text-4xl">🏔️</span>
              <div className="flex-1">
                <p className="text-brand-accent text-base font-extrabold">Hulelignelsen</p>
                <p className="text-brand-sub text-xs font-semibold">Badge optjent</p>
              </div>
              <div className="bg-[#7C3AED] rounded-full px-3 py-1 text-xs font-extrabold text-white">NY</div>
            </div>
          ) : (
            <div className="bg-brand-navy rounded-2xl px-4 py-4 flex items-center gap-3 border border-white/[0.08] opacity-50">
              <span className="text-4xl">🔒</span>
              <div className="flex-1">
                <p className="text-white text-base font-extrabold">Hulelignelsen</p>
                <p className="text-brand-sub text-xs font-semibold">Gennemfør quizzen for at låse op</p>
              </div>
            </div>
          )}
        </div>

        <BottomNav active="hjem" />
      </div>
    </StarsWrapper>
  );
}
