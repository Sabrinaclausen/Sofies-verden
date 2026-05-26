import React from 'react';
import { AppProvider, useApp } from './AppContext';

import LoginScreen from './screens/LoginScreen';
import StartsideScreen from './screens/StartsideScreen';
import CharacterSelectScreen from './screens/CharacterSelectScreen';
import ChaptersScreen from './screens/ChaptersScreen';
import MapScreen from './screens/MapScreen';
import LessonScreen from './screens/LessonScreen';
import QuizScreen from './screens/QuizScreen';
import CompletionScreen from './screens/CompletionScreen';
import HjemScreen from './screens/HjemScreen';
import ScoreboardScreen from './screens/ScoreboardScreen';
import VennerScreen from './screens/VennerScreen';
import InviterScreen from './screens/InviterScreen';
import RequestsScreen from './screens/RequestsScreen';
import BadgesScreen from './screens/BadgesScreen';
import IndstillingerScreen from './screens/IndstillingerScreen';

const SCREENS = {
  login: LoginScreen,
  startside: StartsideScreen,
  characterselect: CharacterSelectScreen,
  chapters: ChaptersScreen,
  map: MapScreen,
  lesson: LessonScreen,
  quiz: QuizScreen,
  completion: CompletionScreen,
  hjem: HjemScreen,
  scoreboard: ScoreboardScreen,
  venner: VennerScreen,
  inviter: InviterScreen,
  requests: RequestsScreen,
  badges: BadgesScreen,
  settings: IndstillingerScreen,
};

function Router() {
  const { state } = useApp();
  const Screen = SCREENS[state.currentScreen] || HjemScreen;
  const key = ['lesson', 'quiz'].includes(state.currentScreen)
    ? `${state.currentScreen}-${state.currentStep}`
    : state.currentScreen;
  return (
    <div key={key} className="screen-enter" style={{ width: '100%', height: '100%' }}>
      <Screen />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Router />
    </AppProvider>
  );
}
