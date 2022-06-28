type FilterByVauleType<Obj extends Record<string, any>, ValueType> = {
  [key in keyof Obj as ValueType extends Obj[key] ? key : never]: Obj[key]
}

type DeepPromiseValeType<P extends Promise<unknown>> =
  P extends Promise<infer ValueType>
    ? ValueType extends Promise<unknown>
      ? DeepPromiseValeType<ValueType>
      : ValueType
    : never;

type ReverseArr<Arr extends unknown[]> =
  Arr extends [infer First, ...infer Rest]
    ? [...ReverseArr<Rest>, First]
    : Arr

type ty = ReverseArr<[1, 2, 3, 4, 5]>

type RemoveItem<Arr extends unknown[], Item, Result extends unknown[] = []> =
  Arr extends [infer First, ...infer Rest]
    ? IsEqual<First, Item> extends true
      ? RemoveItem<Rest, Item, Result>
      : RemoveItem<Rest, Item, [...Result, First]>
    : Result

type IsEqual<A, B> = (A extends B ? true : false) & (B extends A ? true : false)

type BuildArr<Length extends number, Item = unknown, Arr extends unknown[] = []> = 
  Arr['length'] extends Length 
    ? Arr
    : BuildArr<Length, Item, [...Arr, Item]>

type ReverseStr<Str extends string, Result extends string = ''> = 
  Str extends `${infer First}${infer Rest}`
    ? ReverseStr<Rest, `${Result}${First}`>
    : Result

type BEM<
    Block extends string,
    Element extends string[],
    Modifiers extends string[]
> = `${Block}__${Element[number]}--${Modifiers[number]}`;

type bemResult = BEM<'guang', ['aaa', 'bbb'], ['warning', 'success']>;

type OmitRes = Omit<{name:'1111',age:20,h:180},'age'|'h'>

const a = new Promise((resolve)=>{resolve(11111)})
