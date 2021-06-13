export default class LightBox {
    constructor() {
        this.currentIndex = 0;
    };

    // initialize the lightbox when clicking on a media
    init(currentMedia, currentMediaName) {
        let getMedias = Array.from(document.getElementsByClassName('media'));
        getMedias.forEach((mediaWorks, index) => mediaWorks.click(() => {
            let src = currentMedia[index];
            let nameSrc = currentMediaName[index];
            this.currentIndex = index;

            $('#works-lightbox').css('display', 'block');
            $('#works-lightbox-media').html(src)
            $('#works-lightbox-name').html(nameSrc)
        }))
        this.previous(document.querySelector('.left-arrow-lightbox'), currentMedia, currentMediaName);
        this.next(document.querySelector('.right-arrow-lightbox'), currentMedia, currentMediaName);
        this.close();
        this.keyboard(currentMedia, currentMediaName);
        return this
    };

    // return to previous media
    previous(elt, media, name) {
        elt.click(() => {
            this.currentIndex -= 1;

            if (this.currentIndex < 0) {
                this.currentIndex = media.length - 1;
                this.currentIndex = name.length - 1;
            }

            let src = media[this.currentIndex];
            let nameSrc = name[this.currentIndex];

            $('#works-lightbox-media').html(src)
            $('#works-lightbox-name').html(nameSrc)
        })
    };

    // turn to the next media
    next(elt, media, name) {
        elt.click(() => {
            this.currentIndex += 1;

            if (this.currentIndex > name.length - 1) {
                this.currentIndex = 0;
            }

            let src = media[this.currentIndex];
            let nameSrc = name[this.currentIndex];

            $('#works-lightbox-media').html(src)
            $('#works-lightbox-name').html(nameSrc)
        })
    };

    close() {
        document.querySelector('.close-lightbox-icon').click(() => {
            $('#works-lightbox').css('display', 'none');
        })
    };

    keyboard(currentMedia, currentMediaName) {
        document.addEventListener('keydown', (key) => {
            // press 'espace' for close
            if (key.code == "Escape") {
                $('#works-lightbox').css('display', 'none');
            }

            // press '->' for next
            else if (key.code == "ArrowRight") {
                this.currentIndex += 1;

                if (this.currentIndex > currentMediaName.length - 1) {
                    this.currentIndex = 0;
                }

                let src = currentMedia[this.currentIndex];
                let nameSrc = currentMediaName[this.currentIndex];

                $('#works-lightbox-media').html(src)
                $('#works-lightbox-name').html(nameSrc)
            }

            // press '<-' for previous
            else if (key.code == "ArrowLeft") {
                this.currentIndex -= 1;

                if (this.currentIndex < 0) {
                    this.currentIndex = currentMedia.length - 1;
                    this.currentIndex = currentMediaName.length - 1;
                }

                let src = currentMedia[this.currentIndex];
                let nameSrc = currentMediaName[this.currentIndex];

                $('#works-lightbox-media').html(src)
                $('#works-lightbox-name').html(nameSrc)
            }
        });
    };
}
