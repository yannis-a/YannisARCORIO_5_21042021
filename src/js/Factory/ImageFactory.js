export default class ImageFactory {
    createTag(element) {
        return $('<img></img>')
            .attr('src', 'src/Sample Photos/' + element.photographerId + '/' + element.image)
            .attr('alt', element.alt)
            .attr('role', 'button')
            .addClass('media');
    };
}
