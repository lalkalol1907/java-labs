import {Express} from "express";

export type RouterFunc = (app: Express) => void;

export type RouterFuncFactory<T> = (handler: T) => RouterFunc