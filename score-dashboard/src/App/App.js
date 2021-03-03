import './App.css';
import { ThemeProvider } from '@material-ui/core';
import CssBaseLine from '@material-ui/core/CssBaseline';
import Header from '../components/Header';
import Pagecontent from '../components/Pagecontent';
import Footer from '../components/Footer';
import Sidemenu from '../components/Sidemenu';
import { customTheme } from '../styles';



function App() {

  const theme = customTheme;

  return (
    <ThemeProvider theme={theme}>
      <Header />
      {/* <Sidemenu /> */}
      <Pagecontent />
      <Footer />
      <CssBaseLine />
    </ThemeProvider>
  );
}

export default App;
