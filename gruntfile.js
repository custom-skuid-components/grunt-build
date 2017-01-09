module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		clean: {
  			build: ['tmp', '<%= pkg.name %>']
  		},
		copy: {
			main: {
				files: [
					// includes only the builder, runtime and css files
					{	expand: true, 
						src: ['src/*.json', 'src/**/builders.js', 'src/**/runtime.js', 'src/**/*.css'], 
						dest: 'tmp/',
						rename: function(dest, src) {
							return dest + src.replace('src/','<%= pkg.name %>/');
					    }
					}
				],
			},
		},
		compress: {
			options: {
				pretty: true,
				mode: 'zip'
			},
			build: {
				options: {
					archive: '<%= pkg.name %>/staticresources/<%= pkg.name %>.resource'
				},
				expand: true,
				cwd: 'tmp/<%= pkg.name %>',
				src: '**/*'
			}
		},
	  	antdeploy: {
			options: {
				root: '<%= pkg.name %>/',
				useEnv: true,
				//existingPackage: true
			},
			// specify one deploy target
			build: {
				options: {
					serverurl: 'https://login.salesforce.com' //'https://test.salesforce.com' // default => https://login.salesforce.com
				},
				pkg: {
					staticresource: ['*']
				}
			}
		}
	});

	grunt.registerTask('write-meta', 'Writing the required metadata for Salesforce static resources', function() {
		grunt.log.writeln('Writing metadata...');
		var sr = [
			'<?xml version="1.0" encoding="UTF-8"?>',
			'<StaticResource xmlns="http://soap.sforce.com/2006/04/metadata">',
			'    <cacheControl>Public</cacheControl>',
			'    <contentType>application/zip</contentType>',
			'</StaticResource>'
		];
		var dest = grunt.template.process('<%= pkg.name %>/staticresources/<%= pkg.name %>.resource-meta.xml');
		grunt.file.write(dest, sr.join('\n'));
	});

	grunt.loadNpmTasks('grunt-ant-sfdc');
	grunt.loadNpmTasks('grunt-contrib-compress');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');

	//register the tasks
	grunt.registerTask('default', ['clean', 'copy', 'compress', 'write-meta', 'antdeploy', 'clean']);
}