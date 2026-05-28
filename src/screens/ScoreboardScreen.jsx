import React from 'react';
import { useApp } from '../AppContext';
import { StarsWrapper, TopBar, BottomNav, C } from '../components/shared';
import { SCOREBOARD } from '../data';

export default function ScoreboardScreen() {
  const { state } = useApp();
  const userXp = state.points;

  const board = [
    ...SCOREBOARD.filter(p => !p.isUser),
    ...state.friendsList.filter(f => !SCOREBOARD.find(s => s.username === f.username)),
    { username: state.username, xp: userXp, isUser: true },
    ].sort((a, b) => b.xp - a.xp);

  return (
    <StarsWrapper>
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />

        <div className="scrollable flex-1 px-5 pt-1 pb-3">
          <h1 className="text-brand-accent text-4xl font-black font-fredoka mb-5">Scoreboard</h1>

          <div className="flex flex-col gap-2.5">
            {board.map((player, i) => (
              <div
                key={player.username}
                className="flex items-center justify-between rounded-2xl px-5 py-4"
                style={{
                  background: player.isUser ? C.accent : '#1A1848',
                  border: player.isUser ? 'none' : `1.5px solid ${C.accent}`,
                }}
              >
                <div className="flex items-center gap-3">
                  <span className={`text-sm font-black ${player.isUser ? 'text-brand-dark' : 'text-brand-sub'}`}>
                    #{i + 1}
                  </span>
                  <span className={`text-base font-extrabold ${player.isUser ? 'text-brand-dark' : 'text-white'}`}>
                    {player.username}
                  </span>
                </div>
                <span className={`text-sm font-bold ${player.isUser ? 'text-brand-dark' : 'text-brand-sub'}`}>
                  {player.xp}xp
                </span>
              </div>
            ))}
          </div>
        </div>

        <BottomNav active="scoreboard" />
      </div>
    </StarsWrapper>
  );
}
