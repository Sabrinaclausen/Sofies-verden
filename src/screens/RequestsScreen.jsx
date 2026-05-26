import React from 'react';
import { useApp } from '../AppContext';
import { StarsWrapper, TopBar, BottomNav, C } from '../components/shared';

function AvatarCircle({ emoji, size = 44 }) {
  return (
    <div className="rounded-full bg-brand-card border-2 border-white/10 flex items-center justify-center flex-shrink-0"
         style={{ width: size, height: size, fontSize: size * 0.5 }}>
      {emoji}
    </div>
  );
}

export default function RequestsScreen() {
  const { state, updateState } = useApp();

  const handleAccept = (req) => {
    updateState({
      friendRequestsList: state.friendRequestsList.filter(r => r.username !== req.username),
      friendRequests: Math.max(0, state.friendRequests - 1),
      friendsList: [...state.friendsList, { username: req.username, xp: 0, emoji: req.emoji }],
    });
  };

  const handleDecline = (req) => {
    updateState({
      friendRequestsList: state.friendRequestsList.filter(r => r.username !== req.username),
      friendRequests: Math.max(0, state.friendRequests - 1),
    });
  };

  return (
    <StarsWrapper>
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />

        <div className="scrollable flex-1 px-5 pt-1 pb-3">
          <h1 className="text-brand-accent text-3xl font-black mb-5">Venne anmodninger</h1>

          <div className="flex flex-col gap-2.5">
            {state.friendRequestsList.map((req, i) => (
              <div key={i} className="flex items-center justify-between bg-brand-navy rounded-2xl px-4 py-3"
                   style={{ border: `1.5px solid ${C.accent}` }}>
                <div className="flex items-center gap-3">
                  <AvatarCircle emoji={req.emoji} />
                  <span className="text-white text-sm font-bold">{req.username}</span>
                </div>
                <div className="flex gap-2 items-center">
                  <button
                    onClick={() => handleAccept(req)}
                    className="bg-transparent text-xl text-green-400 font-black"
                  >✓</button>
                  <button
                    onClick={() => handleDecline(req)}
                    className="bg-transparent text-lg text-red-400 font-black"
                  >✕</button>
                </div>
              </div>
            ))}
            {state.friendRequestsList.length === 0 && (
              <p className="text-brand-sub text-center mt-10 text-sm">Ingen ventende anmodninger</p>
            )}
          </div>
        </div>

        <BottomNav active="venner" />
      </div>
    </StarsWrapper>
  );
}
