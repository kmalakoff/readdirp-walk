/// <reference types="node" />
export type EntryInfo = {
    path: string;
    fullPath: string;
    stats?: fs.Stats | undefined;
    dirent?: fs.Dirent | undefined;
    basename: string;
};
export type ReaddirpArguments = {
    fileFilter?: Function | undefined;
    directoryFilter?: Function | undefined;
    type?: string | undefined;
    depth?: number | undefined;
    root?: string | undefined;
    lstat?: boolean | undefined;
    bigint?: boolean | undefined;
};
/**
 * @typedef {Object} ReaddirpArguments
 * @property {Function=} fileFilter
 * @property {Function=} directoryFilter
 * @property {String=} type
 * @property {Number=} depth
 * @property {String=} root
 * @property {Boolean=} lstat
 * @property {Boolean=} bigint
 */
/**
 * Main function which ends up calling readdirRec and reads all files and directories in given root recursively.
 * @param {String} root Root directory
 * @param {ReaddirpArguments=} options Options to specify root (start directory), filters and recursion depth
 */
export function readdirp(root: string, options?: ReaddirpArguments | undefined): ReaddirpStream;
declare function readdirpPromise(root: any, options?: {}): Promise<any>;
export class ReaddirpStream extends Readable {
    static get defaultOptions(): {
        root: string;
        fileFilter: (_path: any) => boolean;
        directoryFilter: (_path: any) => boolean;
        type: string;
        lstat: boolean;
        depth: number;
        alwaysStat: boolean;
    };
    constructor(options?: {});
    _fileFilter: any;
    _directoryFilter: any;
    _wantsDir: boolean;
    _wantsFile: boolean;
    _wantsEverything: boolean;
    _root: string;
    _isDirent: boolean;
    _statsProp: string;
    filter: (entry: any) => Promise<any>;
    iterator: any;
    destroy(err: any): void;
    _read(batch: any): Promise<void>;
    reading: boolean;
    _onError(err: any): boolean;
    _getEntryType(entry: any): Promise<"file" | "directory">;
    _includeAsFile(entry: any): boolean;
}
import fs = require("fs");
import { Readable } from "stream";
export { readdirpPromise as promise };
