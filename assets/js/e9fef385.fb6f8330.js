"use strict";(self.webpackChunktest=self.webpackChunktest||[]).push([[931],{3905:function(e,t,n){n.d(t,{Zo:function(){return d},kt:function(){return h}});var a=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var l=a.createContext({}),c=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},d=function(e){var t=c(e.components);return a.createElement(l.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},p=a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,r=e.originalType,l=e.parentName,d=o(e,["components","mdxType","originalType","parentName"]),p=c(n),h=i,f=p["".concat(l,".").concat(h)]||p[h]||u[h]||r;return n?a.createElement(f,s(s({ref:t},d),{},{components:n})):a.createElement(f,s({ref:t},d))}));function h(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var r=n.length,s=new Array(r);s[0]=p;var o={};for(var l in t)hasOwnProperty.call(t,l)&&(o[l]=t[l]);o.originalType=e,o.mdxType="string"==typeof e?e:i,s[1]=o;for(var c=2;c<r;c++)s[c]=n[c];return a.createElement.apply(null,s)}return a.createElement.apply(null,n)}p.displayName="MDXCreateElement"},4730:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return o},contentTitle:function(){return l},metadata:function(){return c},toc:function(){return d},Highlight:function(){return u},default:function(){return h}});var a=n(7462),i=n(3366),r=(n(7294),n(3905)),s=["components"],o={sidebar_position:3},l="Thunk middleware",c={unversionedId:"frontend/thunk",id:"frontend/thunk",title:"Thunk middleware",description:"Redux doesn\u2019t allow any side effects in its reducer",source:"@site/docs/frontend/thunk.md",sourceDirName:"frontend",slug:"/frontend/thunk",permalink:"/I2T-docs/frontend/thunk",editUrl:"https://github.com/facebook/docusaurus/edit/main/website/docs/frontend/thunk.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"tutorialSidebar",previous:{title:"Store",permalink:"/I2T-docs/frontend/store"},next:{title:"Components tree",permalink:"/I2T-docs/frontend/components"}},d=[{value:"APIs configuration",id:"apis-configuration",children:[],level:2},{value:"Thunk definition",id:"thunk-definition",children:[{value:"Thunk statuses",id:"thunk-statuses",children:[],level:3},{value:"Mapping thunk statuses to reducers",id:"mapping-thunk-statuses-to-reducers",children:[],level:3}],level:2}],u=function(e){var t=e.children,n=e.color;return(0,r.kt)("span",{style:{backgroundColor:n,borderRadius:"2px",color:"#000",padding:"0.2rem"}},t)},p={toc:d,Highlight:u};function h(e){var t=e.components,n=(0,i.Z)(e,s);return(0,r.kt)("wrapper",(0,a.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"thunk-middleware"},"Thunk middleware"),(0,r.kt)("p",null,"Redux doesn\u2019t allow any side effects in its reducer\nfunctions, preventing developers to encapsulate the whole application logic\nin a single place. SemTUI makes use of a particular middleware layer, introduced between an action dispatcher and a reducer function, allowing to\nexecute any side effects before reaching a reducer. This middleware layer is\ncalled thunk. Thunk is a general term that means a piece of code that does\nsome delayed work. Rather than executing some logic now, a function can be\ncalled to perform an action later on. In Redux specifically, thunks are a pattern which encapsulates logic, including asynchronous logic, inside functions\nthat can interact with the global store through other action dispatchers and\nslices of the state."),(0,r.kt)("p",null,"Earlier, a schema describing the data flow between React components\nand the Redux global store has been presented. When async\nlogic is added to the workflow, an extra step is added where a middleware can\nrun logic like AJAX requests and dispatch results to a reducer, updating the\nstore."),(0,r.kt)("div",{style:{textAlign:"center"}},(0,r.kt)("img",{style:{width:"600px"},src:"/I2T-docs/img/thunk-flow.png"})),(0,r.kt)("p",null,"As a framework, SemTUI builds on top of thunks to support future thunk\nactions, exposing for each of them a status of loading, error and fullfilled.\nEach status can be mapped to a specific reducer function allowing to be\nautomatically executed based on the async request result. Those statuses\nare also available to be requested by a component through a normal redux\nselector."),(0,r.kt)("p",null,"The API layer is also built to be expandable with additional API endpoints through a configuration file. The path for each specified endpoint is\nparsed to substitute possible additional dynamic parameters. For example,\nlet\u2019s imagine to reconcile a set of selected labels cells of the currently loaded\ntable. The steps to complete the process are the following:"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"multiple actions (SELECT CELL) are dispatched when a select event\noccurs;"),(0,r.kt)("li",{parentName:"ol"},"a reducer function takes as input the id of a cell and updates the state\nto set the cell to selected. This step will be repeated each time an\naction SELECT CELL will be fired;"),(0,r.kt)("li",{parentName:"ol"},"once the user has selected all of the desired table cells, a thunk action\ncan be initiated to query a specific reconciliator endpoint;"),(0,r.kt)("li",{parentName:"ol"},"the thunk middleware receives the action payload with the currently\nselected cells and queries a reconciliation endpoint;"),(0,r.kt)("li",{parentName:"ol"},"the reconciliation endpoint, e.g.: RECONCILE ASIA, is previously de-\nfined where the path to it is specified;"),(0,r.kt)("li",{parentName:"ol"},"if the request fails, the error is automatically handled by the framework,\nso that no additional code is required when additional endpoints are\nadded;"),(0,r.kt)("li",{parentName:"ol"},"if the request fullfills without errors, a reducer function is mapped to\nthis state and will be automatically executed to update the selected cells\nwith the annotation metadata obtained from the reconciliator service;"),(0,r.kt)("li",{parentName:"ol"},"finally, a selector, which was previously defined to select the table data,\nhas some of the dependencies changed (some cells got updated) and\nthe value is recomputed and returned to the component responsible to\nrerender the current view of the table.")),(0,r.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"info")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},"If the result of an API endpoint doesn\u2019t\naffect the global state, the endpoint can be directly queried from a component\nthrough the API layer without defining any thunk action."))),(0,r.kt)("h2",{id:"apis-configuration"},"APIs configuration"),(0,r.kt)("p",null,"The APIs can be defined in the ",(0,r.kt)("inlineCode",{parentName:"p"},"config.ts")," situated in the root of ",(0,r.kt)("inlineCode",{parentName:"p"},"src")," directory:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts",metastring:'title="config.ts"',title:'"config.ts"'},"const CONFIG: AppConfig = {\n  API: {\n    // global endpoint prefixed to each path, unless useGlobal is set to false\n    GLOBAL: process.env.REACT_APP_BACKEND_API_URL || '',\n\n    ENDPOINTS: {\n      GET_SERVICES_CONFIG: {\n        path: '/config',\n        // prefix global endpoint to /config. If not specified it defaults to true\n        useGlobal: true\n      },\n      GET_DATASET: {\n        path: '/dataset'\n      },\n      GET_TABLE: {\n        path: '/dataset/:datasetId/table/:tableId'\n      },\n      DELETE_DATASET: {\n        path: '/dataset/:datasetId'\n      },\n      ...\n    }\n  }\n};\n")),(0,r.kt)("p",null,"Endpoints can then be used to build an async function which can then be executed to query the specified endpoint. The endpoints function are situated in the ",(0,r.kt)("inlineCode",{parentName:"p"},"services")," directory:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts",metastring:'title="services/api/datasets.ts"',title:'"services/api/datasets.ts"'},"// an API object includes a set of async function to query the endpoints previously defined\nconst datasetAPI = {\n  getDataset: (params: Record<string, string | number> = {}) => {\n    return apiClient.get<GetCollectionResult<Dataset>>(apiEndpoint({\n      // name of object of the configuration\n      endpoint: 'GET_DATASET', \n    }), { clearCacheEntry: true });\n  },\n  uploadDataset: (formData: FormData) => {\n    return apiClient.post(\n      apiEndpoint({\n        endpoint: 'UPLOAD_DATASET'\n      }),\n      formData\n    );\n  },\n  deleteDataset: (datasetId: string) => {\n    return apiClient.delete(\n      apiEndpoint({\n        endpoint: 'DELETE_DATASET',\n        // to specify parameters. Parameters are prefixed by ':'\n        // For exammple /dataset/:datasetId will be transformed to /dataset/[valueOfTheVariableDatasetId]\n        paramsValue: { datasetId }\n      })\n    );\n  },\n  ...\n};\n")),(0,r.kt)("h2",{id:"thunk-definition"},"Thunk definition"),(0,r.kt)("p",null,"APIs functions can the be used in a thunk defined in a ",(0,r.kt)("inlineCode",{parentName:"p"},"*.thunks.ts")," of a store slice:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts",metastring:'title="store/slices/datasets/datasets.thunks.ts"',title:'"store/slices/datasets/datasets.thunks.ts"'},"const ACTION_PREFIX = 'dataset';\n\nexport enum DatasetThunkActions {\n  GET_DATASET = 'getDataset',\n  ...\n}\n\nexport const getDataset = createAsyncThunk(\n  `${ACTION_PREFIX}/${DatasetThunkActions.GET_DATASET}`,\n  async () => {\n    const response = await datasetAPI.getDataset();\n    return response.data;\n  }\n);\n")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"ACTION_PREFIX"),": each slice thunk has a prefix manually defined by the developer."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"GET_DATASET"),": is an enum defining the name of the action. It is important to define it to keep track of the status of async operation.")),(0,r.kt)("h3",{id:"thunk-statuses"},"Thunk statuses"),(0,r.kt)("p",null,"Each thunk when executed has three states:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)(u,{color:"rgba(255,199,0,0.24)",mdxType:"Highlight"},"pending"),": the async operation is currently pending;"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)(u,{color:"rgba(74,201,155,0.24)",mdxType:"Highlight"},"fullfilled"),": the async operation terminated without errors;"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)(u,{color:"rgba(244,87,37,0.24)",mdxType:"Highlight"},"error"),": the async operation terminated with some errors;")),(0,r.kt)("p",null,"A selector can be built to retrieve the status of the request:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"export const selectGetDatasetStatus = createSelector(\n  selectRequests,\n  (requests) => getRequestStatus(requests, DatasetThunkActions.GET_DATASET)\n);\n")),(0,r.kt)("p",null,"And then can be used, like any other selector, inside a component:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-tsx"},"const SomeComponent = () => {\n  const dispatch = useAppDispatch();\n  const { pending, error } = useAppSelector(selectGetDatasetStatus);\n\n  const onClick = () => {\n    dispatch(getDataset());\n  },\n  // if request is pending\n  if (pending) {\n    return <div>Loading...</div>\n  }\n  // if request returned any error\n  if (error) {\n    return <div>{error[0].status}</div>\n  }\n  // if request fullfilled\n  return (\n    ...\n  )\n}\n")),(0,r.kt)("h3",{id:"mapping-thunk-statuses-to-reducers"},"Mapping thunk statuses to reducers"),(0,r.kt)("p",null,"You can directly map a request status to a reducer function of a slice, so that the state of the slice can be updated automatically when the status changes:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts",metastring:'title="store/slices/dataset/dataset.slice.ts"',title:'"store/slices/dataset/dataset.slice.ts"'},"export const datasetsSlice = createSliceWithRequests({\n  name: 'datasets',\n  initialState,\n  reducers: {\n    // normal reducers\n    ...\n  },\n  // reducers mapped to thunk statuses\n  extraRules: (builder) => (\n    builder\n      // on thunk request fullfilled update datasets\n      // (getDataset is the thunk action exported from the dataset.thunks.ts)\n      .addCase(getDataset.fulfilled,\n        (state, action: PayloadAction<GetCollectionResult<Dataset>>) => {\n          const { meta, collection } = action.payload;\n          state.entities.metaDatasets = meta;\n          state.entities.datasets = collection\n            .reduce<DatasetsInstancesState>((acc, { id, ...rest }) => {\n              acc.byId[id] = {\n                id,\n                tables: [],\n                ...rest\n              };\n              acc.allIds.push(id);\n              return acc;\n            }, { byId: {}, allIds: [] });\n        })\n      .addCase(...)\n      ...\n  )\n});\n")))}h.isMDXComponent=!0}}]);