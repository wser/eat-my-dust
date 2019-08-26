import Scene, { mountScene } from './Scene';
import { showElement, hideElement, $ } from '../utils';
import data from '../data';

let selectedStory = 0;

class StoryPickerScene extends Scene {
  constructor(options) {
    super('story', options);
  }

  mount() {
    showElement($('#div-story-picker'));

    const container = $('#story-list');

    data.forEach((d, i) => {
      const elem = createElement(d, i);
      container.appendChild(elem);
    });

    this.keyHandler = handleKeys({
      onKeyUp: () => {
        selectedStory--;

        if (selectedStory < 0) selectedStory = data.length - 1;

        this.updateStoryList();
      },
      onKeyDown: () => {
        selectedStory++;

        if (selectedStory >= data.length) selectedStory = 0;

        this.updateStoryList();
      },
      onKeyEnter: () => {
        this.selectStory();
      }
    });

    window.addEventListener('keydown', this.keyHandler);
  }

  updateStoryList() {
    const container = $('#story-list');
    const stories = container.childNodes;

    stories.forEach((s, i) => {
      i === selectedStory
        ? s.classList.add('selected')
        : s.classList.remove('selected');
    });
  }

  selectStory() {
    mountScene('game', {
      story: data[selectedStory]
    });
  }

  unmount() {
    hideElement($('#div-story-picker'));

    window.removeEventListener('keydown', this.keyHandler);
  }
}

const createElement = (data, index) => {
  const li = document.createElement('li');
  li.classList.add('story');
  li.innerHTML = `${index + 1}. ${data.title}`;

  if (index === 0) li.classList.add('selected');

  return li;
};

const handleKeys = ({ onKeyUp, onKeyDown, onKeyEnter }) => e => {
  switch (e.key) {
    case 'ArrowUp':
      onKeyUp();
      break;
    case 'ArrowDown':
      onKeyDown();
      break;
    case 'Enter':
      onKeyEnter();
      break;
  }
};

export default StoryPickerScene;
