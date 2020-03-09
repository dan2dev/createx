import { Language } from "./helper";

type MatrixResult<TData> = {
    rendered: string;
    language: Language;
} & TData;
export abstract class Matrix<TData> {
    public data: TData;
    public constructor(data: TData) {
        this.data = data;
    }
    public typescript?(data: TData): MatrixResult<TData>;
    public html?(data: TData): MatrixResult<TData>;
    public dart?(data: TData): MatrixResult<TData>;
    public javascript?(data: TData): MatrixResult<TData>;
    public csharp?(data: TData): MatrixResult<TData>;
    public java?(data: TData): MatrixResult<TData>;
    public swift?(data: TData): MatrixResult<TData>;
    public kotlin?(data: TData): MatrixResult<TData>;
    public css?(data: TData): MatrixResult<TData>;
}
