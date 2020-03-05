# EDDL for Adobe Launch
My custom EDDL for Adobe Launch inspired by Jan Exner's blog post:
https://webanalyticsfordevelopers.com/2019/10/15/launch-events-and-eddl-aka-jim-changed-my-mind/
## What's different?
- there is only one push() method in dataLayer
- computeState() function is moved into dataLayer object
- pushed Array remains Array in computedState object
- It works well with asynchronous Adobe Launch implementation
- it works in Internet Explorer 11
- pushes are logged to console (`_satellite.logger.info()`)
- pushed events fire direct calls (`_satellite.track()`)
## Setup
1. Create new rule and set the new event "Library Loaded (Page Top)". 
2. Copy the js/eddl-custom-code.js into new Custom code.
## Browser support
- Mozilla (latest)
- Chromium (latest)
- Safari (latest)
- Microsoft Edge
- Internet Explorer 11
