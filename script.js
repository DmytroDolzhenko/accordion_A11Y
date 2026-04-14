document.addEventListener('DOMContentLoaded', () => {
    const accordion = document.querySelector('#accordion-group');
    const buttons = Array.from(accordion.querySelectorAll('.accordion-trigger'));

    buttons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const isExpanded = button.getAttribute('aria-expanded') === 'true';
            const panelId = button.getAttribute('aria-controls');
            const panel = document.getElementById(panelId);

            button.setAttribute('aria-expanded', !isExpanded);
            if (isExpanded) {
                panel.setAttribute('hidden', '');
            } else {
                panel.removeAttribute('hidden');
            }
        });

        button.addEventListener('keydown', (event) => {
            let newIndex;

            switch (event.key) {
                case 'ArrowDown':
                    event.preventDefault();
                    newIndex = (index + 1) % buttons.length;
                    buttons[newIndex].focus();
                    break;
                case 'ArrowUp':
                    event.preventDefault();
                    newIndex = (index - 1 + buttons.length) % buttons.length;
                    buttons[newIndex].focus();
                    break;

                case 'Home':
                    event.preventDefault();
                    buttons[0].focus();
                    break;

                case 'End':
                    event.preventDefault();
                    buttons[buttons.length - 1].focus();
                    break;
            }
        });
    });
});