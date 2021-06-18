import Utils from '../Utils/Utils.js';

export default class HomePage {
  async getPhotographers(data) {
    let photographers = data.photographers;
    try {
      photographers.forEach((photographer) => {
        var tags = "";
        let d = '#';
        photographer.tags.forEach(tag => {
          tags += '<a class="tag"><li>' + d.italics() + new Utils().toUpperCaseFirst(tag) + '</li></a>'
        })
        $("#photographers").append(
          $('<article></article>').addClass('card_user ' + photographer.tags.join(' ')).append(
            $('<a href="photographers.html?id=' + photographer.id + '" title="' + photographer.name + '"></a>').addClass('card_user_link-profil').append(
              $('<div class="img_user ' + photographer.id + '"></div>'),
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
      });
    } catch (e) {
      console.log("Error", e);
    }
    new Utils().selectByTags();
    new Utils().scrollButton();
    return photographers;
  };

  getTags(data) {
    let tags = data.tags;
    let d = '#';
    try {
      tags.forEach(tag => {
        $('#nav ul').append(
          $('<a></a>').addClass('tag-link').attr('href', '#').append(
            $('<li></li>').attr('data-filter', tag).append(d.italics() + new Utils().toUpperCaseFirst(tag))));
      });
    } catch (e) {
      console.log("Error", e);
    }
  };
}


