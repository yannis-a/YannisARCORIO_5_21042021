export default class Modal {
    // ajoute les events onClick sur 'contactez moi' et sur 'x' pour ouvrir et fermer la modal
    init(data) {
        let modalBtn = document.getElementById("contact");
        let closeBtn = document.getElementsByClassName('close-form-icon');

        if (modalBtn) {
            modalBtn.addEventListener('click', this.launchModal);
            this.getPhotographerName(data);
        }
        if (closeBtn) {
            closeBtn[0].addEventListener('click', this.closeModal);
        }
    };

    // ouvre la modal
    launchModal() {
        let modalbg = document.getElementById("form-dialog");
        modalbg.style.display = 'block';
    };

    // ferme la modal
    closeModal() {
        let modalbg = document.getElementById("form-dialog");
        modalbg.style.display = 'none';
    };

    // récupère le nom du photographe et l'affiche dans le formulaire de contact
    getPhotographerName(data) {
        let id = window.location.search.split('id=')[1];
        let photographers = !id ? data : data.filter(photographer => photographer.id == id);
        $('form-name').append(
            photographers[0].name
        );
    };
}
