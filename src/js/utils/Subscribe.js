export default class Subscribe {
    constructor() {
        let media = document.getElementById('medias');

        media.click(event => {
            let classList = typeof event.target.classList === 'undefined' ? [] : event.target.classList.value.split(' ');
            let isClassBtn = -1 != classList.indexOf('heart-btn');

            if (isClassBtn) {
                let totalLikes = parseInt($('#total-likes').html());
                let counterLike = event.target.parentNode.firstElementChild.firstElementChild;
                let likeValue = parseInt(counterLike.html());
                let isLiked = -1 != classList.indexOf('isLiked');

                $('#total-likes').html(isLiked ? --totalLikes : ++totalLikes);
                counterLike.html(isLiked ? --likeValue : ++likeValue);

                if (isLiked) {
                    event.target.classList.remove('isLiked');
                    event.target.classList.replace('fas', 'far');
                } else {
                    event.target.classList.add('isLiked');
                    event.target.classList.replace('far', 'fas');
                }
            }
        })
    };
}
