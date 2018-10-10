import test from 'ava';
import sinon from 'sinon';
import filterConsole from '.';

const methods = [
	'log',
	'debug',
	'info',
	'warn',
	'error'
];

const getConsole = () => {
	const customConsole = {};

	for (const method of methods) {
		customConsole[method] = sinon.fake();
	}

	return customConsole;
};

test('main', t => {
	const customConsole = getConsole();

	const fixture1 = '-1-';
	const fixture2 = '-2-';
	const fixture3 = '-3-';
	const fixture4 = 'Foo Bar';
	const fixture5 = 'unicorn';

	const disableFilter = filterConsole([
		'2',
		/^foo/i,
		output => output.endsWith('corn')
	], {console: customConsole});

	customConsole.log(fixture1);
	customConsole.log(fixture2);
	customConsole.log(fixture3);
	customConsole.log(fixture4);
	customConsole.log(fixture5);

	t.true(customConsole.log.original.calledWith(fixture1));
	t.false(customConsole.log.original.calledWith(fixture2));
	t.true(customConsole.log.original.calledWith(fixture3));
	t.false(customConsole.log.original.calledWith(fixture4));
	t.false(customConsole.log.original.calledWith(fixture5));

	disableFilter();
	customConsole.log(fixture2);
	t.true(customConsole.log.calledWith(fixture2));
});

test('`methods` option`', t => {
	const customConsole = getConsole();

	const fixture1 = '1';

	filterConsole([fixture1], {
		console: customConsole,
		methods: ['warn']
	});

	customConsole.log(fixture1);
	t.true(customConsole.log.calledWith(fixture1));

	customConsole.warn(fixture1);
	t.false(customConsole.warn.original.calledWith(fixture1));
});
