// return all data object from data.json (photographers, medias and tags)
export default class Data {
    async getDataFishEye() {

        let url = '../../src/data.json';
        let response = await fetch(url);
        let data = await response.json();

        const dataPhotographers = [...data.photographers];
        const dataMedias = [...data.media];
        const dataTags = [...data.tags];

        return {
            'photographers': dataPhotographers,
            'media': dataMedias,
            'tags' : dataTags
        };
    };
}
