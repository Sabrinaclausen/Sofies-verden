import React, { useState } from 'react';
import { useApp } from '../AppContext';
import { StarsWrapper, TopBar, BottomNav, CharacterEmoji, PencilIcon, C } from '../components/shared';

function Toggle({ on, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className="relative flex-shrink-0 rounded-full transition-colors"
      style={{ width: 48, height: 26, background: on ? '#22C55E' : '#555' }}
    >
      <div className="absolute top-[3px] w-5 h-5 rounded-full bg-white transition-all"
           style={{ left: on ? 24 : 3, boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }} />
    </button>
  );
}

export default function IndstillingerScreen() {
  const { state, navigate, updateState, openCharacterSelect } = useApp();
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState(state.username);
  const [gameCenterOn, setGameCenterOn] = useState(true);
  const [notifOn, setNotifOn] = useState(true);

  const handleSaveName = () => {
    updateState({ username: editName });
    setEditing(false);
  };

  return (
    <StarsWrapper>
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />

        <div className="scrollable flex-1 px-5 pt-1 pb-5">
          <h1 className="text-brand-accent text-4xl font-black mb-5">Indstillinger</h1>

          {/* Avatar */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full flex items-center justify-center border-2 border-white/10"
                   style={{ background: 'radial-gradient(circle at 40% 35%, #2D2A6E, #0D0B2B)' }}>
                <CharacterEmoji id={state.selectedCharacter} size={56} />
              </div>
              <button
                onClick={() => openCharacterSelect('settings')}
                className="absolute bottom-0.5 right-0.5 w-7 h-7 rounded-full bg-brand-card flex items-center justify-center border border-white/20"
              >
                <PencilIcon size={12} color="white" />
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            {editing ? (
              <div className="bg-brand-navy rounded-2xl px-4 py-3"
                   style={{ border: `1.5px solid ${C.accent}` }}>
                <p className="text-brand-sub text-xs font-semibold mb-1.5">Brugernavn</p>
                <div className="flex gap-2">
                  <input
                    value={editName}
                    onChange={e => setEditName(e.target.value)}
                    className="flex-1 bg-transparent text-white text-base font-extrabold"
                  />
                  <button onClick={handleSaveName} className="bg-transparent text-lg text-green-400">✓</button>
                  <button onClick={() => setEditing(false)} className="bg-transparent text-lg text-red-400">✕</button>
                </div>
              </div>
            ) : (
              <div className="bg-brand-navy rounded-2xl px-4 py-3 border border-white/[0.06]">
                <p className="text-brand-sub text-xs font-semibold mb-1">Brugernavn</p>
                <div className="flex items-center justify-between">
                  <p className="text-white text-base font-extrabold">{state.username}</p>
                  <button onClick={() => setEditing(true)} className="bg-transparent p-1">
                    <PencilIcon size={18} color={C.accent} />
                  </button>
                </div>
              </div>
            )}

            {[
              { label: 'Du er loget ind med', value: 'Game Center', on: gameCenterOn, toggle: () => setGameCenterOn(v => !v) },
              { label: 'Notifikationer', value: 'Tillad notifikationer', on: notifOn, toggle: () => setNotifOn(v => !v) },
            ].map(row => (
              <div key={row.label} className="bg-brand-navy rounded-2xl px-4 py-3 border border-white/[0.06]">
                <p className="text-brand-sub text-xs font-semibold mb-1">{row.label}</p>
                <div className="flex items-center justify-between">
                  <p className="text-white text-base font-extrabold">{row.value}</p>
                  <Toggle on={row.on} onToggle={row.toggle} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <BottomNav active="hjem" />
      </div>
    </StarsWrapper>
  );
}
