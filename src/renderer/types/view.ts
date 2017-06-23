// view: what is shown in the main pane?


export interface TableView{
    type: 'table-view';
}
export interface ScrollView{
    type: 'scroll-view';
}
export interface SingleView{
    type: 'single-view';
    zoom: SingleZoomMode;
}

export type View =
    | TableView
    | ScrollView
    | SingleView
;

export interface SingleZoomModeWhole{
    type: 'whole';
}
export interface SingleZoomModeZoom{
    type: 'zoom';
    width: number;
    height: number;
}

export type SingleZoomMode =
    | SingleZoomModeWhole
    | SingleZoomModeZoom
;

