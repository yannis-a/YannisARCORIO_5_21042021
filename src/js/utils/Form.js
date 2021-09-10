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
            let isValid = this.checkFirstName(firstName, regexName) &&
                this.checkLastName(lastName, regexName) &&
                this.checkEmail(email, regexEmail) &&
                this.checkMessage(message);

            if (isValid) {
                firstName.style.border = 'none';
                lastName.style.border = 'none';
                email.style.border = 'none';
                message.style.border = 'none';
                this.consoleMessageValid(firstName, lastName, email, message);
                document.getElementById('form-modal').style.display = 'none';
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

    checkLastName(elt, regex) {
        let errorlast = document.getElementById("error-last-name");
        if (elt.value.trim().length < 2 || elt.value.trim() === "") {
            elt.style.border = '2px solid red';
            errorlast.innerHTML = "2 caractères minimum";
            errorlast.style.display = "inline";
            return false;
        } else if (!elt.value.match(regex)) {
            elt.style.border = '2px solid red';
            errorlast.innerHTML = "caractère non autorisé"
            errorlast.style.display = "inline";
            return false;
        }
        else {
            elt.style.border = 'solid #279e7a 0.19rem';
            errorlast.style.display = "none";
            return true;
        }
    };

    checkFirstName(elt, regex) {
        let errorfirst = document.getElementById("error-first-name");
        if (elt.value.trim().length < 2 || elt.value.trim() === "") {
            elt.style.border = '2px solid red';
            errorfirst.innerHTML = "2 caractères minimum";
            errorfirst.style.display = "inline";
            return false;
        } else if (!elt.value.match(regex)) {
            elt.style.border = '2px solid red';
            errorfirst.innerHTML = "caractère non autorisé"
            errorfirst.style.display = "inline";
            return false;
        }
        else {
            elt.style.border = 'solid #279e7a 0.19rem';
            errorfirst.style.display = "none";
            return true;
        }
    };

    checkEmail(elt, regex) {
        let errormail = document.getElementById("error-mail");
        if (elt.value.trim().match(regex)) {
            elt.style.border = 'solid #279e7a 0.19rem';
            errormail.style.display = "none";
            return true;
        }
        elt.style.border = '2px solid red';
        errormail.innerHTML = "email non valide"
        errormail.style.display = "inline";
        return false;
    };

    checkMessage(elt) {
        let errormsg = document.getElementById("error-message");
        if (elt.value.trim() === '' || elt.value.trim() == null) {
            elt.style.border = '2px solid red';
            errormsg.innerHTML = "ne peut pas être vide"
            errormsg.style.display = "inline";
            return false;
        }
        elt.style.border = 'solid #279e7a 0.19rem';
        errormsg.style.display = "none";
        return true;
    };
}
