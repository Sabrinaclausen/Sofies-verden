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
  const { navigate } = useApp();
  const [search, setSearch] = useState('');
  const [invitedSet, setInvitedSet] = useState(new Set());

  const filtered = INVITE_USERS.filter(u =>
    u.username.toLowerCase().includes(search.toLowerCase())
  );

  const toggle = (username) => {
    const s = new Set(invitedSet);
    if (s.has(username)) s.delete(username); else s.add(username);
    setInvitedSet(s);
  };

  return (
    <StarsWrapper>
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />

        <div className="scrollable flex-1 px-5 pt-1 pb-3">
          <h1 className="text-brand-accent text-4xl font-black mb-4">Inviter venner</h1>

          {/* Tabs */}
          <div className="flex gap-2.5 mb-4">
            <button
              onClick={() => navigate('venner')}
              className="flex-1 py-3 rounded-xl text-white text-sm font-extrabold bg-brand-navy border border-white/10"
            >
              Venner
            </button>
            <button className="flex-1 py-3 rounded-xl text-brand-dark text-sm font-extrabold"
                    style={{ background: C.accent }}>
              Inviter venner
            </button>
          </div>

          {/* Search */}
          <div className="flex items-center gap-2.5 bg-brand-navy rounded-xl px-3.5 py-2.5 mb-4 border border-white/10">
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Søg..."
              className="flex-1 bg-transparent text-white text-sm font-semibold placeholder:text-brand-sub/60"
            />
            <SearchIcon />
          </div>

          {/* User list */}
          <div className="flex flex-col gap-2.5">
            {filtered.map((u, i) => (
              <div key={i} className="flex items-center justify-between bg-brand-navy rounded-2xl px-4 py-3"
                   style={{ border: `1.5px solid ${C.accent}` }}>
                <div className="flex items-center gap-3">
                  <AvatarCircle avatarId={u.emoji} />
                  <span className="text-white text-sm font-bold">{u.username}</span>
                </div>
                <button
                  onClick={() => toggle(u.username)}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xl text-green-400 font-black"
                  style={{ background: invitedSet.has(u.username) ? '#1A5C3A' : '#166534' }}
                >
                  {invitedSet.has(u.username) ? '✓' : '+'}
                </button>
              </div>
            ))}
          </div>
        </div>

        <BottomNav active="venner" />
      </div>
    </StarsWrapper>
  );
}
