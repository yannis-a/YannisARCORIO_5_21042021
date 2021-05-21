import retrieveContent from "./query.js";



async function getTags() {
  try {
    const data = await retrieveContent();
    data.tags.forEach((element) => {
      $('#tags').append($('<li>' + element + '</li>').addClass('tag'));
    });
  } catch (e) {
    console.log("Error", e);
  }
}

async function getPhotographers() {
  try {
    const data = await retrieveContent();

    data.photographers.forEach((photographer) => {
      var urlImg = "src/Sample Photos/ID Photos/" + photographer.portrait;
      var tags = "";
      photographer.tags.forEach(tag => {
        tags += '<span class="tag">' + tag + '</span>,'
      })
      $("#photographers").append(
        $('<article></article>').addClass('card card_user').append(
          $('<a></a>').addClass('link_user-profil').append(

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
}

getTags();
getPhotographers();
