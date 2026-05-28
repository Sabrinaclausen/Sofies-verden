import React from 'react';
import { useApp } from '../AppContext';
import { StarsWrapper, TopBar, BottomNav, C } from '../components/shared';
import profilHund from '../assets/profil-huns.png';
import profilGingerbread from '../assets/profil-gingerbread.png';
import profilOwl from '../assets/profil-ugle.png';
import profilCaveman from '../assets/profil-cavemann.png';
import profilHest from '../assets/profil-hest.png';
import profilKompas from '../assets/profil-kompass.png';

const AVATAR_MAP = {
  hund: profilHund,
  gingerbread: profilGingerbread,
  owl: profilOwl,
  caveboy: profilCaveman,
  horse: profilHest,
  compass: profilKompas,
};

function AvatarCircle({ avatarId, size = 44 }) {
  return (
    <div className="rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden"
         style={{ width: size, height: size }}>
      <img src={AVATAR_MAP[avatarId] || profilHund} alt="avatar" className="w-full h-full object-cover" />
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
                  <AvatarCircle avatarId={req.emoji} />
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
