// view: what is shown in the main pane?


export type ViewType =
    | 'table-view' 
    | 'scroll-view'
    | 'single-view'
;
export interface TableView{
    type: ViewType;
}

export type View =
    TableView;
