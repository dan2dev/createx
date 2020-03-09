import { Language } from "./helper";

export type MatrixResult<TData> = {
    rendered: string;
    language: Language;
} & TData;
export abstract class Matrix<TData> {
    public data: TData;
    public constructor(data: TData) {
        this.data = data;
    }
    public typescript?(): MatrixResult<TData>;
    public html?(): MatrixResult<TData>;
    public dart?(): MatrixResult<TData>;
    public javascript?(): MatrixResult<TData>;
    public csharp?(): MatrixResult<TData>;
    public java?(): MatrixResult<TData>;
    public swift?(): MatrixResult<TData>;
    public kotlin?(): MatrixResult<TData>;
    public css?(): MatrixResult<TData>;
}
