export const blobToBase64 = (blob: Blob) => {
	console.log('sdfsdf');
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onloadend = () => {
			const base64String = reader.result.split(',')[1];
			console.log(base64String);
			resolve(base64String);
		};
		reader.onerror = reject;
		reader.readAsDataURL(blob);
	});
};
