export function requestChangeImage() {
	return { type: waitingChangeImage }
}

export function receiveChangeImage(bool, text) {
	if(bool) return { type: successChangeImage }
	else return { 
		type: failedChangeImage,
		error: text
	}
}

export function changeImage(newImage) {
	store.dispatch(requestChangeImage())
	return
	{
		request
		.put('url1')
		.send({
			image: newImage
		})
		.then(
			function(error){
				store.dispatch(receiveChangeImage(false, error))
			},
			function(result){
				store.dispatch(receiveChangeImage(true))
			}
		)
	}
}