module.exports = function (grunt) {
    require('jit-grunt')(grunt);
    require("matchdep").filterDev('grunt-*', './_grunt/package.json').forEach(grunt.loadNpmTasks);
    require('./_grunt/tasks.js')(grunt);
};
