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

    dropDownMenu(data) {
        let arrowOpen = $('.sort-btn');
        let arrowClose = $('.arrow-up-close');
        let hiddenSort = $('.hidden-sort');

        if (arrowOpen) {
            arrowOpen[0].click(() => {
                hiddenSort[0].style.display = 'block';
            });
            this.sortMedias(data);
        }
        if (arrowClose) {
            arrowClose[0].click(() => {
                hiddenSort[0].style.display = "none";
            });
        }
    };

    // trie des médias par popularité, titre ou date
    sortMedias(data) {
        let mediaArraySort = [];
        let medias = data.medias;
        let btnSort = document.querySelector('.sort-btn');
        let hiddenSort = $('.hidden-sort');
        let sortBtn = $('.sort').toArray();

        sortBtn.forEach((btn, index) => btn.click(() => {
            hiddenSort[0].style.display = "none";
            if (index == 0) {
                btnSort.innerHTML = `Popularité`;
                mediaArraySort = medias.sort((a, b) => {
                    return b.likes - a.likes
                })

            } else if (index == 1) {
                btnSort.innerHTML = `Date`;
                mediaArraySort = medias.sort((a, b) => {
                    return new Date(a.date).valueOf() - new Date(b.date).valueOf();
                })

            } else if (index == 2) {
                btnSort.innerHTML = `Titre`;
                mediaArraySort = medias.sort((a, b) => {
                    if (a.photoName.toLowerCase() < b.photoName.toLowerCase()) {
                        return -1;
                    } else if (a.photoName.toLowerCase() > b.photoName.toLowerCase()) {
                        return 1;
                    }
                })
            }
            this.displaySortMedias(mediaArraySort);
        }));
    };

    displaySortMedias(mediaArraySort) {
        $('#medias').html('');
        new GalleryFactory().builder(mediaArraySort);
    };


    selectByTags() {
        let articles = document.querySelectorAll('.card_user');
        let filters = document.querySelector('#nav ul');
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

    // retourne la chaine de caractère avec la premier lettre en maj
    toUpperCaseFirst(a) {
        return (a + '').charAt(0).toUpperCase() + a.substr(1);
    }
}
