module.exports = function (grunt) {

    // load all grunt tasks in package.json matching the `grunt-*` pattern
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        sass: {
            dist: {
                options: {
                    style: 'expanded',
                    lineNumbers: true,
                    loadPath: [
                        'sass/bourbon/',
                        'sass/neat/'
                    ]
                },
                files: {
                    'css/app.css': 'sass/app.scss'
                }
            }
        },

        autoprefixer: {
            options: {
                browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
            },
            dist: {
                src: 'css/app.css'
            }
        },

        cssmin: {
            minify: {
                src: 'css/app.css',
                dest: 'css/app.min.css'
            }
        },

        concat: {
            dist: {
                src: [
                    'js/*.js'
                ],
                dest: 'js/app.js'
            }
        },

        uglify: {
            build: {
                options: {
                    mangle: false
                },
                src: 'js/app.js',
                dest: 'js/app.min.js'
            }
        },

        imagemin: {
            dynamic: {
                src: ['images/**/*.{png,jpg,gif}'],
                dest: 'images/'
            }
        },

        watch: {

            scripts: {
                files: ['js/**/*.js'],
                tasks: ['javascript'],
                options: {
                    spawn: false
                }
            },

            css: {
                files: ['sass/**/*.scss'],
                tasks: ['styles'],
                options: {
                    spawn: false
                }
            }

        },

        clean: {
            js: ['js/*.min.js'],
            css: ['css/*.min.css']
        }

    });

    grunt.registerTask('styles', ['sass', 'autoprefixer', 'cssmin']);
    grunt.registerTask('javascript', ['concat', 'uglify']);
    grunt.registerTask('imageminnewer', ['newer:imagemin']);
    grunt.registerTask('default', ['sass', 'autoprefixer']);
    grunt.registerTask('build', ['clean', 'styles', 'javascript', 'imageminnewer']);

};
