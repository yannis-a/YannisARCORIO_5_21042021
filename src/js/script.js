(function app() {
    getDataFishEye().then(data => {
        // si le chemin contient photographers.html alors on charge le profil du photographe
        if (window.location.pathname.includes("/photographers.html")) {
            getProfil(data);
            return
        };
        // sinon on charge la homepage
        getHomePage(data);
        getTagsFilter(data.tags);
        redirectedByTag();

    }).catch(e => {
        console.error('Failed to load DataFishEye : ' + e);
    })
})();

/* FUNCTIONS */

//#region DATA
async function getDataFishEye() {

    let url = '../../src/data.json';
    let response = await fetch(url);
    let data = await response.json();
    const dataPhotographers = [...data.photographers];
    const dataMedias = [...data.media];
    const dataTags = [...data.tags];
    return {
        'photographers': dataPhotographers,
        'medias': dataMedias,
        'tags': dataTags
    };
};

// Ca ne fonctionne pas car c'est un fichier local
// j'ajoute l'élément alt text dans la balise html <image/> et <video/>
/* async function editMedia(data) {
    data.medias.forEach(media => {
        media.alt = media.title;
    });
    let url = '../../src/data.json';
    let res = await fetch(url, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}; */
//#endregion

//#region INDEX.HTML
function getHomePage(data) {
    const PHOTOGRAPHERS = data.photographers;

    PHOTOGRAPHERS.forEach(photographer => {
        const TAGS = getTags(photographer.tags, false, false);

        $("#photographers").append(
            ` 
            <article class="card_user ${photographer.tags.join(' ')}">
                <a href="photographers.html?id=${photographer.id}" title="${photographer.name}" class="card_user_link-profil">
                    <div id="${photographer.id}" class="img_user ${photographer.id}"></div>
                    <h2 class="name_user">${photographer.name}</h2>
                </a>
                <div class="text_user">
                    <p class="loc_user">${photographer.city} , ${photographer.country}</p>
                    <p class="tagline_user">${photographer.tagline}</p>
                    <p class="name_user">${photographer.name}</p>
                </div>
                <div class="tags">
                    <ul>
                    ${TAGS}
                    </ul>
                </div>
            </article>
            `
        )
        toTop();
        getImage(photographer);
    });
}

function getTagsFilter(tags) {
    $('#nav ul').append(
        `${getTags(tags, true, false)}`
    );
    selectByTags();
}
//#endregion

//#region PHOTOGRAPHER.HTML
function getProfil(data) {
    const PHOTOGRAPHERS = data.photographers;
    const ID = window.location.search.split('id=')[1];
    const PHOTOGRAPHER = !ID ? PHOTOGRAPHERS : PHOTOGRAPHERS.filter(photographer => photographer.id == ID);
    const TAGS = getTags(PHOTOGRAPHER[0].tags, false, true);

    $('#profil-header').append(
        `
        <div class="infos">
            <h2>${PHOTOGRAPHER[0].name}</h2>
            <p class="city">${PHOTOGRAPHER[0].city} , ${PHOTOGRAPHER[0].country}</p>
            <p class="tagline">${PHOTOGRAPHER[0].tagline}</p>
            <div id="tags-profil" class="tags">
                <ul>
                    ${TAGS}
                </ul>
            </div>
        </div>
        <button id="contact" 
                aria-haspopup="dialog" 
                aria-controls="form-modal" 
                title="Contact Me">
            Contactez-moi
        </button>
        <div class="image">
            <div id="${PHOTOGRAPHER[0].id}" class="img_user-profil ${PHOTOGRAPHER[0].id}"></div>
        </div>
        `
    )

    getImage(PHOTOGRAPHER[0]);
    getMedias(data.medias.sort((a, b) => { return b.likes - a.likes }), PHOTOGRAPHER[0])
    sortMedias(data, PHOTOGRAPHER[0]);
    contactMe(PHOTOGRAPHER[0].name);
    validate();
}
//#endregion

//#region UTILS

function liked(media) {
    $('.heart-btn-' + media.id).on('click', () => {
        let likeElement = $('.media-like-number-' + media.id);
        let numberLike = parseInt(likeElement.text());

        let totalLikeElement = $('#total-likes');
        let numberTotalLike = parseInt(totalLikeElement.text());
        if ($('.heart-btn-' + media.id).hasClass('fas')) {
            $('.heart-btn-' + media.id).toggleClass('fas')
            $('.heart-btn-' + media.id).toggleClass('far')
            numberLike--;
            likeElement.text(numberLike);
            numberTotalLike--;
            totalLikeElement.text(numberTotalLike);
        } else {
            $('.heart-btn-' + media.id).toggleClass('fas')
            $('.heart-btn-' + media.id).toggleClass('far')
            numberLike++;
            likeElement.text(numberLike);
            numberTotalLike++;
            totalLikeElement.text(numberTotalLike);
        }
    })

    $('.heart-btn-' + media.id).on('keydown', (key) => {
        if (key.code == "Enter") {
            let likeElement = $('.media-like-number-' + media.id);
            let numberLike = parseInt(likeElement.text());

            let totalLikeElement = $('#total-likes');
            let numberTotalLike = parseInt(totalLikeElement.text());
            if ($('.heart-btn-' + media.id).hasClass('fas')) {
                $('.heart-btn-' + media.id).toggleClass('fas')
                $('.heart-btn-' + media.id).toggleClass('far')
                numberLike--;
                likeElement.text(numberLike);
                numberTotalLike--;
                totalLikeElement.text(numberTotalLike);
            } else {
                $('.heart-btn-' + media.id).toggleClass('fas')
                $('.heart-btn-' + media.id).toggleClass('far')
                numberLike++;
                likeElement.text(numberLike);
                numberTotalLike++;
                totalLikeElement.text(numberTotalLike);
            }
        }

    })
}

function sortMedias(data, photographer) {
    let medias = data.medias.filter(m => m.photographerId == photographer.id);
    let sort = $('#sort-media');
    sort.on('change', (e) => {
        if (e.target.value == 1) {
            medias.sort((a, b) => {
                return b.likes - a.likes
            })

        } else if (e.target.value == 3) {
            medias.sort((a, b) => {
                return new Date(a.date) - new Date(b.date);
            })

        } else if (e.target.value == 2) {
            medias.sort((a, b) => {
                if (a.title.toLowerCase() < b.title.toLowerCase()) {
                    return -1;
                } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
                    return 1;
                }
            })
        }
        getMedias(medias, photographer);
    });
}

function toTop() {
    window.addEventListener("scroll", () => {
        const y = window.scrollY;
        const minHeight = window.screen.availHeight * 0.3;
        // lorsque l'on scroll verticalement à plus de 130px le bouton s'affiche.
        if (y >= minHeight) {
            $("#back-home").css('display', 'block');
        } else {
            $("#back-home").css('display', 'none');
        }
    });
}

function getMedias(medias, photographer) {
    $('#medias').html("");
    $('#price').html("");
    let totalLike = getGallery(medias, photographer.id);
    getPriceAndLikes(totalLike, photographer)
}

function getPriceAndLikes(totalLike, photographer) {
    $('#price').append(
        `<span id="total-likes">
            ${totalLike}
        </span>
        <i class="fas fa-heart" aria-label="likes"></i>
        <span>
            ${photographer.price} €/jour 
        </span>`
    );
}

function getGallery(medias, id) {
    let totalLike = 0;
    let arrayMedias = [];
    medias.forEach(media => {
        if (id == media.photographerId) {
            media.alt = media.title;
            let mediaHTML = getMedia(media);
            totalLike += parseInt(media.likes);
            arrayMedias.push(media);

            $('#medias').append(`
                        <article class="media-container" id="container-${media.id}">
                            <a href="#" title="${media.title}" id="${media.id}">
                                <div class="media-div" aria-label="${media.title}, closeup view">
                                    ${mediaHTML}
                                </div>
                            </a>
                            <div class="media-infos">
                                <h2 class="media-title">
                                    ${media.title}
                                </h2>
                                <div class="media-like">
                                    <span class="media-like-number-${media.id}">
                                        ${media.likes}
                                    </span>
                                    <i class="far fa-heart heart-btn-${media.id}" aria-label="likes" role="button" tabindex=0></i>
                                </div>
                            </div>
                        </article>`
            )
        }
        liked(media);
    });
    new Carousel(arrayMedias);
    return totalLike;
}

function getMedia(mediaObject) {
    let factory = null;
    if (mediaObject.hasOwnProperty('image')) {
        factory = new ImageFactory(mediaObject).htmlElement;
    } else if (mediaObject.hasOwnProperty('video')) {
        factory = new VideoFactory(mediaObject).htmlElement;
    }
    return factory;
}

function toUpperCaseFirst(string) {
    return (string + '').charAt(0).toUpperCase() + string.substr(1);
}

function getImage(photographer) {
    const urlImg = "src/Sample Photos/Photos profil/" + photographer.portrait;
    let img = new Image();
    img.onload = function () {
        if (img.height <= img.width) {
            $('.' + photographer.id).addClass('imgP')
        } else if (img.height > img.width) {
            $('.' + photographer.id).addClass('imgL')
        };
        $('.' + photographer.id).append(
            img
        );
    }
    img.src = urlImg;
    img.setAttribute("alt", photographer.name);
}

function getTags(tags, isLink, isIndex) {
    const classTag = isLink ? "tag-link" : "tag";

    let tagList = "";
    tags.forEach(tag => {
        let hrefIndex = isIndex ? `index.html#${tag}` : "#";
        tagList += `<a class="${classTag}" href="${hrefIndex}" id="${tag}">
                        <li data-filter="${tag}">
                        ${toUpperCaseFirst(tag)}
                        </li>
                    </a>`
    })
    return tagList;
}

function diplayArticle(articles) {
    articles.forEach((article) => {
        if (this.isAvtivatedFilters(article)) {
            article.style.display = 'block';
        } else {
            article.style.display = 'none';
        }
    });
}

function isAvtivatedFilters(article) {
    const filtersActivated = this.getActivatedFilters();
    const usersTags = article.classList.value.split(' ');
    let commonTag = filtersActivated.filter(tag => usersTags.includes(tag));
    return commonTag.length >= 1 || filtersActivated.length == 0;
}

function getActivatedFilters() {
    const currentFilters = document.querySelectorAll('#nav ul a li.activated');
    let filterSelected = [];

    currentFilters.forEach(currentFilter => {
        filterSelected.push(currentFilter.getAttribute('data-filter'));
    });
    return filterSelected;
}

function redirectedByTag() {
    if (window.location.hash != "") {
        const articles = document.querySelectorAll('.card_user');
        const tag = window.location.hash.split('#')[1];
        let filter = document.getElementById(tag);
        filter.children[0].classList.add('activated');
        diplayArticle(articles);
    }
}

function selectByTags() {
    const articles = document.querySelectorAll('.card_user');
    const tags = document.querySelectorAll('.tag-link');

    tags.forEach(element => {
        // listener on click filters
        element.addEventListener('click', event => {
            let classValue = event.target.classList.value;
            if (-1 === classValue.indexOf('activated')) {
                event.target.classList.add('activated')
            } else {
                event.target.classList.remove('activated')
            }
            diplayArticle(articles);
        });
        // listener on keydownEnter filters
        element.addEventListener('keydown', (key) => {
             if (key.code == 'Enter') {
                let classValue = key.target.firstElementChild.classList.value;
                if (-1 === classValue.indexOf('activated')) {
                    key.target.firstElementChild.classList.add('activated')
                } else {
                    key.target.firstElementChild.classList.remove('activated')
                }
                diplayArticle(articles);
            }
        })
    });
}

function validate() {
    let form = document.getElementById('contact-form');
    let firstName = document.getElementById('first-name');
    let lastName = document.getElementById('last-name');
    let email = document.getElementById('email');
    let message = document.getElementById('message');
    const regexName = /^[a-zA-ZÀ-ÖØ-öø-ÿ]+$/;
    const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


    form.addEventListener('submit', event => {
        event.preventDefault();
        let isValid = checkFirstName(firstName, regexName) &&
            checkLastName(lastName, regexName) &&
            checkEmail(email, regexEmail) &&
            checkMessage(message);

        if (isValid) {
            firstName.style.border = 'none';
            lastName.style.border = 'none';
            email.style.border = 'none';
            message.style.border = 'none';
            this.consoleMessageValid(firstName, lastName, email, message);
            document.getElementById('form-modal').style.display = 'none';
        }
    });
}

function consoleMessageValid(firstName, lastName, email, message) {
    console.group('Contact Message');
    console.log('Prénom : ' + firstName.value);
    console.log('Nom : ' + lastName.value);
    console.log('Email : ' + email.value);
    console.log('Message : ' + message.value);
    console.groupEnd();
}

function checkLastName(elt, regex) {
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
}

function checkFirstName(elt, regex) {
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
}

function checkEmail(elt, regex) {
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
}

function checkMessage(elt) {
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
}

function contactMe(name) {
    const triggers = document.querySelectorAll('[aria-haspopup="dialog"]');
    const profil = document.querySelector('#profil');
    const focusableElementsArray = [
        '[href]',
        'button:not([disabled])',
        'input:not([disabled])',
        'select:not([disabled])',
        'textarea:not([disabled])',
        '[tabindex]:not([tabindex="-1"])',
    ];
    const keyCodes = {
        tab: 9,
        enter: 13,
        escape: 27,
    };

    const open = function (dialog) {
        const focusableElements = dialog.querySelectorAll(focusableElementsArray);
        const firstFocusableElement = focusableElements[0];
        const lastFocusableElement = focusableElements[focusableElements.length - 1];

        dialog.setAttribute('aria-hidden', false);
        dialog.style.display = 'block';
        profil.setAttribute('aria-hidden', true);

        // return if no focusable element
        if (!firstFocusableElement) {
            return;
        }

        window.setTimeout(() => {
            firstFocusableElement.focus();

            // trapping focus inside the dialog
            focusableElements.forEach((focusableElement) => {
                if (focusableElement.addEventListener) {
                    focusableElement.addEventListener('keydown', (event) => {
                        const tab = event.which === keyCodes.tab;

                        if (!tab) {
                            return;
                        }
                        if (event.shiftKey) {
                            if (event.target === firstFocusableElement) { // shift + tab
                                event.preventDefault();

                                lastFocusableElement.focus();
                            }
                        } else if (event.target === lastFocusableElement) { // tab
                            event.preventDefault();

                            firstFocusableElement.focus();
                        }
                    });
                }
            });
        }, 100);
    };

    const close = function (dialog, trigger) {
        dialog.setAttribute('aria-hidden', true);
        dialog.style.display = 'none';
        profil.setAttribute('aria-hidden', false);

        // restoring focus
        trigger.focus();
    };

    triggers.forEach((trigger) => {
        const dialog = document.getElementById(trigger.getAttribute('aria-controls'));
        const closeBtn = document.getElementById('close-form');
        const dismissTriggers = dialog.querySelectorAll('[data-dismiss]');
        $('#form-name').append(name);
        // open dialog
        trigger.addEventListener('click', (event) => {
            event.preventDefault();
            open(dialog);
        });

        trigger.addEventListener('keydown', (event) => {
            if (event.which === keyCodes.enter) {
                event.preventDefault();
                open(dialog);
            }
        });

        // close dialog
        dialog.addEventListener('keydown', (event) => {
            if (event.which === keyCodes.escape) {
                close(dialog, trigger);
            }
        });

        closeBtn.addEventListener('click', (event) => {
            close(dialog, trigger);
        });

        dismissTriggers.forEach((dismissTrigger) => {
            const dismissDialog = document.getElementById(dismissTrigger.dataset.dismiss);

            dismissTrigger.addEventListener('click', (event) => {
                event.preventDefault();

                close(dismissDialog, trigger);
            });
        });

        window.addEventListener('click', (event) => {
            if (event.target === dialog) {
                close(dialog, trigger);
            }
        });
    });
}

//#endregion

//#region CLASS
class VideoFactory {
    constructor(mediaObject) {
        this.htmlElement = `<video src="src/Sample Photos/${mediaObject.photographerId}/${mediaObject.video}"
                                controls="controls"
                                role="button"
                                class="media"
                                id="${mediaObject.id}"><video>`
    };
}

class ImageFactory {
    constructor(mediaObject) {
        this.htmlElement = `<img src="src/Sample Photos/${mediaObject.photographerId}/${mediaObject.image}"
                                alt="${mediaObject.alt}"
                                role="button"
                                class="media"
                                id="${mediaObject.id}"></img>`
    };
}

class Carousel {
    constructor(arrayMedias) {
        this.currentIndex = 0;

        arrayMedias.forEach((media, index) => {

            $('#' + media.id).on("click", () => {
                $('#carousel-media').html(getMedia(media));
                this.currentIndex = index;
                document.getElementById('carousel').style.display = 'flex';
            })

            $('#' + media.id).on("keydown", (key) => {
                console.log('entrer')
                if (key.code == "Enter") {
                    $('#carousel-media').html(getMedia(media));
                    this.currentIndex = index;
                    document.getElementById('carousel').style.display = 'flex';
                }
            })


        })
        this.previous(arrayMedias);
        this.next(arrayMedias);
        this.keyboard(arrayMedias);
        this.close();
    }

    close() {
        $('.close-carousel-icon').on('click', () => {
            let lightbox = document.getElementById('carousel');
            lightbox.style.display = 'none';
        })
    }


    // return to previous media
    previous(arrayMedias) {
        $('.left-arrow-carousel').on('click', () => {
            this.currentIndex -= 1;
            if (this.currentIndex < 0) {
                this.currentIndex = arrayMedias.length - 1;
            }
            let previousMedia = getMedia(arrayMedias[this.currentIndex])
            $('#carousel-media').html(previousMedia);
        })
    }

    // turn to the next media
    next(arrayMedias) {
        $('.right-arrow-carousel').on('click', () => {
            this.currentIndex += 1;
            if (this.currentIndex > arrayMedias.length - 1) {
                this.currentIndex = 0;
            }
            let nextMedia = getMedia(arrayMedias[this.currentIndex])
            $('#carousel-media').html(nextMedia);
        })
    }

    keyboard(arrayMedias) {
        document.addEventListener('keydown', (key) => {

            // ESCAPE TO CLOSE
            if (key.code == "Escape") {
                let lightBox = document.getElementById('carousel');
                lightBox.style.display = 'none';
            }

            // ARROW RIGHT TO STEP RIGHT
            else if (key.code == "ArrowRight") {
                this.currentIndex += 1;

                if (this.currentIndex > arrayMedias.length - 1) {
                    this.currentIndex = 0;
                }
                let nextMedia = getMedia(arrayMedias[this.currentIndex])
                $('#carousel-media').html(nextMedia);
            }

            // ARROW LEFT TO STEP LEFT
            else if (key.code == "ArrowLeft") {
                this.currentIndex -= 1;

                if (this.currentIndex < 0) {
                    this.currentIndex = arrayMedias.length - 1;
                }
                let previousMedia = getMedia(arrayMedias[this.currentIndex])
                $('#carousel-media').html(previousMedia);
            }
        });
    }

}
//#endregion