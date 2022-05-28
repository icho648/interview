// 一个类型需要基于另外一个类型

// 利用「模板字面量类型」，基于之前的属性名创建一个新属性名：
/**
 * 通过as把key映射为另一个名字
 */
type Getters<Type> = {
	[Property in keyof Type as `get${Capitalize<
		string & Property
	>}`]: () => Type[Property]
}

interface Person3 {
	name: string
	age: number
	location: string
}

type LazyPerson = Getters<Person3>

// type LazyPerson = {
//    getName: () => string;
//    getAge: () => number;
//    getLocation: () => string;
// }

// 利用条件类型返回一个 never 从而过滤掉某些属性:

// Remove the 'kind' property
type RemoveKindField<Type> = {
	[Property in keyof Type as Exclude<Property, "kind">]: Type[Property]
}

interface Circle {
	kind: "circle"
	radius: number
}

type KindlessCircle = RemoveKindField<Circle>

// type KindlessCircle = {
//    radius: number;
// }

// 还可以遍历任何联合类型，不仅仅是 string | number | symbol 这种联合类型，可以是任何类型的联合：

type EventConfig<Events extends { kind: string }> = {
	[E in Events as E["kind"]]: (event: E) => void
}

type SquareEvent = { kind: "square"; x: number; y: number }
type CircleEvent = { kind: "circle"; radius: number }

type Config = EventConfig<SquareEvent | CircleEvent>
// type Config = {
//    square: (event: SquareEvent) => void;
//    circle: (event: CircleEvent) => void;
// }
