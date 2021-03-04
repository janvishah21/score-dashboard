import './App.css';
import { useState } from 'react';
import { ThemeProvider } from '@material-ui/core';
import CssBaseLine from '@material-ui/core/CssBaseline';
import Header from '../components/Header';
import Pagecontent from '../components/Pagecontent';
import Footer from '../components/Footer';
import { customTheme } from '../styles';
import { Route } from 'react-router-dom';

function App() {

  const theme = customTheme;

  const [pageContentState, setPageContentState] = useState('home');

  return (
    // <Route exact path='/'>
      <ThemeProvider theme={theme}>
        <Header pageContentState={pageContentState} setPageContentState={setPageContentState} />
        <Pagecontent pageContentState={pageContentState} setPageContentState={setPageContentState} />
        <Footer />
        <CssBaseLine />
      </ThemeProvider>
    // </Route>
  );
}

export default App;
