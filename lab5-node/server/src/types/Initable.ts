export interface Initable {
    init(): Promise<void> | void;
}