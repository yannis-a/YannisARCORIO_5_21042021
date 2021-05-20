import retrieveContent from "./query.js";

async function getTags() {
  try {
    const data = await retrieveContent();
    data.tags.forEach((element) => {
      $("#tags").append("<li>" + element + "</li>");
    });
  } catch (e) {
    console.log("Error", e);
  }
}

getTags();
