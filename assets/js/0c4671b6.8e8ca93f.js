"use strict";(self.webpackChunktest=self.webpackChunktest||[]).push([[403],{3905:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return u}});var i=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,i,a=function(e,t){if(null==e)return{};var n,i,a={},o=Object.keys(e);for(i=0;i<o.length;i++)n=o[i],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(i=0;i<o.length;i++)n=o[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=i.createContext({}),s=function(e){var t=i.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):r(r({},t),e)),n},p=function(e){var t=s(e.components);return i.createElement(l.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},f=i.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),f=s(n),u=a,m=f["".concat(l,".").concat(u)]||f[u]||d[u]||o;return n?i.createElement(m,r(r({ref:t},p),{},{components:n})):i.createElement(m,r({ref:t},p))}));function u(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,r=new Array(o);r[0]=f;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c.mdxType="string"==typeof e?e:a,r[1]=c;for(var s=2;s<o;s++)r[s]=n[s];return i.createElement.apply(null,r)}return i.createElement.apply(null,n)}f.displayName="MDXCreateElement"},4515:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return c},contentTitle:function(){return l},metadata:function(){return s},toc:function(){return p},default:function(){return f}});var i=n(7462),a=n(3366),o=(n(7294),n(3905)),r=["components"],c={sidebar_position:2},l="Application configuration",s={unversionedId:"backend/config",id:"backend/config",title:"Application configuration",description:"Main",source:"@site/docs/backend/config.md",sourceDirName:"backend",slug:"/backend/config",permalink:"/I2T-docs/backend/config",editUrl:"https://github.com/I2Tunimib/I2T-docs/docs/backend/config.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"Architecture",permalink:"/I2T-docs/backend/architecture"},next:{title:"Rest API",permalink:"/I2T-docs/backend/rest-api"}},p=[{value:"Main",id:"main",children:[],level:2},{value:"Configuration",id:"configuration",children:[],level:2}],d={toc:p};function f(e){var t=e.components,n=(0,a.Z)(e,r);return(0,o.kt)("wrapper",(0,i.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"application-configuration"},"Application configuration"),(0,o.kt)("h2",{id:"main"},"Main"),(0,o.kt)("p",null,"The main of the entire application is the ",(0,o.kt)("inlineCode",{parentName:"p"},"index.js")," file situated in the root of the ",(0,o.kt)("inlineCode",{parentName:"p"},"src")," directory.\nThe main imports three files in the following order:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"// import config to load configuration which will be used everywhere else\n// MUST BE BEFORE ANYTHING ELSE\nimport './config/index'\n// setup express server API\nimport './app';\n// setup socketIO connection and channels\nimport './socketio';\n")),(0,o.kt)("h2",{id:"configuration"},"Configuration"),(0,o.kt)("p",null,"The application exposes a configuration to setup paths and services. In the root of the application a file ",(0,o.kt)("inlineCode",{parentName:"p"},"config.js")," can be found:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js",metastring:'title="./config.js"',title:'"./config.js"'},"export default {\n  // path to dataset files relative to root folder\n  datasetFilesPath: '/public/datasets',\n  // path to dataset db relative to root folder\n  datasetDbPath: '/public/datasets.info.json',\n  // path to tables db relative to root folder\n  tablesDbPath: '/public/tables.info.json',\n  // path to folder with temporary files\n  tmpPath: '/tmp',\n\n  services: {\n    // path to services relative to src folder\n    path: '/services',\n    // specify services to exclude during config initialization\n    // excluded services won't be loaded during app startup\n    exclude: {\n      extenders: [],\n      reconciliators: ['lamapi']\n    }\n  }\n}\n")),(0,o.kt)("p",null,"When the application starts up, the configuration will be parsed and various options are made available through an in memory object:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js",metastring:'title="./config/index.js"',title:'"./config/index.js"'},"...\nconst config = await loadConfig();\nexport default config;\n")),(0,o.kt)("p",null,"So that the configuration can be imported into any other component:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js",metastring:'title="./api/services/datasets.service.js"',title:'"./api/services/datasets.service.js"'},"...\nimport config from '../../../config/index';\n\nconst { \n  // get the path to the file containing the collection of the datasets\n  getDatasetDbPath,\n  // get the path to the file containing the collection of the tables\n  getTablesDbPath,\n  // get the path to the files of datasets\n  getDatasetFilesPath,\n  // get path to temp folder\n  getTmpPath,\n  // check ./config/index.js for all of the options available\n} = config.helpers;\n\n...\n")),(0,o.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"info")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},"Check ",(0,o.kt)("inlineCode",{parentName:"p"},"./config/index.js")," for all of the options available in the exported ",(0,o.kt)("inlineCode",{parentName:"p"},"config")," object."))))}f.isMDXComponent=!0}}]);