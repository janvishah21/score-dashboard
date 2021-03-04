import './App.css';
import { useState } from 'react';
import { ThemeProvider } from '@material-ui/core';
import CssBaseLine from '@material-ui/core/CssBaseline';
import Header from '../components/Header';
import Pagecontent from '../components/Pagecontent';
import Footer from '../components/Footer';
import { customTheme } from '../styles';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import PageNotFound from '../components/Pagenotfound';

function App() {

  const theme = customTheme;

  const [pageContentState, setPageContentState] = useState('home');

  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <ThemeProvider theme={theme}>
            <Header pageContentState={pageContentState} setPageContentState={setPageContentState} />
            <Pagecontent pageContentState={pageContentState} setPageContentState={setPageContentState} />
            <Footer />
            <CssBaseLine />
          </ThemeProvider>
        </Route>
        <Route path='*'>
          <PageNotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
