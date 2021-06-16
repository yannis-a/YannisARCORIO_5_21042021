import Utils from '../Utils/Utils.js';

export default class HomePage {
  getPhotographers(data) {
    let photographers = data.photographers;
    try {
      photographers.forEach((photographer) => {
        var urlImg = "src/Sample Photos/Photos profil/" + photographer.portrait;
        var tags = "";
        let d = '#';
        photographer.tags.forEach(tag => {
          tags += '<li class="tag"><a>' + d.italics() + new Utils().toUpperCaseFirst(tag) + '</a></li>'
        })
        $("#photographers").append(
          $('<article></article>').addClass('card_user ' + photographer.tags.join(' ')).append(
            $('<a href="photographers.html?id=' + photographer.id + '" title="' + photographer.name + '"></a>').addClass('card_user_link-profil').append(
              $('<div class="img_user"></div>').append(
                $('<img></img>').attr('src', urlImg).addClass('img')
              ),
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
    new Utils().filterTags();
    new Utils().scrollButton();
  };

  getTags(data) {
    let tags = data.tags;
    let d = '#';
    try {
      tags.forEach(tag => {
        $('#nav ul').append(
          $('<li></li>').addClass('tag').attr('data-filter', tag).append(
            $('<a></a>').attr('href', '#').append(d.italics() + new Utils().toUpperCaseFirst(tag))));
      });
    } catch (e) {
      console.log("Error", e);
    }
  };
}


