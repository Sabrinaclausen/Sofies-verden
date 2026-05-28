import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../AppContext';
import { MountainScene, TopBar, C } from '../components/shared';
import { LESSON_LEVELS } from '../data';
import profileImg from '../assets/messenger-profilbillede.png';

export default function LessonScreen() {
  const { state, navigate } = useApp();
  const step = LESSON_LEVELS[state.currentStep] || LESSON_LEVELS[0];
  const totalSteps = LESSON_LEVELS.length;
  const pct = step.progressPercent;

  const [visibleCount, setVisibleCount] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [typingDone, setTypingDone] = useState(false);
  const [skipped, setSkipped] = useState(false);
  const intervalRef = useRef(null);
  const advanceRef = useRef(null);

  const isLastBubble = visibleCount === step.bubbles.length - 1;
  const allDone = typingDone && isLastBubble;

  // Reset when lesson step changes
  useEffect(() => {
    setSkipped(false);
    setVisibleCount(0);
  }, [state.currentStep]);

  // Typewriter — reruns when bubble index, skip state, or step changes
  useEffect(() => {
    setTypedText('');
    setTypingDone(false);
    clearInterval(intervalRef.current);
    clearTimeout(advanceRef.current);

    if (skipped) {
      const lastBubble = step.bubbles[step.bubbles.length - 1];
      setTypedText(lastBubble);
      setTypingDone(true);
      return;
    }

    const bubble = step.bubbles[visibleCount] || '';
    let i = 0;
    intervalRef.current = setInterval(() => {
      i++;
      setTypedText(bubble.slice(0, i));
      if (i >= bubble.length) {
        clearInterval(intervalRef.current);
        setTypingDone(true);
      }
    }, 22);

    return () => {
      clearInterval(intervalRef.current);
      clearTimeout(advanceRef.current);
    };
  }, [visibleCount, skipped, state.currentStep]);

  // Auto-advance to next bubble
  useEffect(() => {
    if (typingDone && !isLastBubble && !skipped) {
      advanceRef.current = setTimeout(() => setVisibleCount(v => v + 1), 500);
      return () => clearTimeout(advanceRef.current);
    }
  }, [typingDone, isLastBubble, skipped]);

  const handleSkip = () => {
    clearInterval(intervalRef.current);
    clearTimeout(advanceRef.current);
    setSkipped(true);
    setVisibleCount(step.bubbles.length - 1);
  };

  return (
  <div className="w-full h-full relative overflow-hidden">

    {/* Baggrundsbillede */}
    <MountainScene />

    {/* Mørkt overlay */}
    <div className="absolute inset-0 z-[1] bg-[rgba(8,6,26,0.55)]" />

    {/* Alt indhold ovenpå */}
    <div className="absolute inset-0 z-10 flex flex-col">
      
      <TopBar />

      {/* Progress bar */}
      <div className="flex items-center gap-2 px-4 pb-2 flex-shrink-0">
        <span className="text-brand-sub text-xs font-opensans font-bold whitespace-nowrap min-w-[44px]">
          {step.level} af {totalSteps}
        </span>
        <div className="flex-1 h-1.5 bg-white/10 rounded-full">
          <div
            className="h-full bg-[#6C63FF] rounded-full transition-all duration-500"
            style={{ width: `${Math.max(pct, 4)}%` }}
          />
        </div>
        <span className="text-brand-sub text-xs font-opensans font-bold whitespace-nowrap min-w-[38px] text-right">
          {pct}%
        </span>
      </div>

      {/* Chat area */}
      <div className="flex-1 relative overflow-hidden px-5 pt-4 pb-2">

        {/* Avatar — fast position */}
        <img
          src={profileImg}
          alt="Sofie"
          draggable={false}
          className="absolute bottom-2 left-5 w-10 h-10 rounded-full object-cover z-10"
        />

        {/* Bobler — pinned til bund */}
        <div className="h-full flex flex-col justify-end gap-3 pl-[52px]">

          {/* Færdige bobler */}
          {step.bubbles.slice(0, visibleCount).map((text, i) => (
            <div
              key={i}
              className="bg-brand-card rounded-2xl text-white text-base font-opensans leading-relaxed px-4 py-3"
              style={{ wordBreak: 'break-word' }}
            >
              {text}
            </div>
          ))}

          {/* Aktiv boble */}
          <div
            key={visibleCount}
            className="bg-brand-card rounded-2xl text-white text-base font-opensans leading-relaxed"
            style={{
              display: 'grid',
              animation: 'bubbleSlideUp 0.35s ease both',
              wordBreak: 'break-word',
            }}
          >
            <span className="px-4 py-3 invisible" style={{ gridArea: '1/1' }}>
              {step.bubbles[visibleCount]}
            </span>
            <span className="px-4 py-3" style={{ gridArea: '1/1' }}>
              {typedText}
              {!typingDone && <span className="opacity-40">|</span>}
            </span>
          </div>
        </div>
      </div>

      {/* Skip / Til quiz knap */}
      <div className="flex items-center justify-end px-5 pt-2 pb-5 flex-shrink-0 min-h-[72px]">
        {!allDone ? (
          <button
            onClick={handleSkip}
            className="bg-transparent border-none outline-none py-3 text-[19px] font-opensans text-brand-sub"
          >
            Skip →
          </button>
        ) : (
          <button
            onClick={() => navigate('quiz')}
            className="py-3 px-7 rounded-full text-lg font-black font-opensans text-brand-dark"
            style={{ background: C.accent, boxShadow: '0 4px 14px rgba(245,200,66,0.4)' }}
          >
            Næste →
          </button>
        )}
      </div>

    </div>
  </div>
);
}
