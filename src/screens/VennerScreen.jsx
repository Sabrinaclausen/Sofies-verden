import React from 'react';
import { useApp } from '../AppContext';
import { StarsWrapper, TopBar, BottomNav, C } from '../components/shared';
import profilHund from '../assets/profil-huns.png';
import profilGingerbread from '../assets/profil-gingerbread.png';
import profilOwl from '../assets/profil-ugle.png';
import profilCaveman from '../assets/profil-cavemann.png';
import profilHest from '../assets/profil-hest.png';
import profilKompas from '../assets/profil-kompass.png';
import addFriend from '../assets/addfriend.png';
import friend from '../assets/friend-aktiv.png';

const AVATAR_MAP = {
  dog: profilHund,
  gingerbread: profilGingerbread,
  owl: profilOwl,
  caveboy: profilCaveman,
  horse: profilHest,
  compass: profilKompas,
};

function AvatarCircle({ avatarId, size = 40 }) {
  return (
    <div className="rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden"
         style={{ width: size, height: size }}>
      <img src={AVATAR_MAP[avatarId] || profilHund} alt="avatar" className="w-full h-full object-cover" />
    </div>
  );
}

export default function VennerScreen() {
  const { state, navigate } = useApp();

  return (
    <StarsWrapper>
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />

        <div className="scrollable flex-1 px-5 pt-12 pb-3">
          <h1 className="text-brand-accent flex justify-center text-5xl font-semibold font-fredoka mb-4">Venner</h1>

          {/* Tabs */}
          <div className="flex gap-5 mb-6 mt-6">
            <button className="flex-1 py-2 rounded-xl text-brand-dark text-base font-opensans relative overflow-hidden flex flex-col items-center justify-center"
              style={{ background: C.accent }}>
              <img src={friend} alt="" className="h-14 w-14 object-contain" />
              <span className="relative z-10 -mt-2">Venner</span>
            </button>
            <button
              onClick={() => navigate('inviter')}
              className="flex-1 py-2 rounded-xl text-brand-sub text-base font-opensans bg-brand-navy relative overflow-hidden flex flex-col items-center justify-center "
              style={{ border: '2px solid #F5C842' }}
            >
              <img src={addFriend} alt="" className="h-14 w-14 object-contain" />
              <span className="relative z-10 -mt-2">Inviter venner</span>
            </button>
          </div>

          {/* Friends list from state */}
          <div className="flex flex-col gap-2.5">
            {state.friendsList.map((f, i) => (
              <div key={i} className="flex items-center justify-between bg-brand-navy rounded-2xl px-4 py-3"
                   style={{ border: `1.5px solid ${C.accent}` }}>
                <div className="flex items-center gap-3">
                  <AvatarCircle avatarId={f.emoji} />
                  <span className="text-brand-sub text-base font-fredoka">{f.username}</span>
                </div>
                <span className="text-brand-sub text-base font-fredoka">{f.xp}xp</span>
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
