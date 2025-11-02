---
sidebar_position: 3
---

# Frontend Integration
### 1. Update API Service Module
The first step is to extend the main API layer to include support for the new Service Category.
Each category communicates with its corresponding backend endpoint through a dedicated API method.

```js title="src/services/api/table.ts"
const tableAPI = {
  // New endpoint for newCategoryService
  newCategoryService: async (
    baseUrl: string,
    data: any,
    tableId?: string,
    datasetId?: string,
    columnName?: string
  ) => {
    const headers: Record<string, string> = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    if (tableId && datasetId) {
      console.log(
        `Adding headers for newCategoryService: tableId: ${tableId}, datasetId: ${datasetId}, columnName: ${columnName}`
      );

      // Clean values to remove BOM and other problematic characters
      const cleanTableId = tableId.replace(/\uFEFF/g, "").trim();
      const cleanDatasetId = datasetId.replace(/\uFEFF/g, "").trim();
      const cleanColumnName = columnName ? columnName.replace(/\uFEFF/g, "").trim() : "";

      headers["X-Table-Dataset-Info"] = `tableId:${cleanTableId};datasetId:${cleanDatasetId}${
        cleanColumnName ? `;columnName:${cleanColumnName}` : ""
      }`;
    }
    console.log("newServiceOperation request headers:", headers);

    // Clean baseUrl to remove BOM characters
    const cleanBaseUrl = baseUrl.replace(/\uFEFF/g, "").trim();
    console.log("newServiceOperation request URL:", `newCategoryService${cleanBaseUrl}`);
    console.log("newServiceOperation request data:", data);
    console.log("newCategoryService request config:", { headers, clearCacheEntry: true });

    return apiClient.post(`newCategories${cleanBaseUrl}`, data, {
      headers, 
      clearCacheEntry: true, // Bypass cache for this request
    });
  },
...
};
```
### 2. Update the Global Store (Config and Table Slices)
In this step, integrate the new Category Service into the frontend global store.
This involves updating the Redux slices and selectors for configuration (`config`) and tables (`table`) so that
the application can:
- Load available newCategory services from the backend,
- Track UI state (open dialog, selection, etc.),
- Handle requests and update the table state accordingly.
```js title="src/store/slices/config/interfaces/config.ts"
export interface IConfigState extends RequestEnhancedState {
  app: AppConfig;
  entities: {
    ...
    newCategories: newCategoriesState;
  };
}

export interface newCategoriesState extends BaseState<newCategory> {}

export interface newCategory extends Record<string, any> {
  id: ID;
  name: string;
  relativeUrl: string;
  description: string;
  formParams: FormInputParams[];
}
```
```js title="src/store/slices/config/config.slice.ts"
const initialState: IConfigState = {
  app: CONFIG,
  entities: {
    ...,
    newCategories: { byId: {}, allIds: [] },
  },
  _requests: { byId: {}, allIds: [] },

  const newCategories = payload.newCategories || payload.extensions || [];

  console.log("Config slice - found data:", {
    ...,
      newCategories: {
        type: typeof newCategories,
        isArray: Array.isArray(newCategories),
        length: newCategories?.length,
      },
    });

    // Process newCategories if they exist and are an array
    if (Array.isArray(newCategories)) {
    newCategories.forEach((newCategory) => {
        state.entities.newCategories.byId[newCategory.id] = newCategory;
        state.entities.newCategories.allIds.push(newCategory.id);
      });
    } else {
      console.warn("Config slice - newCategories not found or not an array");
    }
  }),
});
```
```js title="src/store/slices/config/config.selectors.ts"
// select newCategories
export const selectNewCategories = (state: RootState) =>
  state.config.entities.newCategories;

export const selectNewCategoriesAsObject = createSelector(
  selectNewCategories,
  (newCategories) => newCategories.byId
);

export const selectNewCategoriesAsArray = createSelector(
  selectNewCategories,
  (newCategories) =>
    newCategories.allIds
      .map((id) => newCategories.byId[id])
      .sort((a, b) => a.name.localeCompare(b.name))
);
```
```js title="src/store/slices/table/interfaces/table.ts"
export interface TableUIState {
  ...
  openNewServiceOperationDialog: boolean;
  ...
}

export interface newCategoryServiceFulfilledPayload {
    columns: ColumnState["byId"];
    rows: RowState["byId"];
}
```
```js title="src/store/slices/table/table.selectors.ts"
export const selectNewCategoryServiceRequestStatus = createSelector(
  selectRequests,
  (requests) => getRequestStatus(requests, TableThunkActions.NEW_CATEGORY_SERVICE)
);
/**
 * Get new service operation dialog status.
 */
export const selectNewServiceOperationDialogStatus = createSelector(
  selectUIState,
  (ui) => ui.openNewServiceOperationDialog
);
export const selectIsNewCategoryServiceButtonEnabled = createSelector(
  selectUIState,
  selectColumnsState,
  ({ selectedColumnsIds, selectedCellIds }, columns) => {
    const colIds = Object.keys(selectedColumnsIds);
    const cellIds = Object.keys(selectedCellIds);
    if (colIds.length === 0) {
      return false;
    }
    const onlyColsSelected = !cellIds.some((cellId) => {
      const [_, colId] = getIdsFromCell(cellId);
      return !(colId in selectedColumnsIds);
    });
    return onlyColsSelected;
  }
);
export const selectColumnForNewServiceOperation = createSelector(
  selectIsNewCategoryServiceButtonEnabled,
  selectSelectedColumnIds,
  selectRowsState,
  (isNewCategoryServiceButtonEnabled, selectedColumns, rowEntities) => {
    if (isNewCategoryServiceButtonEnabled) {
      const colId = Object.keys(selectedColumns)[0];

      return rowEntities.allIds.reduce((acc, rowId) => {
        const cell = rowEntities.byId[rowId].cells[colId];
        const trueMeta = cell.metadata.find((metaItem) => metaItem.match);
        if (trueMeta) {
          // eslint-disable-next-line prefer-destructuring
          acc[rowId] = trueMeta.id;
        }
        return acc;
      }, {} as Record<string, any>);
    }
    return [];
  }
);

```
```js title="src/store/slices/table/table.slice.ts"
import { ..., newCategoryService, } from "./table.thunk";
const initialState: TableState = {
  entities: {...},
  ui: {..., openNewServiceOperationDialog: false,}
  ...
}
export const tableSlice = createSliceWithRequests({
  name: "table",
  initialState,
  reducers: { ... },
    extraRules: (builder) => builder
      .addCase(
        newCategoryService.fulfilled,
        (state, action: PayloadAction<Payload<ExtendThunkResponseProps>>) => {
          const {
            data,
            newCategory,
            selectedColumnId,
            undoable = true,
          } = action.payload;

          const { columns, meta, originalColMeta } = data;
          const newColumnsIds = Object.keys(columns);
          return produceWithPatch(
            state,
            undoable,
            (draft) => {
              const selectedColumnIndex =
                draft.entities.columns.allIds.findIndex(
                  (colId) => colId === selectedColumnId
                );

              newColumnsIds.forEach((newColId, newColIndex) => {
                const {
                  metadata: columnMetadata,
                  cells,
                  label,
                  ...rest
                } = columns[newColId];

                // add new column
                draft.entities.columns.byId[newColId] = {
                  id: newColId,
                  label,
                  metadata: getColumnMetadata(columnMetadata),
                  status: ColumnStatus.EMPTY,
                  context: {},
                  ...getColumnAnnotationMeta(columnMetadata),
                  ...rest,
                };

                // add rows

                draft.entities.rows.allIds.forEach((rowId) => {
                  const newCell = createCell(rowId, newColId, cells[rowId]);
                  if (newCell.metadata.length === 0) {
                    newCell.annotationMeta = {
                      annotated: false,
                      match: {
                        value: false,
                      },
                    };
                  }
                  draft.entities.rows.byId[rowId].cells[newColId] = newCell;
                  if (newCell.metadata.length > 0) {
                    updateContext(draft, newCell);
                  }
                });

                draft.entities.columns.byId[newColId].status = getColumnStatus(
                  draft,
                  newColId
                );

                // Insert the new column right after the selected column
                if (!draft.entities.columns.allIds.includes(newColId)) {
                  draft.entities.columns.allIds.push(newColId);
                }
              });
              updateNumberOfReconciliatedCells(draft);
              //add additional meta if needed (up to now only properties)
              if (originalColMeta && originalColMeta.originalColName) {
                if (
                  draft.entities.columns.byId[originalColMeta.originalColName]
                    .metadata[0].property
                ) {
                  draft.entities.columns.byId[
                    originalColMeta.originalColName
                  ].metadata[0].property = [
                    ...draft.entities.columns.byId[
                      originalColMeta.originalColName
                    ].metadata[0].property,
                    ...originalColMeta.properties,
                  ];
                } else {
                  draft.entities.columns.byId[
                    originalColMeta.originalColName
                  ].metadata[0].property = originalColMeta.properties;
                }
              }
            },
            (draft) => {
              draft.entities.tableInstance.lastNewCategoryServicedDate =
                new Date().toISOString();
            }
          );
        }
      ),
});

```
```js title="src/store/slices/table/table.thunk.ts"
import { ..., NewCategory, } from "../config/interfaces/config";
export enum TableThunkActions {
  ...,
  NEW_SERVICE_OPERATION = "newServiceOperation",
}
const getRequestFormValuesNewServiceOperation = (
  formParams: FormInputParams[],
  formValues: Record<string, any>,
  table: TableState,
  newCategory?: NewCategory
) => {
  if (!formParams) {
    return {};
  }

  const { ui, entities } = table;
  const { rows } = entities;
  const selectedColumnsIds = Object.keys(table.ui.selectedColumnsIds);
  console.log("getting request form values", newCategory);
  const requestParams = {} as Record<string, any>;

  requestParams.items = selectedColumnsIds.reduce((acc, key) => {
    acc[key] = getColumnValues(key, rows);
    return acc;
  }, {} as Record<string, any>);

  formParams.forEach(({ id, inputType }) => {
    if (formValues[id]) {
      if (inputType === "selectColumns") {
        requestParams[id] = getColumnValues(formValues[id], rows);
      } else if (inputType === "multipleColumnSelect") {
        requestParams[id] = {};
        for (const colId of formValues[id]) {
          requestParams[id][colId] = getColumnValues(colId, rows);
        }
      } else {
        requestParams[id] = formValues[id];
      }
    }
  });
  
  return requestParams;
};

export type NewCategoryServiceThunkInputProps = {
  newCategory: NewCategory;
  formValues: Record<string, any>;
};

export type NewCategoryServiceThunkResponseProps = {
  newCategory: NewCategory;
  selectedColumnId: string;
  data: any;
};

export const newCategoryService = createAsyncThunk<
  NewCategoryServiceThunkResponseProps,
  NewCategoryServiceThunkInputProps
>(`${ACTION_PREFIX}/newCategoryService`, async (inputProps, { getState }) => {
  const { newCategory, formValues } = inputProps;

  const { table } = getState() as RootState;
  const { relativeUrl, formParams, id } = newCategory;
  const { entities, ui } = table;
  const { tableInstance, columns } = entities;

  const selectedColumnIds = Object.keys(ui.selectedColumnsIds);
  const selectedColumnId = selectedColumnIds[0];
  const columnName = columns.byId[selectedColumnId]?.label || "";

  const params = getRequestFormValuesNewServiceOperation(formParams, formValues, table);

  const response = await tableAPI.newServiceOperation(
    relativeUrl,
    {
      serviceId: id,
      ...params,
    },
    tableInstance.id,
    tableInstance.idDataset,
    columnName
  );

  return {
    data: response.data,
    newCategory,
    selectedColumnId,
  };
});
```

### 3. Add UI Components
Now, integrate the new Category Service into the frontend UI by creating the necessary components and interactions.
Specifically:
- Add a new Category Service Dialog to allow users to select and execute a newCategory service. 
- Update the SubToolbar to include a button that opens the Category Service Dialog. 
- Update the ContextMenuColumn to allow right-click operations on columns for the new Category Service action. 
- Connect all UI components to the Redux global store and async thunks to handle state and backend requests.

```js title="src/pages/Viewer/TableViewer/NewCategoryServiceDialog.tsx"
import React, { forwardRef, Ref, ReactElement, useState, useEffect, FC } from "react";
import { useAppDispatch, useAppSelector } from "@hooks/store";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Slide,
  Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { HelpOutlineRounded } from "@mui/icons-material";
import { selectNewCategoryServiceRequestStatus } from "@store/slices/table/table.selectors";
import { updateUI } from "@store/slices/table/table.slice";
import { selectNewCategoriesAsArray } from "@store/slices/config/config.selectors";
import { NewCategory } from "@store/slices/config/interfaces/config";
import styled from "@emotion/styled";
import { newCategoryService } from "@store/slices/table/table.thunk";
import { useSnackbar } from "notistack";
import { SquaredBox } from "@components/core";
import DynamicNewServiceOperationForm from "@components/core/DynamicForm/DynamicForm";

const Transition = forwardRef(
  (
    props: TransitionProps & { children?: ReactElement<any, any> },
    ref: Ref<unknown>,
  ) => <Slide direction="down" ref={ref} {...props} />,
);

const Content = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
});

const DialogInnerContent = () => {
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);
  const [uniqueServices, setUniqueServices] = useState<NewCategory[]>([]);
  const [currentService, setCurrentService] = useState<NewCategory>();
  const [groupedServices, setGroupedServices] = useState<Map<string, NewCategory[]>>();
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const newServiceOperationServices = useAppSelector(selectNewCategoriesAsArray);
  const { loading, error } = useAppSelector(selectNewCategoryServiceRequestStatus);

  async function groupServices() {
    const groupedServsMap = new Map();
    const uniqueNewServiceOperationServices = newServiceOperationServices.filter(
      (service, index, self) => index === self.findIndex((s) => s.id === service.id)
    );

    setUniqueServices(uniqueNewServiceOperationServices);

    for (const service of uniqueNewServiceOperationServices) {
      const currentUri = service.uri ?? "other";
      if (groupedServsMap.has(currentUri)) {
        groupedServsMap.get(currentUri).push(service);
      } else {
        groupedServsMap.set(currentUri, [service]);
      }
    }
    setGroupedServices(groupedServsMap);
  }

  useEffect(() => {
    if (newServiceOperationServices) {
      groupServices();
    }
  }, [newServiceOperationServices]);

  const handleClose = () => {
    // Reset selected service when dialog is closed
    setCurrentService(undefined);
    dispatch(
      updateUI({
        openNewServiceOperationDialog: false,
      }),
    );
  };

  const handleChange = (event: SelectChangeEvent<string>) => {
    const val = newServiceOperationServices.find(
      (service) => service.id === event.target.value,
    );
    if (val) {
      console.log("current service", val);
      setCurrentService(val);
    }
  };

  const handleSubmit = async (formState: Record<string, any>, reset?: Function) => {
    if (!currentService) return;
    try {
      const { data } = await dispatch(
        newCategoryService({
          newCategory: currentService,
          formValues: formState,
        })
      ).unwrap();
      if (reset) reset();
      setCurrentService(undefined);
      dispatch(updateUI({ openNewServiceOperationDialog: false }));
      const nColumns = Object.keys(data.columns).length;
      const infoText = `${nColumns} ${nColumns > 1 ? "columns" : "column"} added`;
      enqueueSnackbar(infoText, {
        autoHideDuration: 3000,
        anchorOrigin: { vertical: "bottom", horizontal: "center" },
      });
      return data;
    } catch (err: any) {
      enqueueSnackbar(err.message || "An error occurred while formatting dates.", {
        variant: "error",
        autoHideDuration: 4000,
        anchorOrigin: { vertical: "bottom", horizontal: "center" },
      });
      throw err;
    }
  };
  const toggleGroup = (uri: string) => {
    setExpandedGroup((prev) => (prev === uri ? null : uri));
  };
  const handleHeaderClick = (e, uri) => {
    e.stopPropagation(); // Prevent the Select from closing
    setExpandedGroup((prev) => (prev === uri ? null : uri));
  };
  return (
    <>
      <FormControl className="field">
        <Select
          value={currentService ? currentService.id : ""}
          onChange={handleChange}
          variant="outlined"
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: "400px",
              },
            },
          }}
          renderValue={(selected) => {
            const selectedService = newServiceOperationServices.find(
              (service) => service.id === selected,
            );
            return selectedService ? selectedService.name : "";
          }}
        >
          {uniqueServices.map((newCategory) => (
            <MenuItem
              key={newCategory.id}
              value={newCategory.id}
              sx={{ pl: 4 }}
              onClick={() => handleChange({ target: { value: newCategory.id } })}
            >
              {newCategory.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {currentService && (
        <>
          <SquaredBox
            dangerouslySetInnerHTML={{ __html: currentService.description }}
          />
          {error && <Typography color="error">{error.message}</Typography>}
          <Divider />
          <DynamicNewServiceOperationForm
            loading={loading}
            onSubmit={handleSubmit}
            onCancel={handleClose}
            service={currentService}
          />
        </>
      )}
    </>
  );
};

export type NewCategoryServiceDialogProps = {
  open: boolean;
  handleClose: () => void;
};

const NewCategoryServiceDialog: FC<NewCategoryServiceDialogProps> = ({ open, handleClose }) => {
  const dispatch = useAppDispatch();

  return (
    <Dialog open={open} TransitionComponent={Transition} onClose={handleClose}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <DialogTitle>NewCategoryService</DialogTitle>
        <IconButton
          sx={{
            color: "rgba(0, 0, 0, 0.54)",
            marginRight: "20px",
          }}
          onClick={() => {
            dispatch(updateUI({ openHelpDialog: true, tutorialStep: stepNumber }));
          }}
        >
          <HelpOutlineRounded />
        </IconButton>
      </Stack>
      <DialogContent>
        <DialogContentText paddingBottom="10px">
          Select a service:
        </DialogContentText>
        <Content>
          <DialogInnerContent />
        </Content>
      </DialogContent>
    </Dialog>
  );
};

export default NewCategoryServiceDialog;
```
```js title="src/pages/Viewer/TableViewer/SubToolbar.tsx"
import { ..., selectNewServiceOperationDialogStatus, } from "@store/slices/table/table.selectors";
import NewCategoryServiceDialog from "../NewCategoryServiceDialog/NewCategoryServiceDialog";

const SubToolbar = ({ ... }) => {
  const openNewServiceOperationDialog = useAppSelector(selectNewServiceOperationDialogStatus);
    return (
      <>
        <ToolbarActions>
          ...
          {!isViewOnly && (
            <ActionGroup>
              {/* NewCategoryService */}
                <Tooltip
                  title={!isCellSelected ? "Select a column to enable NewCategoryService function"
                    : "NewCategoryService selected column(s)"}
                  arrow
                >
                  <span>
                    <Button
                      sx={{
                        textTransform: "none",
                      }}
                      color="primary"
                      disabled={!isCellSelected}
                      onClick={() => dispatch(updateUI({ openNewServiceOperationDialog: true }))}
                      variant="contained"
                    >
                      NewCategoryService
                    </Button>
                  </span>
                </Tooltip>
                ...
            </ActionGroup>
          )}
          ...
        </ToolbarActions>
        ...
        <NewCategoryServiceDialog
          open={openNewServiceOperationDialog}
          handleClose={() => handleExtensionClose("openNewServiceOperationDialog")}
        />
        ...
      </>
    );
};

export default SubToolbar;
```
```js title="src/pages/Viewer/TableViewer/Menus/ContextMenus/ContextMenuColumn.tsx"
...
/**
 * Handle newCategoryService column action.
 */
 const handleNewCategoryService = useCallback(() => {
    if (isCellSelected) {
      dispatch(updateUI({ openNewServiceOperationDialog: true }));
      handleClose();
    }
  }, [isCellSelected, dispatch, handleClose]);
 ...

  return (
    <MenuBase handleClose={handleClose} {...props}>
      <StyledMenuList autoFocus >
        <MenuItemIconLabel
          onClick={handleNewCategoryService}
          Icon={TransformIcon}>
            NewCategoryService column
        </MenuItemIconLabel>
        ...
      </StyledMenuList>
    </MenuBase>
  );
};

export default ContextMenuColumn;
```

### 4. Update Dynamic Forms (if applicable)
Finally, adapt the Dynamic Form component to support the new Category Service. The form leverages
react-hook-form to handle input state, validation, and submission, while dynamically rendering 
fields based on the selected service. This approach allows seamless reuse of the existing form
logic for any new service type, including conditional fields and suggestion lists.
```js title="src/components/core/DynamicForm/DynamicForm.tsx"
import { ..., NewCategory, } from "@store/slices/config/interfaces/config";

export type DynamicFormProps = {
  loading: boolean | undefined;
  service: Extender | ... | NewCategory;
  onSubmit: (formState: Record<string, any>, reset?: Function) => void;
  onCancel: () => void;
};
...
```
With both backend and frontend updates completed, the new Category Service is fully integrated,
allowing the various services, added in the `newCategoryService` folder in the backend,
to be directly used in the frontend through the `DynamicForm`.
