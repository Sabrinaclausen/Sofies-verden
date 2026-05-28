import React, { useState } from 'react';
import { useApp } from '../AppContext';
import { StarsWrapper, TopBar, BottomNav, CharacterEmoji, C, PencilIcon } from '../components/shared';
import profilBaggrund from '../assets/profil-baggrund.webp';

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

        <div className="scrollable flex-1 px-5 pt-5 pb-5">
          <h1 className="text-brand-accent text-5xl font-semibold font-fredoka mb-16">Indstillinger</h1>

          {/* Avatar */}
          <div className="flex justify-center mb-16">
            <div className="relative">
              <div className="w-36 h-36 rounded-full flex items-center justify-center border-white/10 overflow-hidden relative">
              <img src={profilBaggrund} alt="" className="absolute inset-0 w-full h-full object-cover" />
              <div className="relative z-10">
                <CharacterEmoji id={state.selectedCharacter} size={110} />
              </div>
            </div>
              <button
                onClick={() => openCharacterSelect('settings')}
                className="absolute bottom-0.5 right-0.5 w-7 h-7 rounded-full bg-[#F0EAFF] flex items-center justify-center border border-white/20"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11" fill="none">
                  <path d="M0 10.3871V7.93459L7.6172 0.33181C7.73261 0.226016 7.86014 0.144265 7.99979 0.0865592C8.13944 0.0288531 8.28601 0 8.43951 0C8.59301 0 8.74208 0.0288531 8.88673 0.0865592C9.03138 0.144265 9.15641 0.230824 9.26182 0.346236L10.0553 1.15412C10.1707 1.25992 10.2549 1.38495 10.308 1.52921C10.3611 1.67348 10.3875 1.81774 10.3871 1.96201C10.3871 2.11589 10.3607 2.26266 10.308 2.4023C10.2553 2.54195 10.1711 2.66929 10.0553 2.78432L2.45251 10.3871H0ZM8.42509 2.76989L9.23297 1.96201L8.42509 1.15412L7.6172 1.96201L8.42509 2.76989Z" fill="#626262"/>
                </svg>
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
                    className="flex-1 bg-transparent text-brand-sub text-base font-opensans font-extrabold"
                  />
                  <button onClick={handleSaveName} className="bg-transparent text-lg text-green-400">✓</button>
                  <button onClick={() => setEditing(false)} className="bg-transparent text-lg text-red-400">✕</button>
                </div>
              </div>
            ) : (
              <div className="bg-brand-navy rounded-2xl px-4 py-3 border border-white/[0.06]">
                <p className="text-brand-sub text-xs font-semibold font-opensans mb-1">Brugernavn</p>
                <div className="flex items-center justify-between">
                  <p className="text-white text-lg font-semibold font-fredoka">{state.username}</p>
                  <button onClick={() => setEditing(true)} className="bg-transparent p-1">
                    <PencilIcon size={16} />
                  </button>
                </div>
              </div>
            )}

            {[
              { label: 'Du er loget ind med', value: 'Game Center', on: gameCenterOn, toggle: () => setGameCenterOn(v => !v) },
              { label: 'Notifikationer', value: 'Tillad notifikationer', on: notifOn, toggle: () => setNotifOn(v => !v) },
            ].map(row => (
              <div key={row.label} className="bg-brand-navy rounded-2xl px-4 py-3 border border-white/[0.06]">
                <p className="text-brand-sub text-xs font-semibold font-opensans mb-1">{row.label}</p>
                <div className="flex items-center justify-between">
                  <p className="text-white text-lg font-semibold font-fredoka">{row.value}</p>
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
