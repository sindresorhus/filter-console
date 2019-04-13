/// <reference types="node"/>
import {expectType} from 'tsd';
import filterConsole = require('.');

const disableFilter = filterConsole([
	'🐼',
	/foo/,
	output => {
		expectType<string>(output);
		return true;
	}
]);
filterConsole(['🐼'], {methods: ['log']});
filterConsole(['🐼'], {console: console});

expectType<() => void>(disableFilter);
disableFilter();
