module.exports = function(grunt) {

  grunt.initConfig({
      sass: {
      options: {
        sourceMap: true
      },
      dist: {
        files: {
          'css/style.css': 'sass/style.sass'
        }
      }
    },

    jshint: {
      all: ['js/*.js']
    }
  });


  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-sass');

  grunt.registerTask('default', ['jshint', 'sass']);
};
