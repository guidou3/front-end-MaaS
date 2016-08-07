export function requestChangeImage(todo) {
	return {
		type: 'waiting',
		operation: todo
	}
}
