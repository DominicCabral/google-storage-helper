'use strict'
const Storage = require('@google-cloud/storage');


class GoogleStorageHelper{
	constructor(config){

		this.storage = new Storage({
			projectId: config.googleCloudProjectId,
			keyFilename: config.keyFilename
		});
		this.bucketName = config.bucketName;
	}
	
	listFilesByPrefix(prefix, delimiter) {
	var fileList = [];
	
	  const options = {
		prefix: prefix,
	  };
	
	  if (delimiter) {
		options.delimiter = delimiter;
	  }
	
	  // Lists files in the bucket, filtered by a prefix
	  return this.storage
		.bucket(this.bucketName)
		.getFiles(options)
		.then(results => {
		  const files = results[0];

		  files.forEach((file,index) => {
			if (index==0) return; //skip first
			fileList.push('https://storage.googleapis.com/' + this.bucketName + '/' + file.name);
		  });

		  return fileList;
		})
		.catch(err => {
		  throw err;
		});
	}
}

module.exports = GoogleStorageHelper;