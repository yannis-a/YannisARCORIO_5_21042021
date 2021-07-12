export default class LikeSubscriber {

    constructor() {
        let media = document.getElementById('medias');

        media.addEventListener('click', (e) => {
            let classListTarget = typeof e.target.classList === 'undefined' ? [] : e.target.classList.value.split(' ');
            let hasClassBtn = -1 != classListTarget.indexOf('heart-btn');

            if (hasClassBtn) {
                let totalLikes = parseInt(document.getElementById('total-likes').innerHTML);
                let counterLike = e.target.parentNode.firstElementChild.firstElementChild;
                let likeValue = parseInt(counterLike.innerHTML);
                let isLiked = -1 != classListTarget.indexOf('isLiked');

                document.getElementById('total-likes').innerHTML = isLiked ? --totalLikes : ++totalLikes;
                counterLike.innerHTML = isLiked ? --likeValue : ++likeValue;

                if (isLiked) {
                    e.target.classList.remove('isLiked');
                    e.target.classList.replace('fas', 'far');
                } else {
                    e.target.classList.add('isLiked');
                    e.target.classList.replace('far', 'fas');
                }
            }
        })
    }
}