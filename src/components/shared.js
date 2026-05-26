import React from 'react';
import { useApp } from '../AppContext';

export const C = {
  bg: '#0D0B2B',
  card: '#2D2A6E',
  accent: '#F5C842',
  green: '#22C55E',
  text: '#FFFFFF',
  sub: '#C4BFEF',
  navActive: '#F5C842',
  btnInactive: '#C4BFEF',
};

export function TopBar({ rightIcon, onRight }) {
  const { navigate, state } = useApp();
  const handleRight = onRight || (() => navigate('hjem'));
  const RightIcon = rightIcon === 'gear'
    ? () => <GearIcon size={22} color="white" />
    : () => <PersonIcon size={22} color="white" />;
  return (
    <div className="flex items-center justify-between px-5 pt-3 pb-2 z-10 flex-shrink-0 relative">
      <button onClick={() => navigate('chapters')} className="bg-transparent p-1">
        <HouseIcon size={24} color="white" />
      </button>
      <span className="text-brand-accent font-extrabold text-sm tracking-wide">{state.username}</span>
      <button onClick={handleRight} className="bg-transparent p-1">
        <RightIcon />
      </button>
    </div>
  );
}

export function BottomNav({ active }) {
  const { navigate } = useApp();
  const items = [
    { id: 'hjem', label: 'Hjem', icon: (a) => <HouseIcon size={26} color={a ? '#1A1600' : 'white'} /> },
    { id: 'scoreboard', label: 'Board', icon: (a) => <BarChartIcon size={26} color={a ? '#1A1600' : 'white'} /> },
    { id: 'venner', label: 'Venner', icon: (a) => <PeopleIcon size={26} color={a ? '#1A1600' : 'white'} /> },
  ];
  return (
    <div className="flex justify-around items-center px-4 pt-2 pb-4 bg-brand-bg flex-shrink-0 border-t border-white/5">
      {items.map((item) => {
        const isActive = active === item.id;
        return (
          <button
            key={item.id}
            onClick={() => navigate(item.id)}
            className={`flex flex-col items-center gap-1 rounded-2xl px-5 py-2 min-w-[90px] transition-all ${
              isActive
                ? 'bg-brand-accent border-0'
                : 'bg-white/[0.08] border border-white/10'
            }`}
          >
            {item.icon(isActive)}
            <span className={`text-xs font-bold ${isActive ? 'text-brand-dark' : 'text-brand-sub'}`}>
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function StarsWrapper({ children, style }) {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', background: C.bg, overflow: 'hidden', ...style }}>
      <StarField />
      <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column' }}>
        {children}
      </div>
    </div>
  );
}

function StarField() {
  const stars = [
    [45,8],[88,15],[130,5],[178,20],[215,9],[258,16],[302,7],[348,22],[392,11],[420,18],
    [22,32],[67,38],[112,28],[155,44],[198,35],[242,40],[285,30],[330,46],[375,36],[418,42],
    [10,58],[55,65],[98,52],[140,70],[183,60],[225,68],[268,55],[310,72],[355,62],[400,68],
    [35,85],[80,92],[125,80],[168,96],[210,88],[252,94],[295,82],[338,98],[382,86],[415,92],
    [18,112],[60,118],[103,108],[148,124],[190,115],[235,122],[278,110],[322,126],[366,116],[408,122],
    [28,140],[72,148],[116,136],[160,152],[204,142],[248,150],[292,138],[336,154],[380,144],[412,150],
    [8,168],[52,176],[96,164],[142,180],[186,170],[230,178],[274,166],[318,182],[362,172],[405,178],
    [42,198],[86,206],[130,194],[174,210],[218,200],[262,208],[306,196],[350,212],[394,202],[418,208],
  ];
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      {stars.map(([x, y], i) => (
        <div key={i} style={{
          position: 'absolute',
          left: `${(x / 430) * 100}%`,
          top: y,
          width: i % 5 === 0 ? 2 : i % 3 === 0 ? 1.5 : 1,
          height: i % 5 === 0 ? 2 : i % 3 === 0 ? 1.5 : 1,
          borderRadius: '50%',
          background: 'white',
          opacity: 0.4 + (i % 5) * 0.12,
        }} />
      ))}
    </div>
  );
}

export function MountainScene({ fullscreen = false }) {
  const svgContent = (
    <svg viewBox="0 0 430 260" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="mSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#080618" />
          <stop offset="60%" stopColor="#12103A" />
          <stop offset="100%" stopColor="#1E1854" />
        </linearGradient>
      </defs>
      <rect width="430" height="260" fill="url(#mSky)" />
      {[[30,18],[75,10],[120,22],[165,8],[210,16],[255,24],[300,12],[345,20],[390,8],[420,16],
        [15,35],[58,42],[100,30],[148,46],[192,38],[238,44],[282,32],[326,48],[368,36],[410,42],
        [42,58],[88,64],[135,52],[180,68],[222,60],[265,66],[308,54],[352,70],[395,58]].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r={i%4===0?1.2:0.7} fill="white" opacity={0.3+i%4*0.12} />
      ))}
      <line x1="298" y1="22" x2="325" y2="40" stroke="white" strokeWidth="1" opacity="0.75" strokeLinecap="round"/>
      <circle cx="218" cy="56" r="28" fill="#E8DFC5" />
      <circle cx="233" cy="48" r="24" fill="#09071A" />
      <path d="M0 260 L0 155 L45 108 L85 135 L130 88 L175 122 L218 78 L262 115 L305 82 L348 112 L390 88 L430 105 L430 260 Z" fill="#16103A" />
      <path d="M0 260 L0 195 L28 172 L55 188 L82 158 L112 178 L140 148 L168 172 L196 142 L224 168 L252 138 L280 162 L308 148 L336 170 L364 152 L392 168 L420 155 L430 158 L430 260 Z" fill="#3A1508" />
      <path d="M0 260 L0 212 L22 198 L48 208 L72 192 L98 205 L124 186 L150 200 L175 182 L200 196 L226 178 L252 194 L278 180 L304 196 L330 184 L356 198 L382 186 L408 200 L430 192 L430 260 Z" fill="#2D1006" />
      <polygon points="0,260 16,188 32,260" fill="#150802" />
      <polygon points="12,260 28,178 44,260" fill="#180A03" />
      <polygon points="24,260 42,170 60,260" fill="#120701" />
      <polygon points="38,260 56,182 74,260" fill="#1A0B03" />
      <polygon points="52,260 68,172 84,260" fill="#150802" />
      <polygon points="64,260 80,185 96,260" fill="#120701" />
      <polygon points="76,260 90,195 104,260" fill="#1A0B03" />
      <polygon points="326,260 342,192 358,260" fill="#150802" />
      <polygon points="340,260 356,178 372,260" fill="#180A03" />
      <polygon points="354,260 370,168 386,260" fill="#120701" />
      <polygon points="368,260 384,180 400,260" fill="#1A0B03" />
      <polygon points="382,260 398,172 414,260" fill="#150802" />
      <polygon points="396,260 412,182 428,260" fill="#1A0B03" />
      <polygon points="410,260 430,176 430,260" fill="#120701" />
      <path d="M0 242 Q60 235 120 240 Q180 245 215 238 Q260 232 330 238 Q385 242 430 236 L430 260 L0 260 Z" fill="#0D0820" />
      <ellipse cx="30" cy="255" rx="25" ry="12" fill="#1A0C20" />
      <ellipse cx="400" cy="253" rx="28" ry="11" fill="#1A0C20" />
      <ellipse cx="185" cy="258" rx="18" ry="8" fill="#130A18" />
    </svg>
  );

  if (fullscreen) {
    return (
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        {svgContent}
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height: '35vh', flexShrink: 0, overflow: 'hidden', position: 'relative' }}>
      {svgContent}
    </div>
  );
}

export function CharacterEmoji({ id, size = 60 }) {
  const map = { dog: '🐶', gingerbread: '🍪', owl: '🦉', caveboy: '🧒', unicorn: '🦄', compass: '🧭' };
  return <span style={{ fontSize: size, lineHeight: 1 }}>{map[id] || '🐶'}</span>;
}

export function HouseIcon({ size = 24, color = 'white' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M3 12L12 4L21 12V20C21 20.55 20.55 21 20 21H15V16H9V21H4C3.45 21 3 20.55 3 20V12Z"
            stroke={color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

export function GearIcon({ size = 22, color = 'white' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="2" />
      <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
            stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function PersonIcon({ size = 22, color = 'white' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="4" stroke={color} strokeWidth="2" />
      <path d="M4 20c0-4 3.58-7 8-7s8 3 8 7" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function BarChartIcon({ size = 26, color = 'white' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="12" width="4" height="9" rx="1" stroke={color} strokeWidth="2" />
      <rect x="10" y="7" width="4" height="14" rx="1" stroke={color} strokeWidth="2" />
      <rect x="17" y="3" width="4" height="18" rx="1" stroke={color} strokeWidth="2" />
    </svg>
  );
}

export function PeopleIcon({ size = 26, color = 'white' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="9" cy="8" r="3" stroke={color} strokeWidth="2" />
      <path d="M2 19c0-3.31 3.13-6 7-6s7 2.69 7 6" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <circle cx="18" cy="8" r="2.5" stroke={color} strokeWidth="1.8" />
      <path d="M22 19c0-2.76-1.79-5-4-5" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function PencilIcon({ size = 16, color = 'white' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SearchIcon({ size = 18, color = '#C4BFEF' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="7" stroke={color} strokeWidth="2" />
      <path d="M21 21l-4.35-4.35" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
