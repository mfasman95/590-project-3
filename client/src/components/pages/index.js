// Import 404 page
import Page404 from './NotFound';
// Import the pages
import Home from './Home';
import Login from './Login';
import ManageParty from './ManageParty';
import Upgrades from './Upgrades';
import Recruit from './Recruit';
import Friends from './Friends';
import Options from './Options';

const Pages = Object.freeze({
  Home,
  Login,
  ManageParty,
  Upgrades,
  Recruit,
  Friends,
  Options,
});

export const NotFound = Page404;
export default Pages;
