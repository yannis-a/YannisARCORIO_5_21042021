import GalleryFactory from '../factory/GalleryFactory.js';
import Subscribe from './Subscribe.js';

export default class MediaBuilder {
    getMedias(data) {
        let medias = data.media;
        let gallery = new GalleryFactory().getGallery(medias);
        this.getLikesPrice(gallery.totalLike, data.photographers);
        new Subscribe();
    };

    // container with all likes and price
    getLikesPrice(totalLike, photographers) {
        const id = window.location.search.split('id=')[1];

        photographers.forEach(element => {
            if (id == element.id) {
                $('#likes-price').append(
                    $('<span id="total-likes">' + totalLike + '</span>'),
                    $('<i class="fas fa-heart" aria-label="likes"></i>'),
                    $('<span>' + element.price + ' €/jour </span>')
                );
            }
        })
    };
}
