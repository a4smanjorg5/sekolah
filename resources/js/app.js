require('./bootstrap');

import React from 'react';
import { render } from 'react-dom';
import { createInertiaApp } from '@inertiajs/inertia-react';
import { InertiaProgress } from '@inertiajs/progress';

let appName = route().current();
switch (appName) {
case 'forum.categories.show':
    appName = 'Kategori Forum ';
    break;
case 'forum.topics.show':
    appName = 'Topik Forum ';
    break;
default:
    appName = appName.match(/^forum\./) ? 'Forum ' : '';
    break;
}
appName += window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

createInertiaApp({
    title: (title) => `${title} \u2013 ${appName}`,
    resolve: (name) => require('./Pages/' + name),
    setup({ el, App, props }) {
        return render(<App {...props} />, el);
    },
});

InertiaProgress.init({ color: '#4B5563' });
