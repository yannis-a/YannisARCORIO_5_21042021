import Data from './data/Data.js';
import HomePage from './home/HomePage.js';
import Profil from './photographers/Profil.js';
import Media from './utils/Media.js';
import Utils from './utils/Utils.js'

function app() {
    new Data().getDataFishEye().then(data => {
        // si le chemin contient photographers.html alors on charge le profil du photographe
        if (window.location.pathname.includes("/photographers.html")) {
            new Profil().getProfil(data);
            new Utils().dropDownMenu(data);
            new Media().getMedias(data);
            return
        };
        // sinon on charge la homepage
        new HomePage().getPhotographers(data);
        new HomePage().getTags(data);
    }).catch(e => {
        console.error('Failed to load DataFishEye :' + e);
    })
};

app();