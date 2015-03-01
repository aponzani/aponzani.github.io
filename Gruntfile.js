module.exports = function (grunt) {
    var config = {
        pkg: grunt.file.readJSON("package.json"),

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
            },
            express: {
                files: ['js/**/*.js', '**/*.html', 'css/**/*.css'],
                tasks: ['express:dev'],
                options: {
                    spawn: false
                }
            }

        },

        clean: {
            js: ['js/*.min.js'],
            css: ['css/*.min.css']
        },

        express: {
            options: {
                port: 8001
            },
            dev: {
                options: {
                    script: 'tasks/server.js'
                }
            }
        },

        open: {
            dev: {
                path: "http://localhost:<%= express.options.port %>",
                app: "C:\\Program Files (x86)\\Firefox Developer Edition\\firefox.exe"
            }
        }
    }

    // initializing task configuration
    grunt.initConfig(config);

    // Loads all plugins that match "grunt-", in this case all of our current plugins
    require('matchdep').filterAll('grunt-*').forEach(grunt.loadNpmTasks);
    grunt.loadNpmTasks("node-bourbon");
    grunt.loadNpmTasks("node-neat");

    // loading local tasks
    //grunt.loadTasks("tasks");
    grunt.registerTask('styles', ['sass', 'autoprefixer', 'cssmin']);
    grunt.registerTask('javascript', ['concat', 'uglify']);
    grunt.registerTask('imageminnewer', ['newer:imagemin']);
    grunt.registerTask('default', ['sass', 'autoprefixer', 'express:dev', 'open', 'watch']);
    grunt.registerTask('build', ['clean', 'styles', 'javascript', 'imageminnewer']);

};
