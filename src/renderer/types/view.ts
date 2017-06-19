// view: what is shown in the main pane?


export interface TableView{
    type: 'table-view';
}
export interface ScrollView{
    type: 'scroll-view';
}
export interface SingleView{
    type: 'single-view';
    zoom: number;
}

export type View =
    | TableView
    | ScrollView
    | SingleView
;
