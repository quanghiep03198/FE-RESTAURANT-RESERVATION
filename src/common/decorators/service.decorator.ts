// ...existing code...
export function Service(prefix: string): ClassDecorator {
	const normalizePrefix = (p: string) => {
		if (!p) return ''
		return p.replace(/^\/+|\/+$/g, '') // remove leading/trailing slashes
	}

	const pref = normalizePrefix(prefix)

	// Use a generic so the returned function matches the ClassDecorator signature
	return function <TFunction extends Function>(target: TFunction): TFunction | void {
		const rewrite = (obj: any, key: string) => {
			const descriptor = Object.getOwnPropertyDescriptor(obj, key)
			if (!descriptor) return

			const original = descriptor.value
			if (typeof original !== 'function') return

			descriptor.value = function (...args: any[]) {
				// only rewrite if first arg is a string endpoint
				if (args.length > 0 && typeof args[0] === 'string') {
					const raw = args[0] as string

					// don't touch absolute URLs or already prefixed routes
					const isAbsolute = /^https?:\/\//i.test(raw)
					const alreadyPrefixed = pref && new RegExp(`^\\/?${pref}(/|$)`, 'i').test(raw.replace(/^\/+/, ''))

					if (!isAbsolute && !alreadyPrefixed) {
						const endpoint = raw.replace(/^\/+/, '') // remove leading slash
						args[0] = pref ? `/${pref}/${endpoint}`.replace(/\/+ /g, '/') : `/${endpoint}`.replace(/\/+ /g, '/')
					}
				}

				return original.apply(this, args)
			}

			Object.defineProperty(obj, key, descriptor)
		}

		// Rewrite instance methods on the prototype
		const proto: any = (target as any).prototype
		if (proto && typeof proto === 'object') {
			for (const key of Object.getOwnPropertyNames(proto)) {
				if (key === 'constructor') continue
				rewrite(proto, key)
			}
		}

		// Also rewrite static methods on the constructor itself (for `static` methods)
		for (const key of Object.getOwnPropertyNames(target)) {
			if (key === 'length' || key === 'name' || key === 'prototype') continue
			rewrite(target as any, key)
		}

		return target
	}
}
// ...existing code...
