import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/avatars-gridy-sprites';

export const getUserAvatar = (userId: string) => {
    let svg = createAvatar(style, {
        seed: userId,
        // ... and other options
    });

    var svg64 = btoa(unescape(encodeURIComponent(svg)));
    var image64 = "data:image/svg+xml;base64," + svg64;
    return image64

}

