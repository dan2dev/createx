import { Language } from "./helper";

export type MatrixResult<TData, TResult> = {
    rendered: string;
    language: Language;
} & TData & TResult;
export abstract class Matrix<TData, TResult> {
    public data: TData;
    public constructor(data: TData) { this.data = data; }
    public typescript?(): MatrixResult<TData, TResult>;
    public html?(): MatrixResult<TData, TResult>;
    public dart?(): MatrixResult<TData, TResult>;
    public javascript?(): MatrixResult<TData, TResult>;
    public csharp?(): MatrixResult<TData, TResult>;
    public java?(): MatrixResult<TData, TResult>;
    public swift?(): MatrixResult<TData, TResult>;
    public kotlin?(): MatrixResult<TData, TResult>;
    public css?(): MatrixResult<TData, TResult>;
}
