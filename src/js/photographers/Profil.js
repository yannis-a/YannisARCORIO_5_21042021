import Modal from '../utils/Modal.js';
import Form from '../utils/Form.js';
import Utils from '../Utils/Utils.js';

export default class Profil {
    getProfil(data) {
        let photographersData = data.photographers;
        const id = window.location.search.split('id=')[1];
        const photographers = !id ? photographersData : photographersData.filter(photographer => photographer.id == id);

        // gestion tags
        var tags = "";
        photographers[0].tags.forEach(tag => {
            tags += '<a aria-label="Tag" class="tag ' + tag + '" href="index.html#' + tag + '"><li>' + new Utils().toUpperCaseFirst(tag) + '</li></a>'
        });

        // gestion profil
        $('#profil-header').addClass('profil-header').append(
            $('<div class="infos"></div>').append(
                $('<h2>' + photographers[0].name + '</h2>'),
                $('<p class="city">' + photographers[0].city + ', ' + photographers[0].country + '</p>'),
                $('<p class="tagline">' + photographers[0].tagline + '</p>'),
                $('<div id="tags-profil"></div>').addClass('tags').append(
                    $('<ul></ul>').append(
                        tags
                    )
                )
            ),
            $('<button id="contact" aria-haspopup="dialog" aria-controls="form-modal" title="Contact Me">Contactez-moi</button>'),
            $('<div class="image"></div>').append(
                $('<div id="' + photographers[0].id + '" class="img_user-profil ' + photographers[0].id + '"></div>')
            )
        );

        // gestion image
        var urlImg = "src/Sample Photos/Photos profil/" + photographers[0].portrait;
        var img = new Image();
        img.onload = function () {
            document.getElementById(photographers[0].id).src = img.src;
            if (img.height <= img.width) {
                $('.' + photographers[0].id).addClass('imgP')
            } else if (img.height > img.width) {
                $('.' + photographers[0].id).addClass('imgL')
            };
            $('.' + photographers[0].id).append(
                img
            );
        }
        img.src = urlImg;
        img.setAttribute("alt", photographers[0].name);

        new Modal().initialize(photographersData);
        new Form().validate();
    };
}
