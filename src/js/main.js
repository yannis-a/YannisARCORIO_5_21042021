import Data from './data/Data.js';
import HomePage from './home/HomePage.js';
import Profil from './photographers/Profil.js';
import Media from './utils/Media.js';
import Utils from './utils/Utils.js'

(function app() {
    new Data().getDataFishEye().then(data => {
        // si le chemin contient photographers.html alors on charge le profil du photographe
        if (window.location.pathname.includes("/photographers.html")) {
            new Profil().getProfil(data);
            new Utils().dropDownMenu(data);
            new Media().getMedias(data);
            return
        };
        // sinon on charge la homepage
        new HomePage().getPhotographers(data).then(p => {
            p.forEach(e => {
                // chargement de l'image profil et la redimention correctement
                var urlImg = "src/Sample Photos/Photos profil/" + e.portrait;
                var img = new Image();
                img.src = urlImg;

                if (img.height <= img.width) {
                    $('.' + e.id).addClass('imgP')
                } else if (img.height > img.width) {
                    $('.' + e.id).addClass('imgL')
                };
                
                $('.' + e.id).append(
                    img
                );
            });
        }).catch(e => console.log('error load photographers :' + e));
        new HomePage().getTags(data);
    }).catch(e => {
        console.error('Failed to load DataFishEye :' + e);
    })
})();



