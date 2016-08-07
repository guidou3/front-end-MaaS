export function requestChangeImage() {
	return {
		type: 'waiting',
		operation: 'changeImage'
	}
}

export function receiveChangeImage(bool, data) {
	if(bool) return {
		type: 'successChangeImage',
		image: data
	}
	else return {
		type: 'failed',
		error: data
	}
}

export function changeImage(newImage) {
	return function(dispatch){
		dispatch(requestChangeImage())
		/*return request
			.put('url1')
			.send({
				image: newImage
			})
			.then(
				function(){
					dispatch(receiveChangeImage(true, newImage))
				},
				function(error){
					dispatch(receiveChangeImage(false, error))
				}
			)*/
		dispatch(receiveChangeImage(true, newImage))
	}
}
