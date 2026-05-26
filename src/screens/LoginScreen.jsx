import React, { useState, useEffect } from 'react';
import { useApp } from '../AppContext';
import gameCenterIcon from '../assets/gamecenter.png';
import GyldendalLogo from '../assets/gyldendal-logo.png';

// phases: 'in' → slide down, 'visible' → pause, 'out' → slide up, 'done' → content appears
export default function LoginScreen() {
  const { navigate } = useApp();
  const [phase, setPhase] = useState('in');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('visible'), 2400);
    const t2 = setTimeout(() => setPhase('out'), 5400);
    const t3 = setTimeout(() => setPhase('done'), 5800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  const notifAnim =
    phase === 'in'  ? { animation: 'notifDown 0.4s ease forwards' } :
    phase === 'out' ? { animation: 'notifUp 0.4s ease forwards' } :
    {};

  const showContent = phase === 'done';

  return (
    <div className="absolute inset-0 bg-[#F2F2F2] overflow-hidden flex flex-col items-center justify-between py-5">

      {/* Game Center knap — notification */}
      {phase !== 'done' && (
        <div className="absolute top-4 left-4 right-4 z-50 flex justify-center" style={notifAnim}>
          <button
            className="w-60 flex items-center gap-2 bg-white rounded-3xl px-5 py-2.5"
            style={{ border: '1px solid #E0E0E0', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
          >
            <img src={gameCenterIcon} alt="Game Center" style={{ width: 28, height: 28 }} />
            <span className="text-sm font-semibold text-[#333]" style={{ fontFamily: 'Open Sans, sans-serif' }}>
              Log ind på Game Center
            </span>
          </button>
        </div>
      )}


      <div className="h-16 w-full flex-shrink-0" />

      {/* Gyldendal logo */}
    <div
        className="flex flex-col items-center gap-4"
        style={{ animation: 'logoFloat 3s ease-in-out infinite' }}>
      <div
        className="w-[120px] h-[130px] rounded-[22px] bg-white flex items-center justify-center"
        style={{ border: '2.5px solid #1A1A1A' }}>
          <Gyldendal-logo />
      </div>
    </div>

      {/* Forsæt button — always visible */}
      <div className="w-full px-8">
        <button
          onClick={() => navigate('startside')}
          className="w-full py-[18px] rounded-full text-lg font-extrabold text-[#1A1A1A]"
          style={{ background: '#F5C842', boxShadow: '0 4px 12px rgba(245,200,66,0.4)', fontFamily: 'Nunito, sans-serif' }}
        >
          Forsæt
        </button>
      </div>

      {/* Terms */}
      <p className="text-[13px] text-[#666]" style={{ fontFamily: 'Nunito, sans-serif' }}>
        Læs vilkår og betingelser{' '}
        <span className="underline text-[#444] cursor-pointer">her</span>
      </p>
    </div>
  );
}

function GameCenterIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" className="flex-shrink-0">
      <circle cx="8"  cy="14" r="7" fill="#FF3B30" />
      <circle cx="14" cy="8"  r="7" fill="#34C759" />
      <circle cx="20" cy="14" r="7" fill="#007AFF" />
      <circle cx="14" cy="20" r="7" fill="#FFCC00" />
    </svg>
  );
}

function HeronSVG() {
  return (
    <svg width="80" height="100" viewBox="0 0 80 100" fill="none">
      <ellipse cx="40" cy="62" rx="14" ry="18" fill="#1A1A1A" />
      <path d="M40 44 Q36 32 38 22 Q39 16 41 12" stroke="#1A1A1A" strokeWidth="6" strokeLinecap="round" />
      <ellipse cx="41" cy="10" rx="7" ry="6" fill="#1A1A1A" />
      <path d="M48 9 L62 11 L48 13 Z" fill="#1A1A1A" />
      <circle cx="45" cy="9" r="1.5" fill="white" />
      <path d="M30 58 Q22 60 18 70 Q24 66 32 66" fill="#1A1A1A" />
      <line x1="36" y1="78" x2="32" y2="96" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" />
      <line x1="44" y1="78" x2="48" y2="96" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" />
      <path d="M28 96 L32 96 L36 92" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" />
      <path d="M52 96 L48 96 L44 92" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
