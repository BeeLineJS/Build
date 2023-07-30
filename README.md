# Build
Build files to create component and layout factories and build html.js tempates

# Run from script
**npm** install beelinejs-build

Add the following to the package scripts:

`node node_modules\beelinejs-build\src\build components layouts`

`&&` can used to run webpack for example

`node node_modules\beelinejs-build\src\build components layouts && webpack`


`components` and `layouts` are the path to the components and layouts 

# Run from file

Create a `build.js` file and add `require('beelinejs-build')`

Add a the package scripts:

 `node build components layouts`

# Files
## build.js
Main file. runs componets.js, layouts.js and style.js

## components.js
Create a factory.js for all the components in the components folder

## templates.js
Create all the **xxx.html** templates into ***xxx.html.js*** templates and adds a factory.js

## style.js
Merge all the componets scss files into **style.scss**
