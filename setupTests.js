import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

window.moment = require('moment')

Enzyme.configure({ adapter: new Adapter() });