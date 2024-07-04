"use strict";(self.webpackChunktest=self.webpackChunktest||[]).push([[284],{3905:function(e,t,n){n.d(t,{Zo:function(){return s},kt:function(){return m}});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var p=a.createContext({}),c=function(e){var t=a.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},s=function(e){var t=c(e.components);return a.createElement(p.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,p=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),d=c(n),m=r,k=d["".concat(p,".").concat(m)]||d[m]||u[m]||o;return n?a.createElement(k,i(i({ref:t},s),{},{components:n})):a.createElement(k,i({ref:t},s))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,i=new Array(o);i[0]=d;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l.mdxType="string"==typeof e?e:r,i[1]=l;for(var c=2;c<o;c++)i[c]=n[c];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},1814:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return l},contentTitle:function(){return p},metadata:function(){return c},toc:function(){return s},default:function(){return d}});var a=n(7462),r=n(3366),o=(n(7294),n(3905)),i=["components"],l={sidebar_position:3},p="How to run",c={unversionedId:"how-to-run",id:"how-to-run",title:"How to run",description:"To run the application locally both client and server applications have to run at the same time.",source:"@site/docs/how-to-run.md",sourceDirName:".",slug:"/how-to-run",permalink:"/I2T-docs/how-to-run",editUrl:"https://github.com/I2Tunimib/I2T-docs/docs/how-to-run.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"tutorialSidebar",previous:{title:"Introduction",permalink:"/I2T-docs/"},next:{title:"Deploy",permalink:"/I2T-docs/deploy"}},s=[{value:"Start backend application",id:"start-backend-application",children:[],level:2},{value:"Start backend application (With docker)",id:"start-backend-application-with-docker",children:[],level:2},{value:"Start frontend application",id:"start-frontend-application",children:[],level:2}],u={toc:s};function d(e){var t=e.components,n=(0,r.Z)(e,i);return(0,o.kt)("wrapper",(0,a.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"how-to-run"},"How to run"),(0,o.kt)("p",null,"To run the application locally both client and server applications have to run at the same time."),(0,o.kt)("h2",{id:"start-backend-application"},"Start backend application"),(0,o.kt)("p",null,"Ensure that you have installed ",(0,o.kt)("inlineCode",{parentName:"p"},"NodeJS")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"npm")," before continuing."),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"Clone the repository:")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"git clone https://github.com/I2Tunimib/I2T-backend.git\n")),(0,o.kt)("ol",{start:2},(0,o.kt)("li",{parentName:"ol"},"Install all required packages:")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"cd I2T-backend && npm install\n")),(0,o.kt)("ol",{start:3},(0,o.kt)("li",{parentName:"ol"},"Create a ",(0,o.kt)("inlineCode",{parentName:"li"},".env")," file in the root of the application. Copy the content of the file .env-sample in your .env file and comment/uncomment/add variables as you need.")),(0,o.kt)("ol",{start:4},(0,o.kt)("li",{parentName:"ol"},"Launch the application:")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"npm run start-dev\n")),(0,o.kt)("p",null,"On the first run, a folder ",(0,o.kt)("inlineCode",{parentName:"p"},"public")," is created to host datasets, tables, and users. The ",(0,o.kt)("inlineCode",{parentName:"p"},"users.info.json")," file is populated with ",(0,o.kt)("inlineCode",{parentName:"p"},"username: test")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"password: test"),", that can be used to signin. More users can be added by modifying that file."),(0,o.kt)("h2",{id:"start-backend-application-with-docker"},"Start backend application (With docker)"),(0,o.kt)("p",null,"Ensure that you habe installed ",(0,o.kt)("inlineCode",{parentName:"p"},"Docker")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"docker-compose")," before continuing."),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"Clone the repository:")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"git clone https://github.com/I2Tunimib/I2T-backend.git\n")),(0,o.kt)("ol",{start:2},(0,o.kt)("li",{parentName:"ol"},"Create a ",(0,o.kt)("inlineCode",{parentName:"li"},".env")," file in the root of the application. Copy the content of the file .env-sample in your .env file and comment/uncomment/add variables as you need.")),(0,o.kt)("ol",{start:3},(0,o.kt)("li",{parentName:"ol"},"Build docker image and start the container:")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"docker-compose -f docker-compose.dev.yml up\n")),(0,o.kt)("p",null,"On the first run, a folder ",(0,o.kt)("inlineCode",{parentName:"p"},"public")," is created to host datasets, tables, and users. The ",(0,o.kt)("inlineCode",{parentName:"p"},"users.info.json")," file is populated with ",(0,o.kt)("inlineCode",{parentName:"p"},"username: test")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"password: test"),", that can be used to signin. More users can be added by modifying that file."),(0,o.kt)("h2",{id:"start-frontend-application"},"Start frontend application"),(0,o.kt)("p",null,"Ensure that you have installed ",(0,o.kt)("inlineCode",{parentName:"p"},"NodeJS")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"npm")," before continuing."),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"Clone the repository:")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"git clone https://github.com/I2Tunimib/I2T-frontend.git\n")),(0,o.kt)("ol",{start:2},(0,o.kt)("li",{parentName:"ol"},"Install all required packages:")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"cd I2T-frontend && npm install\n")),(0,o.kt)("ol",{start:3},(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Create a ",(0,o.kt)("inlineCode",{parentName:"p"},".env")," file in the root of the application and fill it with the content you can find ",(0,o.kt)("a",{parentName:"p",href:"https://drive.google.com/file/d/1Bb1Xqmrw1Vo8I2j9-IfQpZZNa5QMU6_-/view?usp=sharing"},"here")," (you can access the content with a unimib account).")),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Launch the application:"))),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"npm run start\n")))}d.isMDXComponent=!0}}]);