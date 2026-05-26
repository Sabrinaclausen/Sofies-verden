import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext(null);

const initialState = {
  username: 'TurboEmil42',
  points: 0,
  badges: 0,
  friendRequests: 3,
  selectedCharacter: 'dog',
  currentScreen: 'login',
  currentStep: 0,
  nodeResults: {},
  quizCompleted: false,
  sessionCorrectAnswers: 0,
  characterSelected: false,
  characterSelectOrigin: 'startside',
  mapQuizMode: false,
  friendsList: [
    { username: 'CoolDragon99', xp: 200, emoji: '🐱' },
    { username: 'NinjaKat2014', xp: 280, emoji: '🐶' },
    { username: 'ProGamer_Luca', xp: 280, emoji: '🦊' },
    { username: 'xXDarkWolfXx', xp: 360, emoji: '🐺' },
  ],
  friendRequestsList: [
    { username: 'PizzaLover_Max', emoji: '🐶' },
    { username: 'LegendaryHero77', emoji: '🐶' },
    { username: 'SkateKing_Noah', emoji: '🐶' },
  ],
};

export function AppProvider({ children }) {
  const [state, setState] = useState(initialState);

  const navigate = (screen) =>
    setState((s) => ({ ...s, currentScreen: screen }));

  const openCharacterSelect = (origin) =>
    setState((s) => ({ ...s, characterSelectOrigin: origin, currentScreen: 'characterselect' }));

  const updateState = (updates) =>
    setState((s) => ({ ...s, ...updates }));

  const resetLesson = () =>
    setState((s) => ({
      ...s,
      currentStep: 0,
      quizCompleted: false,
      sessionCorrectAnswers: 0,
    }));

  return (
    <AppContext.Provider value={{ state, navigate, updateState, resetLesson, openCharacterSelect }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be inside AppProvider');
  return ctx;
}
