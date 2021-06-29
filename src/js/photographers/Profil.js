import Modal from '../utils/Modal.js';
import Form from '../utils/Form.js';

export default class Profil {
    getProfil(data) {
        let photographersData = data.photographers;
        const id = window.location.search.split('id=')[1];
        const photographers = !id ? photographersData : photographersData.filter(photographer => photographer.id == id);
        var tags = "";
        photographers[0].tags.forEach(tag => {
            tags += '<span class="tag">' + tag + '</span>'
        });
        $('#profil-header').append(
            $('<div class="infos"></div>').append(
                $('<h2>' + photographers[0].name + '</h2>'),
                $('<p class="city">' + photographers[0].city + ', ' + photographers[0].country + '</p>'),
                $('<p class="tagline">' + photographers[0].tagline + '</p>'),
                $('<p></p>').append(
                    tags
                )
            ),
            $('<button id="contact" title="Contact Me">Contactez-moi</button>'),
            $('<img src="src/Sample Photos/Photos profil/' + photographers[0].portrait + '" alt="' + photographers[0].alt + '">')
        );
        new Modal().init(photographersData);
        new Form().validate();

        return photographers[0];
    };
}
