function isCorrectUser(userId){
	return request.auth.uid == userId;
}

function isLessThanNMegabytes(n){
	return request.resource.size < n * 1024 * 1024;
}

service firebase.storage {
  match /b/{bucket}/o {
  	allow read;
    match /user-images/{userId}/{allPaths=**} {
      allow write: if isCorrectUser(userId) && isLessThanNMegabytes(5)
    }
  }
}
