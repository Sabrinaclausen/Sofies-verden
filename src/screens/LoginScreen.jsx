import React, { useState, useEffect } from 'react';
import { useApp } from '../AppContext';
import gameCenterIcon from '../assets/gamecenter.png';
import gyldendalLogo from '../assets/gyldendal-logo.png';

// phases: 'in' → slide down, 'visible' → pause, 'out' → slide up, 'done' → content appears
export default function LoginScreen() {
  const { navigate } = useApp();
  const [phase, setPhase] = useState('in');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('visible'), 4400);
    const t2 = setTimeout(() => setPhase('out'), 7400);
    const t3 = setTimeout(() => setPhase('done'), 7800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  const notifAnim =
    phase === 'in'  ? { animation: 'notifDown 0.4s ease 2s forwards', transform: 'translateY(-200%)' } :
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
      className="flex flex-col items-center"
      style={{ animation: 'logoFloat 3s ease-in-out infinite' }}>
      <div
        className="flex items-center justify-center"
        >
        <img 
          src={gyldendalLogo} 
          alt="Gyldendal" 
        />
      </div>
    </div>

      {/* Forsæt button */}
      <div className="w-full px-8" style={{marginTop: '-150px'}}>
        <button
          onClick={() => navigate('startside')}
          className="w-full py-[18px] rounded-full text-lg font-extrabold text-[#1A1A1A]"
          style={{ background: '#F5C842', boxShadow: '0 4px 12px rgba(245,200,66,0.4)', fontFamily: 'Nunito, sans-serif' }}
        >
          Start
        </button>
      </div>

      {/* Terms */}
      <p className=" text-[#666]" style={{ fontFamily: 'Open Sans, sans-serif' }}>
        Læs vilkår og betingelser{' '}
        <span className="underline text-[#444] cursor-pointer">her</span>
      </p>
    </div>
  );
}

