import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import { Reports, ReportsOne, ReportsTwo, ReportsThree } from './pages/Reports';
import { sourcing } from './pages/sourcing/sourcing';
import { sourcingconfig } from "./pages/sourcing/sourcingconfig";
import {sourcingnode} from "./pages/sourcing/sourcingnode";
import {Sourcingrules} from "./pages/sourcing/Sourcingrules";



function App() {
  return (
    <div className='maindev'>
    <Router>
      <Sidebar />
      <Switch>
        <Route path='/home' exact component={Home} />
        <Route path='/sourcing' exact component={sourcing} />
        <Route path='/sourcing/sourcingconfig' exact component={sourcingconfig} />
        <Route path='/sourcing/nodes' exact component={sourcingnode} />
        <Route path='/sourcing/rules' exact component={Sourcingrules } />
        <Route path='/reports/reports3' exact component={ReportsThree} />
      </Switch>
    </Router>
    </div>
  );
}

export default App;
