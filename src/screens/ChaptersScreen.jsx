import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../AppContext';
import { StarsWrapper, TopBar, C } from '../components/shared';
import { CHAPTERS } from '../data';
import sofieImg from '../assets/sofie-startside.webp';
import kapitelGrotte from '../assets/kapitel-grotte.webp';
import kapitelAkademi from '../assets/kapitel-akademi.webp';
import kapitelDetEvige from '../assets/kapitel-detevige.webp';
import kapitelIdeernesVerden from '../assets/kapitel-ideernesverden.webp';
import kapitelUdodelig from '../assets/kapitel-udodelig.webp';
import kapitelSikkerViden from '../assets/kapitel-sikkerviden.webp';
import kapitelFilosofistaten from '../assets/kapitel-filosofistaten.webp';
import sofieVinkerImg from '../assets/sofie-vinker.webp';

const GIRL_SPEECH = 'Hej! Jeg er Sofie. Lad os lære om Platons hulelignelse! Klik på det første kapitel for at begynde vores rejse.';

const IMAGES = {
  cave: kapitelGrotte,
  akademi: kapitelAkademi,
  eternal: kapitelDetEvige,
  ideas: kapitelIdeernesVerden,
  soul: kapitelUdodelig,
  knowledge: kapitelSikkerViden,
  state: kapitelFilosofistaten,
};

const ChapterCard = ({ chapter, onClick }) => {
  return (
    <button
      onClick={chapter.active ? onClick : undefined}
      className={`relative flex flex-col justify-end items-start p-2.5 rounded-2xl overflow-hidden w-full min-h-[140px] ${chapter.active ? 'opacity-100 cursor-pointer' : 'opacity-70 cursor-default'}`}
      style={{
        backgroundImage: `url(${IMAGES[chapter.id]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        border: chapter.active ? '1.5px solid rgba(245,200,66,0.3)' : '1.5px solid rgba(255,255,255,0.06)',
      }}
    >
      <p className="text-[#F0EAFF] text-base font-fredoka font-bold leading-tight relative z-10 max-w-[90px] text-left">
        {chapter.title}
      </p>
      {chapter.active && (
        <div className="absolute bottom-2 right-2 w-[22px] h-[22px] rounded-full flex  bg-white/20">
          <span className="text-base ml-px">▶</span>
        </div>
      )}
    </button>
  );
};

export default function ChaptersScreen() {
  const { navigate, state, updateState } = useApp();
  const [typedText, setTypedText] = useState('');
  const [typingDone, setTypingDone] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!state.girlLarge) return;
    setTypedText('');
    setTypingDone(false);
    let i = 0;
    intervalRef.current = setInterval(() => {
      i++;
      setTypedText(GIRL_SPEECH.slice(0, i));
      if (i >= GIRL_SPEECH.length) {
        clearInterval(intervalRef.current);
        setTypingDone(true);
      }
    }, 28);
    return () => clearInterval(intervalRef.current);
  }, [state.girlLarge]);

  const handleCaveClick = () => {
    navigate('map');
  };

  const shrinkGirl = () => {
  clearInterval(intervalRef.current);
  updateState({ girlLarge: false });
};

const expandGirl = () => updateState({ girlLarge: true });

  return (
    <StarsWrapper>
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <TopBar />

        {/* kapitel grid */}
        <div className={`scrollable flex-1 px-4 pt-4 pb-5 ${state.girlLarge ? 'pointer-events-none' : ''}`}>
          <h1 className="text-brand-accent text-5xl font-semibold mb-0.5 font-fredoka">Velkommen</h1>
          <p className="text-[#F0EAFF] text-base font-semibold font-opensans mb-4">Vælg et kapitel for at starte et spil</p>

          <div className="grid grid-cols-2 gap-2.5">
            
            {/* Hulelignelsen */}
            <div className="row-span-2 flex flex-col">
              <button
                onClick={handleCaveClick}
                className="flex-1 relative flex flex-col justify-end items-start p-2.5 rounded-2xl overflow-hidden cursor-pointer min-h-[190px]"
                style={{
                  backgroundImage: `url(${kapitelGrotte})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  border: '1.5px solid rgba(245,200,66,0.3)',
                }}
              >
                <p className="text-[#F0EAFF] text-base font-fredoka font-bold leading-tight relative z-10 max-w-[120px] text-left">
                  {CHAPTERS[0].title}
                </p>
                <div className="absolute bottom-2 right-2 w-7 h-7 rounded-full flex items-center justify-center bg-white/20">
                  <span className="text-base ml-px">▶&#xFE0E;</span>
                </div>
              </button>
            </div>

            <ChapterCard chapter={CHAPTERS[1]} />
            <ChapterCard chapter={CHAPTERS[2]} />
            <ChapterCard chapter={CHAPTERS[3]} />
            <ChapterCard chapter={CHAPTERS[4]} />

            <div style={{ gridColumn: 'span 2', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <ChapterCard chapter={CHAPTERS[5]} />
              <ChapterCard chapter={CHAPTERS[6]} />
            </div>
          </div>
        </div>

        {/* Sofie i stor */}
        {state.girlLarge && (
          <div
            className="absolute inset-0 z-20 flex flex-col justify-end"
            style={{ background: 'rgba(13,11,43,0.72)' }}
          >
            <div className="relative w-full">
              <img src={sofieImg} alt="Sofie" className="w-full block" draggable={false} />

              {/* Tekst i taleboble */}
              <div
                className="absolute overflow-hidden"
                style={{ top: '4%', left: '42%', right: '13%', height: '22%', padding: '8px 10px' }}
              >
                <p
                  className="font-opensans font-semibold"
                  style={{
                    fontSize: 11.5,
                    lineHeight: 1.4,
                    color: '#1A1A1A',
                    wordBreak: 'break-word',
                    overflowWrap: 'break-word',
                    margin: 0,
                  }}
                >
                  {typedText}
                  {!typingDone && <span style={{ opacity: 0.4 }}>|</span>}
                </p>
              </div>

              {/* Fortsæt knap */}
              <button
                onClick={shrinkGirl}
                className="absolute bg-transparent border-none outline-none p-0 cursor-pointer z-10 font-opensans font-bold text-[14px]"
                style={{ top: '27%', left: '44%', color: '#1A1A1A' }}
              >
                Fortsæt →
              </button>
            </div>
          </div>
        )}

        {/* Sofie i lille*/}
        {!state.girlLarge && (
          <button
            onClick={expandGirl}
            className="absolute bottom-0 left-0 bg-transparent border-none outline-none p-0 cursor-pointer z-20"
          >
            <img src={sofieVinkerImg} alt="Sofie" draggable={false} className="w-auto block" />
          </button>
        )}
      </div>
    </StarsWrapper>
  );
}