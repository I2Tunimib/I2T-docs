"use strict";(self.webpackChunktest=self.webpackChunktest||[]).push([[40],{3905:function(e,t,a){a.d(t,{Zo:function(){return c},kt:function(){return u}});var n=a(7294);function i(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function r(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){i(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function s(e,t){if(null==e)return{};var a,n,i=function(e,t){if(null==e)return{};var a,n,i={},o=Object.keys(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||(i[a]=e[a]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(i[a]=e[a])}return i}var l=n.createContext({}),d=function(e){var t=n.useContext(l),a=t;return e&&(a="function"==typeof e?e(t):r(r({},t),e)),a},c=function(e){var t=d(e.components);return n.createElement(l.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var a=e.components,i=e.mdxType,o=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),m=d(a),u=i,h=m["".concat(l,".").concat(u)]||m[u]||p[u]||o;return a?n.createElement(h,r(r({ref:t},c),{},{components:a})):n.createElement(h,r({ref:t},c))}));function u(e,t){var a=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=a.length,r=new Array(o);r[0]=m;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:i,r[1]=s;for(var d=2;d<o;d++)r[d]=a[d];return n.createElement.apply(null,r)}return n.createElement.apply(null,a)}m.displayName="MDXCreateElement"},9181:function(e,t,a){a.r(t),a.d(t,{frontMatter:function(){return s},contentTitle:function(){return l},metadata:function(){return d},toc:function(){return c},default:function(){return m}});var n=a(7462),i=a(3366),o=(a(7294),a(3905)),r=["components"],s={sidebar_position:4},l="Dataset handler",d={unversionedId:"backend/dataset-handler",id:"backend/dataset-handler",title:"Dataset handler",description:"Tables are organized in a hierarchical",source:"@site/docs/backend/dataset-handler.md",sourceDirName:"backend",slug:"/backend/dataset-handler",permalink:"/I2T-docs/backend/dataset-handler",editUrl:"https://github.com/facebook/docusaurus/edit/main/website/docs/backend/dataset-handler.md",tags:[],version:"current",sidebarPosition:4,frontMatter:{sidebar_position:4},sidebar:"tutorialSidebar",previous:{title:"Rest API",permalink:"/I2T-docs/backend/rest-api"},next:{title:"External services aggregator",permalink:"/I2T-docs/backend/services-aggregator"}},c=[{value:"Datasets and tables collections",id:"datasets-and-tables-collections",children:[],level:2},{value:"Mapping dataset/table fields to UI views",id:"mapping-datasettable-fields-to-ui-views",children:[],level:2}],p={toc:c};function m(e){var t=e.components,a=(0,i.Z)(e,r);return(0,o.kt)("wrapper",(0,n.Z)({},p,a,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"dataset-handler"},"Dataset handler"),(0,o.kt)("p",null,"Tables are organized in a hierarchical\nstructure composed of datasets that are directories containing one or more\ntables. This structure makes it possible to better organize tables for the\nusers, but also enabling STI approaches that work with a group of tables\n(e.g.: Mantis Table is able to obtain better annotation results using multiple\ntables at the same time)."),(0,o.kt)("p",null,'The access, creation, update, deletion, and search of tables is handled by\na software layer denominated Datasets and Tables handler. The objective of\nthis layer is to provide an interaction between an API functionality and the\nstore of tables informations. When a new table is uploaded to the server,\nit is parsed to an internal format so that it can be easier treated by the\napplication. Once converted, it is then stored on the server. The internal\nformat is never exposed to the user because it isn\u2019t useful for any other\napplication, instead, if the user requires the data of a table, it is parsed\nto one of the available formats. At the moment, tables informations aren\u2019t\nstored in a real database, instead the file system of the server is used. Tables\nare directly stored in the datasets stucture, while their meta information\n(e.g.: id, table name, last modfied data) are maintained in two MongoDB\ncollections-like structures using JSON files. For this reason, the layer is\ncalled with a generic name "handler", because it can be modified, to include\na connection to real a database, so that those operations can be more efficient\nand performant.'),(0,o.kt)("h2",{id:"datasets-and-tables-collections"},"Datasets and tables collections"),(0,o.kt)("p",null,"Datasets and tables are handled by the Dataset Service located in ",(0,o.kt)("inlineCode",{parentName:"p"},"/src/api/services/datasets/dataset.service.js"),".\nAt the moment of writing, no real database exists and it is all handled on the local filesystem."),(0,o.kt)("p",null,"The local filesystem is based on two MongoDB collections which are handled with two ",(0,o.kt)("strong",{parentName:"p"},"JSON")," files:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Dataset collection: ",(0,o.kt)("inlineCode",{parentName:"li"},"/public/datasets.info.json")),(0,o.kt)("li",{parentName:"ul"},"Tables collection: ",(0,o.kt)("inlineCode",{parentName:"li"},"/public/tables.info.json"))),(0,o.kt)("p",null,"For example a dataset entry for the ",(0,o.kt)("inlineCode",{parentName:"p"},"datasets.info.json")," looks like the following:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-json"},'  "42": {\n    "id": "42",\n    "name": "Round4_2020",\n    "description": "Dataset from Semtab 2020",\n    "mentions": 486847,\n    "nTables": 49,\n    "lastModifiedDate": "2021-12-09T16:58:39.655Z",\n    "mantisDatasetName": "VajQkEFp_UH1Bg61dAocF",\n    "mantisId": 3\n  }\n')),(0,o.kt)("p",null,"A table entry for the ",(0,o.kt)("inlineCode",{parentName:"p"},"tables.info.json")," looks like the following:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-json"},'  "90": {\n    "id": "90",\n    "idDataset": "42",\n    "name": "0A4KYJH5",\n    "nCols": 3,\n    "nRows": 20,\n    "nCells": 60,\n    "nCellsReconciliated": 40,\n    "lastModifiedDate": "2021-12-09T17:02:25.949Z",\n    "mantisId": 0,\n    "mantisStatus": "DONE"\n  }\n')),(0,o.kt)("p",null,"Dataset and tables files are then organized in a hierarchical structure in ",(0,o.kt)("inlineCode",{parentName:"p"},"/public/datasets/[datasetId]/[tableId].json")," where each json file corresponds to a table of dataset with id ",(0,o.kt)("inlineCode",{parentName:"p"},"datasetId"),". By considering the bow examples the following path would exist: ",(0,o.kt)("inlineCode",{parentName:"p"},"/public/datasets/42/90.json"),"."),(0,o.kt)("h2",{id:"mapping-datasettable-fields-to-ui-views"},"Mapping dataset/table fields to UI views"),(0,o.kt)("p",null,"In the future, the data returned from a GET endpoint for a dataset or a table could change: some data could be removed, some data could be added, or some data could be modified. To facilitate those changes two javascript objects describe which data fields should be rendered and how they should be rendered in the frontend application."),(0,o.kt)("p",null,"The data fields for both dataset and table entries are described by two javascript objects located in ",(0,o.kt)("inlineCode",{parentName:"p"},"/src/api/services/datasets/dataset.service.js"),":"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"const COLLECTION_DATASETS_MAP = {\n  name: {\n    label: 'Name',\n    // type: 'date' | 'percentage' | 'tag'\n  },\n  description: {\n    label: 'Description'\n  },\n  nTables: {\n    label: 'N. Tables'\n  },\n  mentions: {\n    label: 'N. Mentions'\n  },\n  lastModifiedDate: {\n    label: 'Last Modified',\n    type: 'date'\n  }\n}\n")),(0,o.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"info")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},(0,o.kt)("inlineCode",{parentName:"p"},"Type")," corresponds to a UI componenent. Check ",(0,o.kt)("a",{parentName:"p",href:"/I2T-docs/frontend/dashboard-components"},"here")," how to add new UI component. If ",(0,o.kt)("inlineCode",{parentName:"p"},"type")," is omitted the field is treated as text. The data fields included\nin the object will be displayed in the UI, meanwhile all others fields are left out of the visualization."))),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"const COLLECTION_TABLES_MAP = {\n  name: {\n    label: 'Name'\n  },\n  nCols: {\n    label: 'N. Cols'\n  },\n  nRows: {\n    label: 'N. Rows'\n  },\n  completion: {\n    label: 'Completion',\n    type: 'percentage'\n  },\n  lastModifiedDate: {\n    label: 'Last Modified',\n    type: 'date'\n  }\n}\n")),(0,o.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"info")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},(0,o.kt)("inlineCode",{parentName:"p"},"Type")," corresponds to a UI componenent. Check ",(0,o.kt)("a",{parentName:"p",href:"/I2T-docs/frontend/dashboard-components"},"here"),"  how to add new UI component. If ",(0,o.kt)("inlineCode",{parentName:"p"},"type")," is omitted the field is treated as text. The data fields included\nin the object will be displayed in the UI, meanwhile all others fields are left out of the visualization."))))}m.isMDXComponent=!0}}]);