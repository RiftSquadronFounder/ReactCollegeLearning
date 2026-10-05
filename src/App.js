import Links from './components/Links';
import LinkToLesson from './components/LinkToLesson';
import PathsList from './components/PathsList';
import { HashRouter } from 'react-router';

function App() {
  return (
    <HashRouter>
      <Links />
      <LinkToLesson />
      <PathsList />
    </HashRouter>
  );
}

export default App;
