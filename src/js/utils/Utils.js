import filter from 'core-js/library/fn/array/filter';
import GalleryFactory from '../Factory/GalleryFactory.js';

export default class Utils {
    scrollButton() {
        window.addEventListener("scroll", () => {
            let y = window.scrollY;
            // lorsque l'on scroll verticalement à plus de 130px le bouton s'affiche.
            if (y >= 130) {
                $("#back-home").css('display', 'block');
            } else {
                $("#back-home").css('display', 'none');
            }
        });
    };


    // dropdown menu
    dropDownMenu(data) {
        const focusableElementsArray = [
            '[href]',
            'button:not([disabled])',
            'input:not([disabled])',
            'select:not([disabled])',
            'textarea:not([disabled])',
            '[tabindex]:not([tabindex="-1"])'
        ];

        const keyCodes = {
            tab: 9
        };
        const triggers = document.querySelectorAll('[aria-haspopup="listbox"]');
        const doc = document.querySelector('#profil');
        let arrowOpen = document.getElementsByClassName('drop-btn');
        let arrowClose = document.getElementsByClassName('arrow-up-close');


        if (arrowOpen) {
            arrowOpen[0].addEventListener('click', () => {
                triggers.forEach((trigger) => {
                    let optionSort = document.getElementById(trigger.getAttribute('aria-controls'));
                    const focusableElements = optionSort.querySelectorAll(focusableElementsArray);
                    const firstFocusableElement = focusableElements[0];
                    const lastFocusableElement = focusableElements[focusableElements.length - 1];

                    optionSort.setAttribute('aria-hidden', false);
                    optionSort.style.display = 'block';
                    doc.setAttribute('aria-hidden', true);

                    // return if no focusable element
                    if (!firstFocusableElement) {
                        return;
                    }

                    window.setTimeout(() => {
                        firstFocusableElement.focus();

                        // trapping focus inside the listbox
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
                });
            })

            this.sortMedias(data, doc);
        }
        if (arrowClose) {
            arrowClose[0].addEventListener('click', () => {
                optionSort[0].style.display = "none";
            });
        }
    }

    sortMedias(data, doc) {
        let mediaArraySort = [];
        let media = data.media;
        let dropBtn = document.querySelector('.drop-btn');
        let optionSort = document.getElementsByClassName('option-sort');
        let sort = Array.from(document.getElementsByClassName('sort'));

        sort.forEach((btn, index) => btn.addEventListener('click', () => {
            optionSort[0].style.display = "none";
            if (index == 0) {
                dropBtn.innerHTML = `Popularité <span class="fas fa-chevron-down" role='button' aria-hidden="true"></span>`;

                mediaArraySort = media.sort((a, b) => {
                    return b.likes - a.likes
                })

            } else if (index == 1) {
                dropBtn.innerHTML = `Date <span class="fas fa-chevron-down" role='button' aria-hidden="true"></span>`;

                mediaArraySort = media.sort((a, b) => {
                    return new Date(a.date) - new Date(b.date);
                })

            } else if (index == 2) {
                dropBtn.innerHTML = `Titre <span class="fas fa-chevron-down" role='button' aria-hidden="true"></span>`;

                mediaArraySort = media.sort((a, b) => {
                    if (a.title.toLowerCase() < b.title.toLowerCase()) {
                        return -1;
                    } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
                        return 1;
                    }
                })
            }
            this.displaySortMedia(mediaArraySort);
            doc.setAttribute('aria-hidden', false);
        }));
    }

    displaySortMedia(mediaArraySort) {
        document.getElementById("medias").innerHTML = "";
        new GalleryFactory().getGallery(mediaArraySort);
    }



    // tags 
    selectByTags() {
        let articles = document.querySelectorAll('.card_user');
        let filters = document.querySelector('#nav ul');
        let tags = document.querySelectorAll('.tag-link');
        // listener on click filters
        filters.addEventListener('click', event => {
            let classValue = event.target.classList.value;
            if (-1 === classValue.indexOf('activated')) {
                event.target.classList.add('activated')
            } else {
                event.target.classList.remove('activated')
            }
            this.diplayArticle(articles);
        });
        console.log(tags)
        tags.forEach(element => {
            console.log('dans le for each : '+element)
            element.addEventListener('keydown', (key) => {
                if (key.code == 'Enter') {console.log(key)
                    let classValue = key.target.classList.value;
                    console.log('classValue : '+ classValue)
                    if (-1 === classValue.indexOf('activated')) {
                        key.target.firstChild.classList.add('activated')
                    } else {
                        key.target.firstChild.classList.remove('activated')
                    }
                    this.diplayArticle(articles);
                }
            })
        });

    };

    // redirected on tag index page from profil
    redirectedByTag() {
        if (window.location.hash != "") {
            let articles = document.querySelectorAll('.card_user');
            let tag = window.location.hash.split('#')[1];
            console.log(tag)
            let filter = document.getElementById(tag);
            console.log(filter.firstChild)
            filter.firstChild.classList.add('activated');
            console.log(filter)
            this.diplayArticle(articles);
        }
    };

    // display or hide article
    diplayArticle(articles) {
        articles.forEach((article) => {
            if (this.isAvtivatedFilters(article)) {
                article.style.display = 'block';
            } else {
                article.style.display = 'none';
            }
        });
    };

    // compare if filters activated has the same value as the photographers tags    
    isAvtivatedFilters(article) {
        let filtersActivated = this.getActivatedFilters();
        let usersTags = article.classList.value.split(' ');
        let commonTag = filtersActivated.filter(tag => usersTags.includes(tag));
        return commonTag.length >= 1 || filtersActivated.length == 0;
    };

    // return string[] filters with the 'actived' class    
    getActivatedFilters() {
        let currentFilters = document.querySelectorAll('#nav ul a li.activated');
        let filterSelected = [];

        currentFilters.forEach(currentFilter => {
            filterSelected.push(currentFilter.getAttribute('data-filter'));
        });
        return filterSelected;
    };


    toUpperCaseFirst(a) {
        return (a + '').charAt(0).toUpperCase() + a.substr(1);
    }
}
