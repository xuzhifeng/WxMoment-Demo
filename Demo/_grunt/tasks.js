module.exports = function (grunt) {

    grunt.initConfig(require('./config/index')(grunt));
    grunt.registerTask('build_css', ['less:build_css','watch']);
};
