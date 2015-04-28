module.exports = function (grunt) {
    return {
        pkg: grunt.file.readJSON('package.json'),
        less: require('./less'),
	    clean: require('./clean'),
	    watch: require('./watch')
    };
};
