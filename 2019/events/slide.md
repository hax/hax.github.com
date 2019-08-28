Events

- [Event developer guide](https://developer.mozilla.org/en-US/docs/Web/Guide/Events)
- [Event reference](https://developer.mozilla.org/en-US/docs/Web/Events)
- [Event API](https://developer.mozilla.org/en-US/docs/Web/API/Event)
- [DOM spec: Events](https://dom.spec.whatwg.org/#events)

Event driven

![Browser sequence comparitive](https://mdn.mozillademos.org/files/6641/Browser_sequence_comparitive.svg)

- Event name
- Event data
- Event target

- `function callback(eventData) {...}`
- register *callback function* for *event name* on *event target*

DOM Events

```ts
interface EventTarget {
	new ()
\
	addEventListener(
		type: string,
		callback: (event: Event) => void,
		options?: {capture: boolean, passive: boolean, once: boolean},
	): void
\
	removeEventListener(
		type: string,
		callback: (event: Event) => void,
		options?: {capture: boolean},
	): void
\
	dispatchEvent(event: Event): void
}
```

- Capture
- At Target
- Bubble

Event object

```ts
interface Event {
	new (type: string, eventInitDict?: EventInit)
\
	readonly type: string
	readonly target: EventTarget
	readonly currentTarget: EventTarget
	composedPath(): Array<EventTarget>
\
	readonly eventPhase: 0 | 1 | 2 | 3
	static readonly NONE = 0
	static readonly CAPTURING_PHASE = 1
	static readonly AT_TARGET = 2
	static readonly BUBBLING_PHASE = 3
```

```ts
	stopPropagation(): void
	stopImmediatePropagation(): void
\
	readonly bubbles: boolean
	readonly cancelable: boolean
	preventDefault(): void // cancelable and not passive
	readonly defaultPrevented: boolean
	readonly composed: boolean
	readonly isTrusted: boolean
	readonly timestamp: DOMHighResTimeStamp // number
}
interface EventInit {
	bubbles = false
	cancelable = false
	composed = false
}
```

Synthetic events

```ts
interface CustomEvent extends Event {
	new (type: string, eventInitDict?: CustomEventInit)
	readonly detail: mixed
}
interface CustomEventInit extends EventInit {
	detail: mixed = null
}
```

on-event handlers
