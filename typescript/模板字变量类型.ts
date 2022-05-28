type EmailLocaleIDs = "welcome_email" | "email_heading"
type FooterLocaleIDs = "footer_title" | "footer_sendoff"

type AllLocaleIDs = `${EmailLocaleIDs | FooterLocaleIDs}_id`
// type AllLocaleIDs = "welcome_email_id" | "email_heading_id" | "footer_title_id" | "footer_sendoff_id"

type Lang = "en" | "ja" | "pt"

type LocaleMessageIDs = `${Lang}_${AllLocaleIDs}`
// type LocaleMessageIDs = "en_welcome_email_id" | "en_email_heading_id" | "en_footer_title_id" | "en_footer_sendoff_id" | "ja_welcome_email_id" | "ja_email_heading_id" | "ja_footer_title_id" | "ja_footer_sendoff_id" | "pt_welcome_email_id" | "pt_email_heading_id" | "pt_footer_title_id" | "pt_footer_sendoff_id"

// 给一个接口添加一个方法，方法参数为接口成员名联合类型
// Key extends (string & keyof Type)
type PropEventSource<Type> = {
	/**
	 * @description 监听属性变化
	 * @param key
	 * @param callback
	 */
	on<Key extends string & keyof Type>(
		key: `${Key}`,
		callback: (newValue: Type[Key]) => void
	): void
}

function makeWatchedObject<Type>(obj: Type): Type & PropEventSource<Type> {
	obj["on"] = (key, callback) => {
		watch(obj, key, callback)
	}
	return obj as any
}

const person1 = makeWatchedObject({
	firstName: "Saoirse",
	lastName: "Ronan",
	age: 26,
})

person1.on("firstName", (newName) => {
	// (parameter) newName: string
	console.log(`new name is ${newName.toUpperCase()}`)
})

person1.on("age", (newAge) => {
	// (parameter) newAge: number
	if (newAge < 0) {
		console.warn("warning! negative age")
	}
})
