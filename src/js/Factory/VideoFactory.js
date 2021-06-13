export default class VideoFactory {
    createTag(element) {
        return $('<video></video>')
            .attr("controls", "controls")
            .attr('src', 'src/Sample Photos/' + element.photographerId + '/' + element.video)
            .attr('role', 'button')
            .addClass('media');
    };
}
