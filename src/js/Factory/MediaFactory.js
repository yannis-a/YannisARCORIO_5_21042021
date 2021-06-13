import ImageFactory from './ImageFactory.js';
import VideoFactory from './VideoFactory.js';

export default class MediaFactory {
    getMedia(element) {
        let factory = null;
        if (element.hasOwnProperty('image')) {
            factory = new ImageFactory();
        } else if (element.hasOwnProperty('video')) {
            factory = new VideoFactory();
        }
        return factory.createTag(element);
    };
}
