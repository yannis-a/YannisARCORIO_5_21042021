import Utils from '../Utils/Utils.js';

export default class HomePage {

  getTags(data) {
    let tags = data.tags;

    tags.forEach(tag => {
      $('#nav ul').append(
        $('<a></a>').addClass('tag-link').attr('href', '#').attr('id', tag).append(
          $('<li></li>').attr('data-filter', tag).append(new Utils().toUpperCaseFirst(tag))));
    });
  };

  
  getPhotographers(data) {
    let photographers = data.photographers;

    photographers.forEach((photographer) => {
      // gestion tags
      var tags = "";
      photographer.tags.forEach(tag => {
        tags += '<a class="tag"><li>' + new Utils().toUpperCaseFirst(tag) + '</li></a>'
      })

      // gestion photographer card
      $("#photographers").append(
        $('<article></article>').addClass('card_user ' + photographer.tags.join(' ')).append(
          $('<a href="photographers.html?id=' + photographer.id + '" title="' + photographer.name + '"></a>').addClass('card_user_link-profil').append(
            $('<div id="' + photographer.id + '" class="img_user ' + photographer.id + '"></div>'),
            $('<h2>' + photographer.name + '</h2>').addClass('name_user')
          ),
          $('<div></div>').addClass('text_user').append(
            $('<p>' + photographer.city + ', ' + photographer.country + '</p>').addClass('loc_user'),
            $('<p>' + photographer.tagline + '</p>').addClass('tagline_user'),
            $('<p>' + photographer.price + '€/jour</p>').addClass('price_user')
          ),
          $('<div></div>').addClass('tags').append(
            $('<ul></ul>').append(
              tags
            )
          )
        )
      );

      // gestion image
      var urlImg = "src/Sample Photos/Photos profil/" + photographer.portrait;
      var img = new Image();
      img.onload = function () {
        document.getElementById(photographer.id).src = img.src;
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
    });

    new Utils().selectByTags();
    new Utils().scrollButton();
    return photographers;
  };
}


