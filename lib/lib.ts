import { Element as PolymerElement } from '@polymer/polymer/polymer-element';
import {
    Options,
} from './types';

import treeify from './treeify';
import {
    addCSS,
    writeCSS,
} from './css';

export {
    treeify,
};

/**
 * Treeify all nodes that match given selector.
 * @param selector selector.
 * @param options options.
 * @param [doc] document.
 */
export function run(selector: string, options?: Partial<Options>, doc: HTMLDocument = document): void{
    if (options == null){
        options = {};
    }
    const options2 = getOptions(options);
    const elms = doc.querySelectorAll(selector);
    for (let i = 0; i < elms.length; i++){
        treeify(elms[i] as HTMLElement, options2);
    }

    writeCSS(options2, doc);
}
export function define(name: string): void{
    if (!name.match(/^[a-z].*-[^-]+$/)){
        console.error('Invalid element name.');
        return;
    }
    customElements.define(name, MyApp);
    /*const elms = doc.querySelectorAll(selector);
    for (let i = 0; i < elms.length; i++){
        treeify(elms[i] as HTMLElement, options2);
    }*/

    // writeCSS(options2, doc);
}

export class MyApp extends PolymerElement {
    elm: HTMLElement;
    constructor(){
        super();
        this.elm = super.attachShadow({mode: 'open'});
        const options = {
            noBranchClass: 'tree-no-branch',
            label: `label`,
            labelMain: `label-main`,
            labelNonRoot: `label-non-root`,
            labelLastChild: `label-last-child`,
            labelLine: `label-line`,
            children: `children`,
            liLastChild: `tree-li-last-child`,
            liNoForwardSibling: `label-no-forward-sibling`,
            indentTree: '1em',
            indentChildren: '3em',
            labelTopPadding: '0.2em',
        };
        this.elm.textContent = 'Root Node';
        this.elm.appendChild(super.children[0]);
        treeify(this.elm as HTMLElement, options);
        this.elm.appendChild(addCSS(options));
    }
}

/**
 * assign default values to options.
 * @param options possibly partial options.
 * @returns full options.
 */
export function getOptions(options: Partial<Options>): Options{
    const prefix = randomString();
    return {
        noBranchClass: '${prefix}-no-branch',
        label: `${prefix}-label`,
        labelMain: `${prefix}-label-main`,
        labelNonRoot: `${prefix}-label-non-root`,
        labelLastChild: `${prefix}-label-last-child`,
        labelLine: `${prefix}-label-line`,
        children: `${prefix}-children`,
        liLastChild: `${prefix}-tree-li-last-child`,
        liNoForwardSibling: `${prefix}-label-no-forward-sibling`,
        indentTree: '1em',
        indentChildren: '3em',
        labelTopPadding: '0.2em',

        ... options,
    };
}

/**
 * Generate short random string.
 */
function randomString(): string{
    return 't'+Math.random().toString(36).slice(2);
}
