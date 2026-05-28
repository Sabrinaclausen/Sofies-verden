import React from 'react';
import { useApp } from '../AppContext';
import { StarsWrapper, TopBar, BottomNav, C } from '../components/shared';
import badge from '../assets/grotte-badges.png';

export default function BadgesScreen() {
  const { state } = useApp();

  return (
    <StarsWrapper>
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />

        <div className="scrollable flex-1 px-5 pt-16 pb-3">
          <h1 className="text-brand-accent flex justify-center text-5xl font-semibold font-fredoka mb-5">Badges</h1>

          {/* Stats */}
          <div className="flex gap-10 justify-center w-full mt-16 mb-10">
            <div
              className="w-[90px] bg-brand-navy rounded-xl text-center relative"
              style={{ border: `2px solid ${C.accent}`, padding: '8px 12px' }}
            >
              <p className="absolute -top-7 left-0 right-0 text-center text-base font-opensans"
                style={{ color: '#F0EAFF' }}>
                Badges
              </p>
              <p className="text-brand-accent text-2xl font-black font-fredoka">
                {state.badges}
              </p>
            </div>
            <div
              className="w-[90px] bg-brand-navy rounded-xl text-center relative"
              style={{ border: `2px solid ${C.accent}`, padding: '8px 12px' }}
            >
              <p className="absolute -top-7 left-0 right-0 text-center text-base font-opensans"
                style={{ color: '#F0EAFF' }}>
                Point
              </p>
              <p className="text-brand-accent text-2xl font-black font-fredoka">
                {state.points}
              </p>
            </div>
          </div>

          {/* Badge kort — optjenes når quiz er gennemført */}
          {state.quizCompleted ? (
            <div className="w-full bg-brand-navy rounded-2xl px-4 py-3 flex items-center gap-3 border border-white/[0.08]">
            <img src={badge} alt="Badge" className="w-10 h-10 object-contain" />
            <div className="flex-1">
              <p className="text-[#AA85FF] text-base font-opensans font-extrabold">Hulelignelsen</p>
              <p className="text-[#6C3FD4] text-sm font-opensans font-semibold">Nyt badge optjent!</p>
            </div>
            <div className="bg-[#6C3FD4] rounded-full px-3 py-1 text-xs font-fredoka text-[#AA85FF]">NY</div>
          </div>
          ) : (
            <div className="bg-brand-navy rounded-2xl px-4 py-4 flex items-center gap-3 border border-white/[0.08] opacity-50">
              <span className="text-4xl">🔒</span>
              <div className="flex-1">
                <p className="text-[#AA85FF] text-base font-opensans font-extrabold">Hulelignelsen</p>
                <p className="text-brand-sub text-sm font-opensans font-semibold">Gennemfør quizzen for at låse op</p>
              </div>
            </div>
          )}
        </div>

        <BottomNav active="hjem" />
      </div>
    </StarsWrapper>
  );
}
