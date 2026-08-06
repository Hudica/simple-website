import { useEffect } from 'react';
import { startClimbEngine } from './climb.js';
import Mountain from './Mountain.jsx';
import Wildlife from './Wildlife.jsx';
import RouteRail from './RouteRail.jsx';
import Masthead from './Masthead.jsx';
import Trailhead from './Trailhead.jsx';
import BaseCamp from './BaseCamp.jsx';
import Approach from './Approach.jsx';
import Ridge from './Ridge.jsx';
import Summit from './Summit.jsx';
import './App.css';

function App() {
  useEffect(() => startClimbEngine(), []);

  return (
    <div className="app">
      <Mountain />
      <Wildlife />
      <Masthead />
      <RouteRail />

      <main className="route">
        <Trailhead />
        <BaseCamp />
        <Approach />
        <Ridge />
        <Summit />
      </main>
    </div>
  );
}

export default App;
