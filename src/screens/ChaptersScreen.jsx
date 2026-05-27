import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../AppContext';
import { StarsWrapper, TopBar, C } from '../components/shared';
import { CHAPTERS } from '../data';
import sofieImg from '../assets/sofie-startside.png';
import sofieSmallImg from '../assets/sofie-startside-to.png';
import kapitelGrotte from '../assets/kapitel-grotte.png';
import kapitelAkademi from '../assets/kapitel-akademi.png';
import kapitelDetEvige from '../assets/kapitel-detevige.png';
import kapitelIdeernesVerden from '../assets/kapitel-ideernesverden.png';
import kapitelUdodelig from '../assets/kapitel-udodelig.png';
import kapitelSikkerViden from '../assets/kapitel-sikkerviden.png';
import kapitelFilosofistaten from '../assets/kapitel-filosofistaten.png';
import sofieVinkerImg from '../assets/sofie-vinker.png';

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
  const { navigate } = useApp();
  const [girlLarge, setGirlLarge] = useState(true);
  const [typedText, setTypedText] = useState('');
  const [typingDone, setTypingDone] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!girlLarge) return;
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
  }, [girlLarge]);

  const handleCaveClick = () => {
    navigate('map');
  };

  const shrinkGirl = () => {
    clearInterval(intervalRef.current);
    setGirlLarge(false);
  };

  const expandGirl = () => setGirlLarge(true);

  return (
    <StarsWrapper>
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <TopBar />

        {/* Chapter grid */}
        <div className={`scrollable flex-1 px-4 pb-5 ${girlLarge ? 'pointer-events-none' : ''}`}>
          <h1 className="text-brand-accent text-4xl font-black mb-0.5 font-fredoka">Velkommen</h1>
          <p className="text-[#F0EAFF] text-base font-semibold font-opensans mb-4">Vælg et kapitel for at starte et spil</p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            
            {/* Cave — stor venstre kort */}
            <div style={{ gridRow: 'span 2', display: 'flex', flexDirection: 'column' }}>
              <button
                onClick={handleCaveClick}
                style={{
                  flex: 1,
                  backgroundImage: `url(${kapitelGrotte})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  borderRadius: 16,
                  border: '1.5px solid rgba(245,200,66,0.3)',
                  overflow: 'hidden',
                  position: 'relative',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  alignItems: 'flex-start',
                  padding: 10,
                  minHeight: 190,
                }}
              >
                <p className="text-[#F0EAFF] text-base font-fredoka font-bold leading-tight relative z-10 max-w-[120px] text-left">
                  {CHAPTERS[0].title}
                </p>
                <div style={{
                  position: 'absolute', bottom: 10, right: 10, width: 24, height: 24, borderRadius: '50%',
                  background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{ fontSize: 10, marginLeft: 1 }}>▶</span>
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

        {/* Sofie overlay — stor */}
        {girlLarge && (
          <div
            className="absolute inset-0 z-20 flex flex-col justify-end"
            style={{ background: 'rgba(13,11,43,0.72)' }}
          >
            <div className="relative w-full">
              <img src={sofieImg} alt="Sofie" className="w-full block" draggable={false} />

              {/* Tekst i taleboble */}
              <div
                style={{
                  position: 'absolute',
                  top: '4%', left: '42%', right: '11%', height: '22%',
                  padding: '8px 10px',
                  overflow: 'hidden',
                }}
              >
                <p
                  style={{
                    fontSize: 11.5,
                    fontWeight: 600,
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
                style={{
                  position: 'absolute',
                  top: '27%', left: '44%',
                  background: 'none',
                  border: 'none',
                  outline: 'none',
                  padding: 0,
                  fontSize: 12,
                  fontWeight: 800,
                  color: '#1A1A1A',
                  cursor: 'pointer',
                  zIndex: 10,
                }}
              >
                Fortsæt →
              </button>
            </div>
          </div>
        )}

        {/* Sofie lille — nederst til venstre */}
        {!girlLarge && (
          <button
            onClick={expandGirl}
            className="absolute bottom-0 left-0 bg-transparent border-none outline-none p-0 cursor-pointer z-20"
          >
            <img
              src={sofieVinkerImg}
              alt="Sofie"
              draggable={false}
              className=" w-auto block"
            />
          </button>
        )}
      </div>
    </StarsWrapper>
  );
}