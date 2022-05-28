type FuncName<T> = {
	[P in keyof T]: T[P] extends Function ? P : never
}[keyof T]
