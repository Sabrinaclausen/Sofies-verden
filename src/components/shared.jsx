import React from 'react';
import { useApp } from '../AppContext';
import stjerneBaggrund from '../assets/stjerne-baggrund.png';
import avatarDog from '../assets/avatar-hund.png';
import avatarGingerbread from '../assets/avatar-gingerbread.png';
import avatarOwl from '../assets/avatar-owl.png';
import avatarCaveman from '../assets/avatar-caveman.png';
import avatarHorse from '../assets/avatar-hest.png';
import avatarCompass from '../assets/avatar-kompas.png';
import iconHome from '../assets/ikon-hus.png';
import iconGear from '../assets/ikon-indstillinger.png';
import iconProfil from '../assets/ikon-profil.png';
import mountainBg from '../assets/mountain-baggrund.png';

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
  const { navigate, state, updateState } = useApp();
  const handleRight = onRight || (() => navigate('hjem'));
  const RightIcon = rightIcon === 'gear'
    ? () => <GearIcon size={28} />
    : () => <PersonIcon size={28} />;

  return (
    <div className="flex items-center justify-between px-5 pt-3 pb-2 z-10 flex-shrink-0 relative">
      <button onClick={() => { updateState({ girlLarge: false }); navigate('chapters'); }} className="bg-transparent p-1">
        <HomeIcon size={28} />
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
    { id: 'hjem', label: 'Hjem', icon: (a) => <HouseIcon size={45} color={a ? '#1A1600' : '#F0EAFF'} /> },
    { id: 'scoreboard', label: 'Board', icon: (a) => <BarChartIcon size={45} color={a ? '#1A1600' : '#F0EAFF'} /> },
    { id: 'venner', label: 'Venner', icon: (a) => <PeopleIcon size={45} color={a ? '#1A1600' : '#F0EAFF'} /> },
  ];
  return (
    <div className="flex justify-around items-center px-4 pt-2 pb-4 flex-shrink-0 ">
      {items.map((item) => {
        const isActive = active === item.id;
        return (
          <button
            key={item.id}
            onClick={() => navigate(item.id)}
            className={`flex flex-col items-center gap-1 rounded-2xl px-5 py-2 my-8 min-w-[115px] transition-all ${
              isActive ? 'bg-brand-accent' : 'bg-white/[0.08]'
            }`}
            style={isActive ? {} : { border: '2px solid #F5C842' }}
          >
            {item.icon(isActive)}
            <span className={`text-base "Open sans" ${isActive ? 'text-brand-dark' : 'text-brand-sub'}`}>
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
    <div style={{ 
      position: 'relative', 
      width: '100%', 
      height: '100%', 
      backgroundImage: `url(${stjerneBaggrund})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      overflow: 'hidden', 
      ...style 
    }}>
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
  return (
    <div className="absolute inset-0 z-0">
      <img src={mountainBg} alt="" className="w-full h-full object-cover" />
    </div>
  );
}


export function CharacterEmoji({ id, size = 60 }) {
  const map = { 
    dog: avatarDog, 
    gingerbread: avatarGingerbread, 
    owl: avatarOwl, 
    caveboy: avatarCaveman, 
    horse: avatarHorse, 
    compass: avatarCompass 
  };
  return <img src={map[id] || avatarDog} alt={id} style={{ width: size, height: size, objectFit: 'contain' }} />;
}

export function HomeIcon({ size = 24 }) {
  return <img src={iconHome} alt="Hjem" style={{ width: size, height: size, objectFit: 'contain' }} />;
}

export function GearIcon({ size = 22 }) {
  return <img src={iconGear} alt="Indstillinger" style={{ width: size, height: size, objectFit: 'contain' }} />;
}

export function PersonIcon({ size = 22 }) {
  return <img src={iconProfil} alt="Profil" style={{ width: size, height: size, objectFit: 'contain' }} />;
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

export function HouseIcon({ size = 24, color = 'white' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M3 12L12 4L21 12V20C21 20.55 20.55 21 20 21H15V16H9V21H4C3.45 21 3 20.55 3 20V12Z"
            stroke={color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
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


export function SearchIcon({ size = 18, color = '#C4BFEF' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="7" stroke={color} strokeWidth="2" />
      <path d="M21 21l-4.35-4.35" stroke={color} strokeWidth="2" strokeLinecap="round" />
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
