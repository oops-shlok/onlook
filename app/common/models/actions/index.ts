import { InsertPos } from '..';

export interface Change<T> {
    updated: T;
    original: T;
}

export interface ActionTarget {
    webviewId: string;
    selector: string;
    uuid: string;
}

export interface StyleActionTarget extends ActionTarget {
    change: Change<string>;
}

export interface GroupActionTarget extends ActionTarget {
    index: number;
}

export interface ActionElementLocation {
    position: InsertPos;
    targetSelector: string;
    index: number;
}

export interface MoveActionLocation extends ActionElementLocation {
    position: InsertPos.INDEX;
    originalIndex: number;
}

export interface ActionElement {
    selector: string;
    tagName: string;
    attributes: Record<string, string>;
    children: ActionElement[];
    styles: Record<string, string>;
    textContent?: string;
    uuid: string;
}

export interface UpdateStyleAction {
    type: 'update-style';
    targets: Array<StyleActionTarget>;
    style: string;
}

export interface InsertElementAction {
    type: 'insert-element';
    targets: Array<ActionTarget>;
    location: ActionElementLocation;
    element: ActionElement;
    editText?: boolean;
    codeBlock?: string;
}

export interface RemoveElementAction {
    type: 'remove-element';
    targets: Array<ActionTarget>;
    location: ActionElementLocation;
    element: ActionElement;
    codeBlock?: string;
}

export interface MoveElementAction {
    type: 'move-element';
    targets: Array<ActionTarget>;
    location: MoveActionLocation;
}

export interface EditTextAction {
    type: 'edit-text';
    targets: Array<ActionTarget>;
    originalContent: string;
    newContent: string;
}

export interface GroupElementsAction {
    type: 'group-element';
    targets: Array<GroupActionTarget>;
    location: ActionElementLocation;
    webviewId: string;
}

export type Action =
    | UpdateStyleAction
    | InsertElementAction
    | RemoveElementAction
    | MoveElementAction
    | EditTextAction
    | GroupElementsAction;
