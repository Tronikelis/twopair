<h1 align="center">Twopair</h1>

This [open source](https://github.com/Tronikelis/twopair) browser extension let's you watch any video on any website together with your friends



|                                              Home                                               |                                              Room                                               |
| :---------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------: |
| ![](https://github.com/Tronikelis/twopair/assets/56039679/92aa08cf-debc-496c-be22-3f27746137cd) | ![](https://github.com/Tronikelis/twopair/assets/56039679/0ee0294a-73a8-47b8-a48b-fec3e2885b89) |




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


