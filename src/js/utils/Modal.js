export default class Modal {

    initialize(data) {
        const triggers = document.querySelectorAll('[aria-haspopup="dialog"]');
        const profil = document.querySelector('#profil');
        const focusableElementsArray = [
            '[href]',
            'button:not([disabled])',
            'input:not([disabled])',
            'select:not([disabled])',
            'textarea:not([disabled])',
            '[tabindex]:not([tabindex="-1"])',
        ];
        const keyCodes = {
            tab: 9,
            enter: 13,
            escape: 27,
        };

        const open = function (dialog) {
            const focusableElements = dialog.querySelectorAll(focusableElementsArray);
            const firstFocusableElement = focusableElements[0];
            const lastFocusableElement = focusableElements[focusableElements.length - 1];

            dialog.setAttribute('aria-hidden', false);
            dialog.style.display = 'block';
            profil.setAttribute('aria-hidden', true);

            // return if no focusable element
            if (!firstFocusableElement) {
                return;
            }

            window.setTimeout(() => {
                firstFocusableElement.focus();

                // trapping focus inside the dialog
                focusableElements.forEach((focusableElement) => {
                    if (focusableElement.addEventListener) {
                        focusableElement.addEventListener('keydown', (event) => {
                            const tab = event.which === keyCodes.tab;

                            if (!tab) {
                                return;
                            }
                            if (event.shiftKey) {
                                if (event.target === firstFocusableElement) { // shift + tab
                                    event.preventDefault();

                                    lastFocusableElement.focus();
                                }
                            } else if (event.target === lastFocusableElement) { // tab
                                event.preventDefault();

                                firstFocusableElement.focus();
                            }
                        });
                    }
                });
            }, 100);
        };

        const close = function (dialog, trigger) {
            dialog.setAttribute('aria-hidden', true);
            dialog.style.display = 'none';
            profil.setAttribute('aria-hidden', false);

            // restoring focus
            trigger.focus();
        };

        triggers.forEach((trigger) => {
            const dialog = document.getElementById(trigger.getAttribute('aria-controls'));
            const closeBtn = document.getElementById('close-form');
            const dismissTriggers = dialog.querySelectorAll('[data-dismiss]');
            this.getPhotographerName(data);
            // open dialog
            trigger.addEventListener('click', (event) => {
                event.preventDefault();
                open(dialog);
            });

            trigger.addEventListener('keydown', (event) => {
                if (event.which === keyCodes.enter) {
                    event.preventDefault();
                    open(dialog);
                }
            });

            // close dialog
            dialog.addEventListener('keydown', (event) => {
                if (event.which === keyCodes.escape) {
                    close(dialog, trigger);
                }
            });

            closeBtn.addEventListener('click', (event) => {
                close(dialog, trigger);
            });

            dismissTriggers.forEach((dismissTrigger) => {
                const dismissDialog = document.getElementById(dismissTrigger.dataset.dismiss);

                dismissTrigger.addEventListener('click', (event) => {
                    event.preventDefault();

                    close(dismissDialog, trigger);
                });
            });

            window.addEventListener('click', (event) => {
                if (event.target === dialog) {
                    close(dialog, trigger);
                }
            });
        });
    }

    // récupère le nom du photographe et l'affiche dans le formulaire de contact
    getPhotographerName(data) {
        let id = window.location.search.split('id=')[1];
        let photographers = !id ? data : data.filter(photographer => photographer.id == id);
        $('#form-name').append(
            photographers[0].name
        );
    };
}
