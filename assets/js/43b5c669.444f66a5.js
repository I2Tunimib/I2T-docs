"use strict";(self.webpackChunktest=self.webpackChunktest||[]).push([[534],{3905:function(e,t,n){n.d(t,{Zo:function(){return u},kt:function(){return f}});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=r.createContext({}),l=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},u=function(e){var t=l(e.components);return r.createElement(c.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,c=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),d=l(n),f=a,m=d["".concat(c,".").concat(f)]||d[f]||p[f]||i;return n?r.createElement(m,o(o({ref:t},u),{},{components:n})):r.createElement(m,o({ref:t},u))}));function f(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=d;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s.mdxType="string"==typeof e?e:a,o[1]=s;for(var l=2;l<i;l++)o[l]=n[l];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},8971:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return s},contentTitle:function(){return c},metadata:function(){return l},toc:function(){return u},default:function(){return d}});var r=n(7462),a=n(3366),i=(n(7294),n(3905)),o=["components"],s={sidebar_position:1},c="Architecture",l={unversionedId:"backend/architecture",id:"backend/architecture",title:"Architecture",description:"Many examples of performant and scalable backend servers and",source:"@site/docs/backend/architecture.md",sourceDirName:"backend",slug:"/backend/architecture",permalink:"/I2T-docs/backend/architecture",editUrl:"https://github.com/facebook/docusaurus/edit/main/website/docs/backend/architecture.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"tutorialSidebar",previous:{title:"Framework Architecture",permalink:"/I2T-docs/architecture"},next:{title:"Application configuration",permalink:"/I2T-docs/backend/config"}},u=[{value:"Structure",id:"structure",children:[],level:2}],p={toc:u};function d(e){var t=e.components,n=(0,a.Z)(e,o);return(0,i.kt)("wrapper",(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"architecture"},"Architecture"),(0,i.kt)("p",null,"Many examples of performant and scalable backend servers and\nweb APIs are built using NodeJS or one of its frameworks, e.g.: ",(0,i.kt)("a",{parentName:"p",href:"https://expressjs.com/it/"},"Express"),",\n",(0,i.kt)("a",{parentName:"p",href:"https://nestjs.com/"},"NestJS"),", ",(0,i.kt)("a",{parentName:"p",href:"https://nextjs.org/"},"NextJs"),". The environment around NodeJS is built to support developers by integrating third party libraries that powers those systems with\neven more features. NodeJS is a great option for performance, security, scalability and development using some of the most modern technology stacks.\nFor those reasons the choices of NodeJS and Express were made to develop\nthe SemTUI backend functionalities. "),(0,i.kt)("p",null,"The backend server has two main roles to fulfill: ",(0,i.kt)("strong",{parentName:"p"},"External services aggregator")," and ",(0,i.kt)("strong",{parentName:"p"},"Datasets and tables handler"),"."),(0,i.kt)("h2",{id:"structure"},"Structure"),(0,i.kt)("p",null,"In the following snippet is shown the structure of the backend server:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-jsx",metastring:'title="Backend folders and files structure"',title:'"Backend',folders:!0,and:!0,files:!0,'structure"':!0},"\ud83d\udce6src\n \u2523 \ud83d\udcc2api\n \u2503 \u2523 \ud83d\udcc2controllers\n \u2503 \u2523 \ud83d\udcc2routes\n \u2503 \u2523 \ud83d\udcc2middleware\n \u2503 \u2517 \ud83d\udcc2services\n \u2523 \ud83d\udcc2config\n \u2523 \ud83d\udcc2services\n \u2503 \u2523 \ud83d\udcc2extenders\n \u2503 \u2517 \ud83d\udcc2reconciliators\n \u2523 \ud83d\udcc2utils\n \u2523 \ud83d\udcdcapp.js\n \u2523 \ud83d\udcdcindex.js\n \u2517 \ud83d\udcdcsocketio.js\n")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"api"),": contains the components that builds the REST API: controllers, routes, services. More details are presented in the next section."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"config"),": contains files necessary to parse the initial configuration, or are relative to the configuration of the whole application."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"services"),": contains external services configurations. At the moment external services can be reconciliators and extenders."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"utils"),": contains utility modules and functions."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"app.js"),": is the main of the Express server."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"socket.js"),": is the main of the SocketIO app."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"index.js"),": is the main of the whole application.")))}d.isMDXComponent=!0}}]);