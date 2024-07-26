(window as any).global = window;
global.Buffer = global.Buffer || require('buffer').Buffer;
window.process = window.process || require('process/browser');

import 'zone.js';  // Included with Angular CLI.
