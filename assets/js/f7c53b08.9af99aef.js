"use strict";(self.webpackChunktest=self.webpackChunktest||[]).push([[289],{3905:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return u}});var a=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,o=function(e,t){if(null==e)return{};var n,a,o={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=a.createContext({}),c=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=c(e.components);return a.createElement(s.Provider,{value:t},e.children)},h={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,o=e.mdxType,r=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),d=c(n),u=o,m=d["".concat(s,".").concat(u)]||d[u]||h[u]||r;return n?a.createElement(m,i(i({ref:t},p),{},{components:n})):a.createElement(m,i({ref:t},p))}));function u(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var r=n.length,i=new Array(r);i[0]=d;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:o,i[1]=l;for(var c=2;c<r;c++)i[c]=n[c];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},6187:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return l},contentTitle:function(){return s},metadata:function(){return c},toc:function(){return p},default:function(){return d}});var a=n(7462),o=n(3366),r=(n(7294),n(3905)),i=["components"],l={sidebar_position:7},s="Table Viewer",c={unversionedId:"frontend/table",id:"frontend/table",title:"Table Viewer",description:"The table viewer is one of the fundamental components of SemTUI, it allows",source:"@site/docs/frontend/table.md",sourceDirName:"frontend",slug:"/frontend/table",permalink:"/I2T-docs/frontend/table",editUrl:"https://github.com/I2Tunimib/I2T-docs/docs/frontend/table.md",tags:[],version:"current",sidebarPosition:7,frontMatter:{sidebar_position:7},sidebar:"tutorialSidebar",previous:{title:"Metadata components",permalink:"/I2T-docs/frontend/metadata-components"},next:{title:"Known bugs",permalink:"/I2T-docs/known-bugs"}},p=[{value:"Table component",id:"table-component",children:[],level:2}],h={toc:p};function d(e){var t=e.components,n=(0,o.Z)(e,i);return(0,r.kt)("wrapper",(0,a.Z)({},h,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"table-viewer"},"Table Viewer"),(0,r.kt)("p",null,"The table viewer is one of the fundamental components of SemTUI, it allows\nusers to efficiently visualize a table and perform various kinds of action on\nit. Before going into the details of each feature, the anatomy of the UI is\npresented to the reader."),(0,r.kt)("div",{style:{textAlign:"center"}},(0,r.kt)("img",{style:{width:"600px"},src:"/I2T-docs/img/tableviewer.png"})),(0,r.kt)("p",null,"In the above figure the table viewer is shown with each major part highlighted\nin red. Each region encloses within it, features that are logically related to\neach other:"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"includes the name of the table, which can be changed anytime by the\nuser, and a last modified date visualized in a human readable format.\nThe last modified date gets updated each time an action changes the\ndata of the table, so that the UI can alert the user if there are changes\nthat have not yet been saved. If changes have been made and not yet\nbeen saved, there are some UI elements and mechanisms to prevent the\nuser from losing its work. For example, after some changes, if the user\ntries to navigate between the application pages, e.g.: navigate back\nto the dashboard to select a new table to visualize its data, the user\nis prompted with a warning message that he needs to confirm before\nproceeding.")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"This section includes actions that can be performed on the whole table, also considered as global actions. Global actions affect the entire\nvisualization of the table, or trigger events that take into their contexts\nthe whole table. Starting from the component at the far left, a Button\nGroup enables a change to the current visualization of the table. At\nthe moment a table format and a raw format, showing the table data\nas the W3C JSON structure representation, are currently developed\ninto the sytem. Alternative views may be developed to help users visualize results. For example, a graph view can be included to support\nthe visualization of the dependencies between the table elements and\ntheir annotation mapped to a specific KG. The previously analyzed\ntool ",(0,r.kt)("a",{parentName:"p",href:"https://eprints.whiterose.ac.uk/126465/1/iosart2c.pdf"},"TableMiner+")," includes this kind of visualization that may be\nproven useful to less experienced users, giving them a better idea of the\nobtained results. The second action available in this group allows the\nuser to start a full table annotation process. Then, an export and save features allow the user to\nrespectively export the table data in one of the available formats, and\nsave changes to the server. Finally, a section is dedicated to the settings\nthat may affect how some elements of the table are displayed, and a\ntutorial to help guide users through the basics of the tool.")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"While the previous actions are included in the Toolbar component of\nthe table viewer, the following actions are part of the SubToolbar component. The SubToolbar is essentialy divided into two logic groups.\nThe first group is reserved to contextual actions which are enabled on\nthe selection of one or more table elements (cells, columns, or rows),\nand may require some conditions to be met. Some of those functionalities are row/column deletion, cell inspection, reconciliation, extension.\nFor example, the extension action is enabled when one or more columns\nare selected and the cells included in the selection have been already\nreconciliated to a KG. This group of actions also includes the undo\nfunctionality so that users can undo, or redo, changes applied to the\ntable.")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"The second group contained in the SubToolbar component, contains\nactions related to table search and filtering.")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"The table footer is left to present the user with some statistics about the\ntable: the number of columns and rows, a percentage of the annotations\nof the table cells, and some information displayed contextually to a\nselection of cells.")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Finally, the last component is the table. The table is built with a\nset of fully modular sub-components, so that future changes can be\nimplemented with ease. To efficiently render a table, ",(0,r.kt)("a",{parentName:"p",href:"https://react-table.tanstack.com/"},"React Table"),"\nhas been used. React Table provides a set of APIs to build lightweight,\nfast and extensible tables. The peculiarity of this library is that it\ndoesn\u2019t provide developers with prebuilt UI components, instead it is\na headless UI library which doesn\u2019t supply any UI elements leaving\ndevelopers in full charge of utilizing performant APIs (as a set of React\nHooks) to design their own table UI. SemTUI has tables as its core\nelements and, while it is still a prototype, it\u2019s important to ensure that\nit\u2019s architecture is future-proof in terms of development."))),(0,r.kt)("h2",{id:"table-component"},"Table component"),(0,r.kt)("p",null,"The table component is composed of multiple components so that it can be fully customizable by developers. React Table, on the other hand, provides all API and data structures to build it efficiently."),(0,r.kt)("p",null,"In the following snippets it is presented the structure of the table component. Each sub component will be imported and used by the main ",(0,r.kt)("inlineCode",{parentName:"p"},"Table")," component:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-jsx",metastring:'title="Table components"',title:'"Table','components"':!0},"\ud83d\udce6Table\n \u2523 \ud83d\udcc2EditableCell\n \u2523 \ud83d\udcc2NormalCell\n \u2523 \ud83d\udcc2SelectableHeader\n \u2523 \ud83d\udcc2SvgContainer\n \u2523 \ud83d\udcc2Table -> // Main table component\n \u2523 \ud83d\udcc2TableFooter\n \u2523 \ud83d\udcc2TableHead\n \u2523 \ud83d\udcc2TableHeaderCell\n \u2523 \ud83d\udcc2TableRoot\n \u2523 \ud83d\udcc2TableRow\n \u2523 \ud83d\udcc2TableRowCell\n \u2517 \ud83d\udcdcindex.ts\n")))}d.isMDXComponent=!0}}]);