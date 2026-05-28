import React, { useState } from 'react';
import { useApp } from '../AppContext';
import { StarsWrapper, TopBar, BottomNav, SearchIcon, C } from '../components/shared';
import { INVITE_USERS } from '../data';
import profilHund from '../assets/profil-huns.png';
import profilGingerbread from '../assets/profil-gingerbread.png';
import profilOwl from '../assets/profil-ugle.png';
import profilCaveman from '../assets/profil-cavemann.png';
import profilHest from '../assets/profil-hest.png';
import profilKompas from '../assets/profil-kompass.png';
import addFriendAktiv from '../assets/addfriend-aktiv.png';
import friendInaktiv from '../assets/friend.png';

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

export default function InviterScreen() {
  const { navigate, state, updateState } = useApp();
  const [search, setSearch] = useState('');

  const toggle = (user) => {
    const added = state.addedUsers || [];
    if (added.includes(user.username)) return;
    updateState({
      addedUsers: [...added, user.username],
    });
  };

  const filtered = INVITE_USERS.filter(u =>
    u.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <StarsWrapper>
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />

        <div className="scrollable flex-1 px-5 pt-5 pb-3">
          <h1 className="text-brand-accent text-4xl font-black font-fredoka mb-4">Inviter venner</h1>

          {/* Tabs */}
          <div className="flex gap-5 mb-4">
            <button
              onClick={() => navigate('venner')}
              className="flex-1 py-2 rounded-xl text-brand-sub text-base font-opensans bg-brand-navy border relative overflow-hidden flex flex-col items-center justify-center"
            >
              <img src={friendInaktiv} alt="" className="h-14 w-14 object-contain" />
              <span className="relative z-10 -mt-2">Venner</span>
            </button>
            <button
              className="flex-1 py-2 rounded-xl text-brand-dark text-base font-opensans relative overflow-hidden flex flex-col items-center justify-center"
              style={{ background: C.accent }}
            >
              <img src={addFriendAktiv} alt="" className="h-14 w-14 object-contain" />
              <span className="relative z-10 -mt-2">Inviter venner</span>
            </button>
          </div>

          {/* Search */}
          <div className="flex items-center gap-2.5 bg-brand-navy rounded-xl px-3.5 py-2.5 mb-4 border border-white/10">
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Søg..."
              className="flex-1 bg-transparent text-white text-sm font-opensans placeholder:text-brand-sub/60"
            />
            <SearchIcon />
          </div>

          {/* User list */}
          <div className="flex flex-col gap-2.5">
            {filtered.map((u, i) => {
              const isSent = (state.addedUsers || []).includes(u.username);
              return (
                <div key={i} className="flex items-center justify-between bg-brand-navy rounded-2xl px-4 py-3"
                     style={{ border: `1.5px solid ${C.accent}` }}>
                  <div className="flex items-center gap-3">
                    <AvatarCircle avatarId={u.emoji} />
                    <span className="text-white text-sm font-bold">{u.username}</span>
                  </div>
                  <button
                    onClick={() => toggle(u)}
                    className="w-9 h-9 rounded-full flex items-center justify-center text-xl font-black text-green-400"
                    style={{ background: isSent ? '#1A5C3A' : '#166534' }}
                  >
                    {isSent ? '✓' : '+'}
                  </button>
                </div>
              );
            })}
            {filtered.length === 0 && (
              <p className="text-brand-sub text-center mt-10 text-sm">Ingen brugere at invitere</p>
            )}
          </div>
        </div>

        <BottomNav active="venner" />
      </div>
    </StarsWrapper>
  );
}