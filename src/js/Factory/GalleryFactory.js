import MediaFactory from './MediaFactory.js';
import Carousel from '../utils/Carousel.js';


export default class GalleryFactory {
    constructor() {
        this.totalLike = 0;
    };

    getGallery(dataMedia) {
        const id = window.location.search.split('id=')[1];
        let mediaFactory = new MediaFactory();
        let currentMedia = [];
        let currentMediaName = [];
        dataMedia.forEach(element => {
            let mediaHTML = mediaFactory.getMedia(element);

            if (id == element.photographerId) {
                $('#medias').append(
                    $('<article class="media-container"></article>').append(
                        $('<a href="#" title="' + element.title + '"></a>').append(
                            $("<div class=\"media-div\" aria-label=\"" + element.title + ",closeup view\"></div>").append(
                                mediaHTML
                            )
                        ),
                        $('<div class="media-infos"></div>').append(
                            $('<h2 class="media-title">' + element.title + '</h2>'),
                            $('<div class="media-like"></div>').append(
                                $('<span class="media-like-number-' + element.id + '">' + element.likes + '</span>'),
                                $('<i class="fas fa-heart heart-btn-' + element.id + '" aria-label="likes" role="button"></i>')
                            )
                        )
                    )
                )
                this.liked(element);
                this.totalLike += parseInt(element.likes);
                currentMedia.push(mediaHTML);
                currentMediaName.push(element.title);
                new Carousel().init(currentMedia, currentMediaName);
            }
        })
        return this;
    };

    liked(element) {
        $('.heart-btn-' + element.id).on('click', () => {
            let likeElement = $('.media-like-number-' + element.id);
            let numberLike = parseInt(likeElement.text());
            numberLike++;
            likeElement.text(numberLike);

            let totalLikeElement = $('#total-likes');
            let numberTotalLike = parseInt(totalLikeElement.text());
            numberTotalLike++;
            totalLikeElement.text(numberTotalLike);
        })
    }
}
