import GalleryFactory from '../factory/GalleryFactory.js';

export default class MediaBuilder {
    getMedias(data) {
        let medias = data.media;
        let gallery = new GalleryFactory().getGallery(medias);
        this.getLikesPrice(gallery.totalLike, data.photographers);
    };
    
    getLikesPrice(totalLike, photographers) {
        const id = window.location.search.split('id=')[1];

        photographers.forEach(element => {
            if (id == element.id) {
                $('#price').append(
                    $('<span id="total-likes">' + totalLike + '</span>'),
                    $('<i class="fas fa-heart" aria-label="likes"></i>'),
                    $('<span>' + element.price + ' €/jour </span>')
                );
            }
        })
    };
}
