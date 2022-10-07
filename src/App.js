import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { AuthProvider } from './context/AuthContext';

import AppRoutes from 'routes/Routes';

const browserHistory = createBrowserHistory();

function App() {
  return (
    <>
      <Router history={browserHistory}>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </Router>
      {/* <WalletDashboard /> */}
    </>
  );
}

export default App;
