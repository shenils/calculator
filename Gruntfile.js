module.exports = function(grunt) {
  grunt.initConfig({
    sass: {                              // Task 
      dist: {                            // Target 
        files: {                         // Dictionary of files 
          'assets/stylesheets/src/styles.css': 'assets/stylesheets/src/styles.scss',
        }
      }
    },
    watch: {
      css: {
        files: ['assets/stylesheets/src/*.scss'],
        tasks: ['sass', 'cssmin'],
      }
    },

    cssmin: {
      target: {
        files: {
          'assets/stylesheets/styles.min.css': 
            [
              'assets/stylesheets/src/styles.css', 
            ]
        }
      }
    }
  });



  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  //.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.registerTask('default', ['sass', 'cssmin', 'watch']);
}