import React from 'react';
import { AppProvider, useApp } from './AppContext.jsx';

import LoginScreen from './screens/LoginScreen.jsx';
import StartsideScreen from './screens/StartsideScreen.jsx';
import CharacterSelectScreen from './screens/CharacterSelectScreen.jsx';
import ChaptersScreen from './screens/ChaptersScreen.jsx';
import MapScreen from './screens/MapScreen.jsx';
import LessonScreen from './screens/LessonScreen.jsx';
import QuizScreen from './screens/QuizScreen.jsx';
import CompletionScreen from './screens/CompletionScreen.jsx';
import HjemScreen from './screens/HjemScreen.jsx';
import ScoreboardScreen from './screens/ScoreboardScreen.jsx';
import VennerScreen from './screens/VennerScreen.jsx';
import InviterScreen from './screens/InviterScreen.jsx';
import RequestsScreen from './screens/RequestsScreen.jsx';
import BadgesScreen from './screens/BadgesScreen.jsx';
import IndstillingerScreen from './screens/IndstillingerScreen.jsx';

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
    <div key={key} className="screen-enter w-full h-full">
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
