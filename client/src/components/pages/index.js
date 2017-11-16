// Import 404 page
import Page404 from './NotFound';
// Import the pages
import Home from './Home';
import Login from './Login';
import ManageParty from './ManageParty';
import Recruit from './Recruit';
import Friends from './Friends';
import Options from './Options';
import MicroTransactions from './MicroTransactions';
import Adventure from './Adventure';

const Pages = Object.freeze({
  Home,
  Login,
  ManageParty,
  Recruit,
  Friends,
  Options,
  MicroTransactions,
  Adventure,
});

export const NotFound = Page404;
export default Pages;
