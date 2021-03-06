/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { Cell } from "./notebookContent";

export function createCellProxy(cell: Cell, changedCallback: () => void) {
    return new Proxy(cell, {
        set: (target: Cell, prop: string, value: any) => {

            if (prop === "textContent") {
                if (typeof value !== "string") {
                    throw new TypeError("textContent must be a string");
                }
            } else if (prop === "id") {
                throw new Error("ID can not be changed.");
            }

            (target as any)[prop] = value;
            changedCallback();

            return true;
        }
    });
}
