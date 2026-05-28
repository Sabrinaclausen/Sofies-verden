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
  bg: '#17143A',
  card: '#2D1F6E',
  accent: '#F5C842',
  green: '#22C55E',
  sub: '#F0EAFF',
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
      <span className="text-brand-accent font-fredoka text-base tracking-wide">{state.username}</span>
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
    <div className="flex justify-around items-center px-4 pt-2 pb-4 flex-shrink-0">
      {items.map((item) => {
        const isActive = active === item.id;
        return (
          <button
            key={item.id}
            onClick={() => navigate(item.id)}
            className={`flex flex-col items-center gap-1 rounded-2xl px-5 py-2 mb-8 min-w-[115px] transition-all ${
              isActive ? 'bg-brand-accent' : 'bg-[#17143A]'
            }`}
            style={isActive ? {} : { border: '2px solid #F5C842' }}
          >
            {item.icon(isActive)}
            <span className={`text-base font-opensans ${isActive ? 'text-brand-dark' : 'text-brand-sub'}`}>
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
    <div
      className="relative w-full h-full overflow-hidden"
      style={{
        backgroundImage: `url(${stjerneBaggrund})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        ...style
      }}
    >
      <div className="relative z-[1] h-full flex flex-col overflow-hidden ">
        {children}
      </div>
    </div>
  );
}

export function MountainScene() {
  return (
    <div className="absolute inset-0 z-0">
      <img src={mountainBg} alt="bjerg" className="w-full h-full object-cover" />
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

export function BarChartIcon({ size = 26, color = '#F0EAFF' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 49 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fill={color}
        d="M2.70833 40.625H15.3644V18.9583H2.70833V40.625ZM18.0727 40.625H30.6773V2.70833H18.0727V40.625ZM33.3856 40.625H46.0417V24.375H33.3856V40.625ZM0 38.9567V20.6267C0 19.4224 0.428819 18.3923 1.28646 17.5365C2.1441 16.6806 3.17326 16.2518 4.37396 16.25H15.3644V4.37667C15.3644 3.17236 15.7932 2.14229 16.6508 1.28646C17.5085 0.430625 18.5376 0.00180556 19.7383 0H29.0117C30.2142 0 31.2433 0.428819 32.0992 1.28646C32.955 2.1441 33.3838 3.17326 33.3856 4.37396V21.6667H44.376C45.5785 21.6667 46.6077 22.0955 47.4635 22.9531C48.3194 23.8108 48.7482 24.8399 48.75 26.0406V38.9594C48.75 40.1619 48.3212 41.191 47.4635 42.0469C46.6059 42.9027 45.5767 43.3315 44.376 43.3333H4.37396C3.17146 43.3333 2.14229 42.9045 1.28646 42.0469C0.430625 41.1892 0.00180556 40.161 0 38.9621"
      />
    </svg>
  );
}

export function HouseIcon({ size = 24, color = '#F0EAFF' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fill={color}
        d="M32.5,10.23c-1.06,0-1.98.31-2.79.93h0s-16.25,12.19-16.25,12.19h0c-.58.43-1.03.97-1.37,1.63-.33.66-.5,1.36-.49,2.1v24.38c0,1.29.45,2.37,1.37,3.3.92.92,2.01,1.37,3.29,1.37h10.83c.58,0,1.03-.19,1.4-.56.33-.33.51-.71.55-1.19v-.21s0-14.29,0-14.29h6.92v14.29c0,.58.19,1.03.56,1.4.37.37.82.56,1.4.56h10.83c1.29,0,2.37-.45,3.29-1.37.86-.86,1.31-1.87,1.37-3.06v-.24s0-24.37,0-24.37c0-.74-.16-1.44-.5-2.1-.33-.66-.79-1.2-1.36-1.63h0s-16.25-12.19-16.25-12.19h0c-.81-.62-1.74-.93-2.8-.93ZM15.5,26.71l17-12.75.45.34,16.25,12.19.3.23v25.5h-9.62v-14.29c0-.58-.19-1.03-.56-1.4-.33-.33-.71-.51-1.19-.55h-.21s-10.83,0-10.83,0c-.58,0-1.03.19-1.4.56-.37.37-.56.82-.56,1.4v14.29h-9.62v-25.5Z"
      />
    </svg>
  );
}

export function PeopleIcon({ size = 26, color = '#F0EAFF' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 61 37" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fill={color}
        d="M44.69.5c6.43,0,11.69,5.26,11.69,11.69,0,1.84-.44,3.65-1.27,5.29-.84,1.64-2.05,3.06-3.54,4.14l-.67.49.74.37c5.05,2.51,8.6,7.63,8.79,13.59h-3.06c-.26-6.79-5.82-12.19-12.68-12.19s-12.42,5.39-12.68,12.19h-3.08c-.26-6.79-5.82-12.19-12.68-12.19s-12.42,5.39-12.68,12.19H.51c.19-5.96,3.74-11.08,8.79-13.59l.74-.37-.66-.49c-2.91-2.13-4.81-5.57-4.81-9.44C4.56,5.76,9.82.5,16.25.5s11.69,5.26,11.69,11.69c0,1.84-.44,3.65-1.27,5.29-.84,1.64-2.05,3.06-3.54,4.14l-.67.49.74.37c2.88,1.41,5.26,3.67,6.83,6.46l.44.77.44-.77c1.57-2.79,3.95-5.05,6.83-6.46l.74-.36-.67-.49c-2.91-2.13-4.81-5.57-4.81-9.44,0-6.43,5.26-11.69,11.69-11.69ZM16.25,3.56c-4.79,0-8.62,3.83-8.62,8.62s3.83,8.62,8.62,8.62,8.62-3.83,8.62-8.62-3.83-8.62-8.62-8.62ZM44.69,3.56c-4.79,0-8.62,3.83-8.62,8.62s3.83,8.62,8.62,8.62,8.62-3.83,8.62-8.62-3.83-8.62-8.62-8.62Z"
      />
    </svg>
  );
}


export function SearchIcon({ size = 18, color = '#F0EAFF' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="7" stroke={color} strokeWidth="2" />
      <path d="M21 21l-4.35-4.35" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function PencilIcon({ size = 16, color = '#F0EAFF' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
