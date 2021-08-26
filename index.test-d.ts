import {expectType} from 'tsd';
import filterConsole from './index.js';

const disableFilter = filterConsole([
	'🐼',
	/foo/,
	output => {
		expectType<string>(output);
		return true;
	},
]);
filterConsole(['🐼'], {methods: ['log']});
filterConsole(['🐼'], {console});

expectType<() => void>(disableFilter);
disableFilter();
