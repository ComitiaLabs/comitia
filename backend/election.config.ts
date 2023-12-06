import { createConfig } from './utils/helpers';

export default createConfig({
  options: {
    name: 'test',
    description: 'test',
    candidates: [
      { name: 'John Doe', images: [], id: '1' },
      { name: 'Jane Doe', images: [], id: '2' }
    ],
    metadata: {
      images: [],
      info: 'Presidential elections'
    }
  },
  metadata: {
    images: [],
    info: 'These are the election options for the test election.'
  },
  params: {
    vcCompare: 'test'
  }
});
