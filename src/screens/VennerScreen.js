import React from 'react';
import { useApp } from '../AppContext';
import { StarsWrapper, TopBar, BottomNav, C } from '../components/shared';

function AvatarCircle({ emoji, size = 40 }) {
  return (
    <div className="rounded-full bg-brand-card border-2 border-white/10 flex items-center justify-center flex-shrink-0"
         style={{ width: size, height: size, fontSize: size * 0.5 }}>
      {emoji}
    </div>
  );
}

export default function VennerScreen() {
  const { state, navigate } = useApp();

  return (
    <StarsWrapper>
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />

        <div className="scrollable flex-1 px-5 pt-1 pb-3">
          <h1 className="text-brand-accent text-4xl font-black mb-4">Venner</h1>

          {/* Tabs */}
          <div className="flex gap-2.5 mb-5">
            <button className="flex-1 py-3 rounded-xl text-brand-dark text-sm font-extrabold"
                    style={{ background: C.accent }}>
              Venner
            </button>
            <button
              onClick={() => navigate('inviter')}
              className="flex-1 py-3 rounded-xl text-white text-sm font-extrabold bg-brand-navy border border-white/10"
            >
              Inviter venner
            </button>
          </div>

          {/* Friends list from state */}
          <div className="flex flex-col gap-2.5">
            {state.friendsList.map((f, i) => (
              <div key={i} className="flex items-center justify-between bg-brand-navy rounded-2xl px-4 py-3"
                   style={{ border: `1.5px solid ${C.accent}` }}>
                <div className="flex items-center gap-3">
                  <AvatarCircle emoji={f.emoji} />
                  <span className="text-white text-sm font-bold">{f.username}</span>
                </div>
                <span className="text-brand-sub text-sm font-bold">{f.xp}xp</span>
              </div>
            ))}
            {state.friendsList.length === 0 && (
              <p className="text-brand-sub text-center mt-10 text-sm">Ingen venner endnu</p>
            )}
          </div>
        </div>

        <BottomNav active="venner" />
      </div>
    </StarsWrapper>
  );
}
