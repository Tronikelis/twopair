<h1 align="center">Twopair</h1>

Simple video synchronization extension to watch videos together with your friends on Youtube, Netflix and many more video players online.



|                                              Home                                               |                                              Room                                               |
| :---------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------: |
| ![](https://github.com/Tronikelis/twopair/assets/56039679/92aa08cf-debc-496c-be22-3f27746137cd) | ![](https://github.com/Tronikelis/twopair/assets/56039679/0ee0294a-73a8-47b8-a48b-fec3e2885b89) |



## Install

[link-chrome]: https://chrome.google.com/webstore/detail/twopair/caffenaeeamegepefniddleeedabofga 'Version published on Chrome Web Store'
[link-firefox]: https://addons.mozilla.org/firefox/addon/twopair 'Version published on Mozilla Add-ons'

[<img src="https://raw.githubusercontent.com/alrra/browser-logos/90fdf03c/src/chrome/chrome.svg" width="48" alt="Chrome" valign="middle">][link-chrome] [<img valign="middle" src="https://img.shields.io/chrome-web-store/v/caffenaeeamegepefniddleeedabofga.svg?label=%20">][link-chrome] and other Chromium browsers

[<img src="https://raw.githubusercontent.com/alrra/browser-logos/90fdf03c/src/firefox/firefox.svg" width="48" alt="Firefox" valign="middle">][link-firefox] [<img valign="middle" src="https://img.shields.io/amo/v/twopair.svg?label=%20">][link-firefox]



## Notes

- Currently does not support videos that play in `<iframe>`, because the injected script does not have access to websites embedded in other websites

## Building the extension

Clone the repo and install deps with `npm i` and then:

- backend
  - `npm run backend:build`
  
- extension
  - [DEV] `npm run extension:build:dev`
  - [PROD] `npm run extension:build:prod`


## Privacy policy

The extension communicates with an external server which does not log / collect **ANY** personal information


