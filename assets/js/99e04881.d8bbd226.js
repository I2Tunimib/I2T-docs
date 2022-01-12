"use strict";(self.webpackChunktest=self.webpackChunktest||[]).push([[25],{3905:function(e,t,n){n.d(t,{Zo:function(){return u},kt:function(){return f}});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var c=r.createContext({}),p=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},u=function(e){var t=p(e.components);return r.createElement(c.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,c=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),d=p(n),f=o,h=d["".concat(c,".").concat(f)]||d[f]||s[f]||i;return n?r.createElement(h,a(a({ref:t},u),{},{components:n})):r.createElement(h,a({ref:t},u))}));function f(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,a=new Array(i);a[0]=d;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l.mdxType="string"==typeof e?e:o,a[1]=l;for(var p=2;p<i;p++)a[p]=n[p];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},6550:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return l},contentTitle:function(){return c},metadata:function(){return p},toc:function(){return u},default:function(){return d}});var r=n(7462),o=n(3366),i=(n(7294),n(3905)),a=["components"],l={sidebar_position:4},c="Deploy",p={unversionedId:"deploy",id:"deploy",title:"Deploy",description:"At the moment the frontend and server application are both served by the backend. At deploy time, the frontend application is built in static files which are then served by the backend server, while also providing SemTUI APIs.",source:"@site/docs/deploy.md",sourceDirName:".",slug:"/deploy",permalink:"/I2T-docs/deploy",editUrl:"https://github.com/I2Tunimib/I2T-docs/docs/deploy.md",tags:[],version:"current",sidebarPosition:4,frontMatter:{sidebar_position:4},sidebar:"tutorialSidebar",previous:{title:"How to run",permalink:"/I2T-docs/how-to-run"},next:{title:"Framework Architecture",permalink:"/I2T-docs/architecture"}},u=[{value:"GitHub CD workflow",id:"github-cd-workflow",children:[],level:2}],s={toc:u};function d(e){var t=e.components,n=(0,o.Z)(e,a);return(0,i.kt)("wrapper",(0,r.Z)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"deploy"},"Deploy"),(0,i.kt)("p",null,"At the moment the frontend and server application are both served by the backend. At deploy time, the frontend application is built in static files which are then served by the backend server, while also providing SemTUI APIs."),(0,i.kt)("h2",{id:"github-cd-workflow"},"GitHub CD workflow"),(0,i.kt)("p",null,"When pushing to the ",(0,i.kt)("inlineCode",{parentName:"p"},"main")," branch of each repository a GitHub workflow deploys automatically the application as a docker image. The workflow follows the following steps:"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"Both repositories are checkout out locally in the remote GitHub runner."),(0,i.kt)("li",{parentName:"ol"},"The frontend application builds the static files with ",(0,i.kt)("inlineCode",{parentName:"li"},"npm run build"),". Static files are placed in a directory called ",(0,i.kt)("inlineCode",{parentName:"li"},"build"),"."),(0,i.kt)("li",{parentName:"ol"},"The build files are then placed in the root directory of the backend cloned repository."),(0,i.kt)("li",{parentName:"ol"},"A ",(0,i.kt)("inlineCode",{parentName:"li"},".env")," file is created with Secrets placed securely in the GitHub repository settings."),(0,i.kt)("li",{parentName:"ol"},"A docker image is built and pushed to the GitHub container: ",(0,i.kt)("a",{parentName:"li",href:"https://github.com/I2Tunimib/I2T-frontend/pkgs/container/tui"},"https://github.com/I2Tunimib/I2T-frontend/pkgs/container/tui")),(0,i.kt)("li",{parentName:"ol"},"Connect to the remote deploy server via SSH."),(0,i.kt)("li",{parentName:"ol"},"Pull the new image, stop the old container and start a new one with the new image running")))}d.isMDXComponent=!0}}]);