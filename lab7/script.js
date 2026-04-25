const tabs = document.querySelectorAll('[role="tab"]');
const tabPanels = document.querySelectorAll('[role="tabpanel"]');

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => activateTab(index));

  tab.addEventListener('keydown', (e) => {
    let newIndex = index;

    if (e.key === 'ArrowRight') {
      newIndex = (index + 1) % tabs.length;
    } else if (e.key === 'ArrowLeft') {
      newIndex = (index - 1 + tabs.length) % tabs.length;
    } else if (e.key === 'Home') {
      newIndex = 0;
    } else if (e.key === 'End') {
      newIndex = tabs.length - 1;
    } else {
      return;
    }

    e.preventDefault();
    tabs[newIndex].focus();
    activateTab(newIndex);
  });
});

function activateTab(index) {
  tabs.forEach((t, i) => {
    t.setAttribute('aria-selected', i === index ? 'true' : 'false');
    t.setAttribute('tabindex', i === index ? '0' : '-1');
  });

  tabPanels.forEach(panel => panel.hidden = true);

  const controls = tabs[index].getAttribute('aria-controls');
  const selectedPanel = document.getElementById(controls);

  if (selectedPanel) {
    selectedPanel.hidden = false;
  }
}

tabs.forEach((tab, i) => {
  tab.setAttribute('tabindex', i === 0 ? '0' : '-1');
});