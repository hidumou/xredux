import xredux from 'xredux';
import { fetchRandomData } from 'services/api';

const { actions } = xredux;
const namespace = 'demo';

xredux.model({
  namespace,
  initialState: {
    randomData: null,
    getRandomDataStart: false,
    getRandomDataError: null,
  },
  reducers: {
  },
  effects: {
    async getRandomData() {
      let data = null;
      // Request start
      actions[namespace].setState({
        getRandomDataStart: true,
      });
      try {
        data = await fetchRandomData();
        // Request success
        actions[namespace].setState({
          getRandomDataStart: false,
          randomData: data,
        });
      } catch (e) {
        // Request error
        actions[namespace].setState({
          getRandomDataStart: false,
          getRandomDataError: e,
        });
      }
    },
  },
});
