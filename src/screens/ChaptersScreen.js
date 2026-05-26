import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../AppContext';
import { StarsWrapper, TopBar, C } from '../components/shared';
import { CHAPTERS } from '../data';
import sofieImg from '../assets/sofie-startside.png';
import sofieSmallImg from '../assets/sofie-startside-to.png';

const GIRL_SPEECH = 'Hej! Jeg er Sofie. Lad os lære om Platons hulelignelse! Klik på det første kapitel for at begynde vores rejse.';

const ChapterCard = ({ chapter, onClick }) => {
  const gradients = {
    cave:      'linear-gradient(160deg, #0D1B3E 0%, #1A3560 50%, #0A2040 100%)',
    akademi:   'linear-gradient(160deg, #1A3A1A 0%, #2D6B2D 50%, #1A4A2A 100%)',
    eternal:   'linear-gradient(160deg, #3A2A0A 0%, #6A4A10 50%, #4A3010 100%)',
    ideas:     'linear-gradient(160deg, #0A2A3A 0%, #1A4A6A 50%, #0A3050 100%)',
    soul:      'linear-gradient(160deg, #2A0A3A 0%, #4A1A6A 50%, #2A0A50 100%)',
    knowledge: 'linear-gradient(160deg, #1A2A0A 0%, #2A4A10 50%, #1A3010 100%)',
    state:     'linear-gradient(160deg, #2A1A0A 0%, #4A2A10 50%, #3A1A08 100%)',
  };
  const emojis = { cave:'🌙', akademi:'🏛️', eternal:'🌸', ideas:'🌿', soul:'✨', knowledge:'🌾', state:'🏰' };

  return (
    <button
      onClick={chapter.active ? onClick : undefined}
      style={{
        background: gradients[chapter.id] || '#1A1A4A',
        borderRadius: 16,
        border: chapter.active ? `1.5px solid rgba(245,200,66,0.3)` : '1.5px solid rgba(255,255,255,0.06)',
        overflow: 'hidden', position: 'relative',
        cursor: chapter.active ? 'pointer' : 'default',
        opacity: chapter.active ? 1 : 0.7,
        display: 'flex', flexDirection: 'column',
        justifyContent: 'flex-end', alignItems: 'flex-start',
        padding: 10, minHeight: 90, width: '100%',
      }}
    >
      <span style={{ position: 'absolute', top: 10, right: 10, fontSize: 22, opacity: 0.6 }}>
        {emojis[chapter.id]}
      </span>
      {[...Array(4)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute', left: `${10 + i * 12}%`, top: `${8 + i * 8}%`,
          width: 1.5, height: 1.5, borderRadius: '50%', background: 'white', opacity: 0.5,
        }} />
      ))}
      <p style={{ color: 'white', fontSize: 11, fontWeight: 800, lineHeight: 1.3, position: 'relative', zIndex: 1 }}>
        {chapter.title}
      </p>
      {chapter.active && (
        <div style={{
          position: 'absolute', bottom: 8, right: 8, width: 22, height: 22, borderRadius: '50%',
          background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ fontSize: 9, marginLeft: 1 }}>▶</span>
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

        {/* Chapter grid — only accessible when girl is small */}
        <div className={`scrollable flex-1 px-4 pb-5 ${girlLarge ? 'pointer-events-none' : ''}`}>
          <h1 className="text-brand-accent text-4xl font-black mb-0.5">Velkommen</h1>
          <p className="text-brand-sub text-sm font-semibold mb-4">Vælg et kapitel for at starte et spil</p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <div style={{ gridRow: 'span 2', display: 'flex', flexDirection: 'column' }}>
              <button
                onClick={handleCaveClick}
                style={{
                  flex: 1,
                  background: 'linear-gradient(160deg, #0D1B3E 0%, #1A3560 50%, #0A2040 100%)',
                  borderRadius: 16, border: '1.5px solid rgba(245,200,66,0.3)',
                  overflow: 'hidden', position: 'relative',
                  cursor: 'pointer', display: 'flex', flexDirection: 'column',
                  justifyContent: 'flex-end', alignItems: 'flex-start',
                  padding: 10, minHeight: 190,
                }}
              >
                <span style={{ position: 'absolute', top: 10, right: 10, fontSize: 32, opacity: 0.6 }}>🌙</span>
                {[...Array(8)].map((_, i) => (
                  <div key={i} style={{
                    position: 'absolute', left: `${10 + i * 12}%`, top: `${8 + i * 8}%`,
                    width: 1.5, height: 1.5, borderRadius: '50%', background: 'white', opacity: 0.5,
                  }} />
                ))}
                <p style={{ color: 'white', fontSize: 14, fontWeight: 800, lineHeight: 1.3, position: 'relative', zIndex: 1 }}>
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

        {/* Sofie overlay — large state: image fills from bottom, text overlaid on speech bubble */}
        {girlLarge && (
          <div
            className="absolute inset-0 z-20 flex flex-col justify-end"
            style={{ background: 'rgba(13,11,43,0.72)' }}
          >
            {/* Image + text overlay container — anchored to bottom */}
            <div className="relative w-full">
              <img src={sofieImg} alt="Sofie" className="w-full block" draggable={false} />

              {/* Text overlaid on speech bubble */}
              <div
                style={{
                  position: 'absolute',
                  top: '4%', left: '43%', right: '7%', height: '22%',
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

              {/* Fortsæt button — within white bubble body */}
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

        {/* Sofie small — bottom left corner, tappable to expand */}
        {!girlLarge && (
          <button
            onClick={expandGirl}
            style={{
              position: 'absolute', bottom: 0, left: 0,
              background: 'none', border: 'none', outline: 'none',
              padding: 0, cursor: 'pointer', zIndex: 20,
            }}
          >
            <img
              src={sofieSmallImg}
              alt="Sofie"
              draggable={false}
              style={{ height: '15vh', width: 'auto', display: 'block' }}
            />
          </button>
        )}
      </div>
    </StarsWrapper>
  );
}
