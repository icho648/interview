// 在条件类型里推断（Inferring Within Conditional Types）
// 推断数组元素类型
type Flatten<Type> = Type extends Array<infer Item> ? Item : Type

// 推断函数返回类型
type GetReturnType<Type> = Type extends () => infer Return ? Return : never

// 分发条件类型（Distributive Conditional Types）
// 当在泛型中使用条件类型的时候，如果传入一个联合类型，就会变成 分发的（distributive），举个例子：
type ToArray<Type> = Type extends any ? Type[] : never
type StrArrOrNumArr = ToArray<string | number>
// type StrArrOrNumArr = string[] | number[]

// 通常这是我们期望的行为，如果你要避免这种行为，你可以用方括号包裹 extends 关键字的每一部分。
type ToArrayNonDist<Type> = [Type] extends [any] ? Type[] : never
// 'StrArrOrNumArr' is no longer a union.
type StrArrOrNumArr2 = ToArrayNonDist<string | number>
// type StrArrOrNumArr = (string | number)[]

type a = string | number
type b = ToArrayNonDist<a>
// type b = a[]

type n = (number | symbol) & (string | number)
// type n = number

type o = ({ a: string } | { b: string }) & ({ c: string } | { d: string })
// type o =
// 	| ({ a: string } & { c: string })
// 	| ({ a: string } & { d: string })
// 	| ({ b: string } & { c: string })
// 	| ({ b: string } & { d: string })
