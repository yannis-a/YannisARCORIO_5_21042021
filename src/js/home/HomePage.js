import Utils from '../Utils/Utils.js';

export default class HomePage {
  getPhotographers(data) {
    let photographers = data.photographers;
    try {
      photographers.forEach((photographer) => {
        var urlImg = "src/Sample Photos/Photos profil/" + photographer.portrait;
        var tags = "";
        photographer.tags.forEach(tag => {
          tags += '<span class="tag">' + tag + '</span>'
        })
        $("#photographers").append(
          $('<article></article>').addClass('card card_user ' + photographer.tags.join(' ')).append(
            $('<a href="photographers.html?id=' + photographer.id + '" title="' + photographer.name + '"></a>').addClass('link_user-profil').append(
              $('<img></img>').attr('src', urlImg).addClass('img_user'),
              $('<h2>' + photographer.name + '</h2>').addClass('name_user')
            ),
            $('<div></div>').addClass('text_user').append(
              $('<p>' + photographer.city + ', ' + photographer.country + '</p>').addClass('loc_user'),
              $('<p>' + photographer.tagline + '</p>').addClass('tagline_user'),
              $('<p>' + photographer.price + '€/jour</p>').addClass('price_user')
            ),
            $('<div></div>').addClass('tags tags_user').append(
              tags
            )));
      });
    } catch (e) {
      console.log("Error", e);
    }
    new Utils().filterTags();
    new Utils().scrollButton();
  };

  getTags(data) {
    let tags = data.tags
    try {
      tags.forEach(tag => {
        $('#filter-tags').append(
          $('<li></li>').addClass('tag').attr('data-filter', tag)).append(
            $('<a>' + tag + '</a>').attr('href', '#'));
      });
    } catch (e) {
      console.log("Error", e);
    }
  };
}
