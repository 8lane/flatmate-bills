
import mockFlatmates from '../mocks/flatmates'

const defaultState = {
  ...mockFlatmates
}

const flatmates = (state = defaultState, action) => {
  switch (action.type) {
    case 'XX':
      return state
    default:
      return state
  }
}

export default flatmates
