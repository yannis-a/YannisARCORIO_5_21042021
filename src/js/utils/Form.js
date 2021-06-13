export default class Form {
    validate() {
        let form = document.getElementById('contact-form');
        let firstName = document.getElementById('first-name');
        let lastName = document.getElementById('last-name');
        let email = document.getElementById('email');
        let message = document.getElementById('message');
        const regexName = /^[a-zA-ZÀ-ÖØ-öø-ÿ]+$/;
        const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


        form.addEventListener('submit', event => {
            event.preventDefault();
            let isValid = this.checkNames(firstName, regexName) &&
                this.checkNames(lastName, regexName) &&
                this.checkEmail(email) &&
                this.checkMessage(message);

            if (isValid) {
                firstName.style.border = 'none';
                lastName.style.border = 'none';
                email.style.border = 'none';
                message.style.border = 'none';
                this.consoleMessageValid(firstName, lastName, email, message);
                document.getElementById('contact-form').reset();
            } else {
                this.errorVerification(firstName, lastName, email, message, regexName);
            }
        });
    };

    consoleMessageValid(firstName, lastName, email, message) {
        console.group('Contact Message');
        console.log('Prénom : ' + firstName.value);
        console.log('Nom : ' + lastName.value);
        console.log('Email : ' + email.value);
        console.log('Message : ' + message.value);
        console.groupEnd();
    };

    errorVerification(firstName, lastName, email, message, regex) {
        this.checkNames(firstName, regex);
        this.checkNames(lastName, regex);
        this.checkEmail(email);
        this.checkMessage(message);
    };

    checkNames(elt, regex) {
        if (elt.value.trim().length < 2 || elt.value.trim() === "" || !elt.value.match(regex)) {
            elt.parentElement.setAttribute('data-error-visible', 'true');
            elt.style.border = '2px solid #e54858';
            return false;
        } else {
            elt.parentElement.setAttribute('data-error-visible', 'false');
            elt.style.border = 'solid #279e7a 0.19rem';
            return true;
        }
    };

    checkEmail(elt) {
        if (elt.value.trim().match(regexEmail)) {
            elt.parentElement.setAttribute('data-error-visible', 'false');
            elt.style.border = 'solid #279e7a 0.19rem';
            return true;
        }
        elt.parentElement.setAttribute('data-error-visible', 'true');
        elt.style.border = '2px solid #e54858';
        return false;
    };

    checkMessage(elt) {
        if (elt.value.trim() === '' || elt.value.trim() == null) {
            elt.parentElement.setAttribute('data-error-visible', 'true');
            elt.style.border = '2px solid #e54858';
            return false;
        }
        elt.parentElement.setAttribute('data-error-visible', 'false');
        elt.style.border = 'solid #279e7a 0.19rem';
        return true;
    };
}
