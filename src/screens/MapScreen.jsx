import React from 'react';
import { useApp } from '../AppContext';
import { TopBar } from '../components/shared';
import mapBg    from '../assets/spil-map.png';
import levelEt   from '../assets/level-et.png';
import levelTo   from '../assets/level-to.png';
import levelTre  from '../assets/level-tre.png';
import levelFire from '../assets/level-fire.png';
import levelFem  from '../assets/level-fem.png';
import levelSeks from '../assets/level-seks.png';
import levelSyv  from '../assets/level-syv.png';

const LEVEL_IMAGES = [levelEt, levelTo, levelTre, levelFire, levelFem, levelSeks, levelSyv];

const NODES = [
  { n: 1, cx: 242, cy: 105 },
  { n: 2, cx: 270, cy: 148 },
  { n: 3, cx: 178, cy: 195 },
  { n: 4, cx: 268, cy: 248 },
  { n: 5, cx: 175, cy: 308 },
  { n: 6, cx: 245, cy: 368 },
  { n: 7, cx: 210, cy: 440 },
];

const NODE_W = 64;
const NODE_H = 44;

export default function MapScreen() {
  const { navigate, updateState, state } = useApp();
  const { nodeResults } = state;

  const goToNode = (stepIdx) => {
    updateState({ currentStep: stepIdx, mapQuizMode: true });
    navigate('quiz');
  };

  const handleStart = () => {
    updateState({ currentStep: 0, mapQuizMode: false });
    navigate('lesson');
  };

  return (
    <div className="w-full h-full relative overflow-hidden">

      {/* Full-screen map background */}
      <img
        src={mapBg}
        alt=""
        draggable={false}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
      />

      {/* Top bar — identical to chapters screen */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10 }}>
        <TopBar />
      </div>

      {/* SVG overlay — nodes only */}
      <svg
        viewBox="0 0 430 580"
        width="100%"
        height="calc(100% - 80px)"
        style={{ display: 'block', position: 'absolute', top: 0, left: 0, zIndex: 1 }}
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Clip paths for rounded node images */}
        <defs>
          {NODES.map(({ n, cx, cy }) => (
            <clipPath key={n} id={`lvlClip${n}`}>
              <rect x={cx - NODE_W / 2} y={cy - NODE_H / 2} width={NODE_W} height={NODE_H} rx="8" />
            </clipPath>
          ))}
        </defs>

        {/* Nodes */}
        {NODES.map(({ n, cx, cy }) => {
          const stepIdx = n - 1;
          const result = nodeResults[stepIdx];
          const hasResult = result !== undefined;
          const isCorrect = result === true;
          const x = cx - NODE_W / 2;
          const y = cy - NODE_H / 2;
          return (
            <g key={n} onClick={() => goToNode(stepIdx)} style={{ cursor: 'pointer' }}>
              {/* Level image, clipped to rounded rect */}
              <image
                href={LEVEL_IMAGES[stepIdx]}
                x={x} y={y}
                width={NODE_W} height={NODE_H}
                preserveAspectRatio="xMidYMid slice"
                clipPath={`url(#lvlClip${n})`}
              />


              {/* Result indicator below the node */}
              {hasResult && (
                <text
                  x={cx} y={y + NODE_H + 13}
                  textAnchor="middle" dominantBaseline="middle"
                  fill={isCorrect ? '#22C55E' : '#EF4444'}
                  fontSize="14" fontWeight="900" fontFamily="Nunito, sans-serif"
                >
                  {isCorrect ? '✓' : '✗'}
                </text>
              )}

              {/* Expanded hit area */}
              <rect x={x - 6} y={y - 6} width={NODE_W + 12} height={NODE_H + 12} fill="transparent" />
            </g>
          );
        })}

      </svg>

      {/* Start button */}
      <div
        className="absolute bottom-0 left-0 right-0 px-8 pt-3 pb-6"
        style={{ background: 'linear-gradient(to top, rgba(8,6,26,0.9) 70%, transparent)', zIndex: 2 }}
      >
        <button
          onClick={handleStart}
          className="w-full py-[18px] rounded-full text-xl font-black text-[#0A2010]"
          style={{ background: '#4ADE80', boxShadow: '0 4px 20px rgba(74,222,128,0.5)' }}
        >
          Start
        </button>
      </div>
    </div>
  );
}
