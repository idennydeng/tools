#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var cheerio = require('cheerio');
var program = require('commander');
var superagent = require('superagent');


var downloadPage = function (url, callback) {
	superagent.get(url).end(function(err, res) {
		if (err) console.error(err);
		callback(cheerio.load(res.text));
	});
}

var downloadFile = function (url, path) {
	var fileWriteStream = fs.createWriteStream(path); 
	superagent.get(url).pipe(fileWriteStream);
	fileWriteStream.on('close',function(){  
  		console.log('Download file: ' + path);    
	});
}

var downloadGroup = function (url, dir) {
	downloadPage(url, function($) {
		var group = $('.TypeNameText h3').text();
			groupDir = path.join(dir, group);
		fs.mkdir(groupDir);

		var $link = $('#topicListern li span a').each(function (i, element) {
			var $a = $(element),
				name = $a.text(),
				url = $a.attr('href').replace('mp3-', 'mp3-d');

			setTimeout(function (argument) {
				downloadPage(url, function ($) {
					var href = $('.downloadboxlist a').attr('href');
					downloadFile(href, path.join(groupDir, name + '.mp3'));
				});
			}, i * 1000);
		});
	});
}

program.version('0.0.1')
	.description('Download MP3 from http://www.youban.com/mp3/');

program.on('--help', function() {
	console.log('  Arguments:');
	console.log('');
	console.log('    <url> URL for MP3 column');
	console.log('    <dir> Save the directory');
	console.log('');
	console.log('  Examples:');
	console.log('');
	console.log('    $  ./download.js http://www.youban.com/mp3-t3190.html ./');
	console.log('    $  ./download.js http://www.youban.com/mp3-t4416.html ./');
	console.log('');
});

program.arguments('<url> <dir>').action(function (url, dir) {
	if (url !== undefined, dir !== undefined) {
		downloadGroup(url, dir);
	} else {
		program.help();
	}
});

program.parse(process.argv);
