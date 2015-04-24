module.exports = function (grunt) {
    grunt.initConfig({
		sass: {
			dist: {
				options: {
					style: 'expanded'
				},
				files: {
					'style.css': 'style.scss'
				}
			}
		},
        autoprefixer: {
            dist: {
                files: {
                    'style.css': 'style.css'
                }
            }
        }
    });
	
	grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-autoprefixer');
	
	grunt.registerTask('default', ['sass', 'autoprefixer']);
};