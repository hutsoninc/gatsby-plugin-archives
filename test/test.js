const { onCreatePage, onPreBootstrap } = require('../src/gatsby-node');

const env = process.env;

const noop = function () { };

describe('gatsby-plugin-archives', () => {

    describe('onPreBootstrap', () => {

        const setup = async options => {
            const reporter = {
                panic: jest.fn(),
            };

            await onPreBootstrap({ reporter }, options);

            return {
                reporter,
                options,
            };
        };

        it('imports', () => {
            expect(onPreBootstrap).toBeDefined();
            expect(typeof onPreBootstrap).toEqual('function');
        });

        it('removes plugins option', async () => {
            const { options } = await setup({
                plugins: [],
            });

            expect(options.plugins).toBeUndefined();
        });

        it('reports invalid exclude option', async () => {
            const { reporter } = await setup({
                exclude: noop,
            });

            expect(reporter.panic).toHaveBeenCalledTimes(1);
        });

        it('successfully validates exclude option as RegExp', async () => {
            const { reporter } = await setup({
                exclude: /templates/i,
            });

            expect(reporter.panic).toHaveBeenCalledTimes(0);
        });
        
        it('successfully validates exclude option as RegExp array', async () => {
            const { reporter } = await setup({
                exclude: [/templates/i],
            });

            expect(reporter.panic).toHaveBeenCalledTimes(0);
        });

    });

    describe('onCreatePage', () => {

        beforeEach(() => {
            process.env = Object.assign(env, {
                NODE_ENV: 'production',
            });
        });

        const fixture = {
            path: '/path/to/some/page'
        };

        const setup = async (page, options) => {
            const reporter = {
                info: jest.fn(),
            };

            const deletePage = jest.fn();

            const actions = {
                deletePage,
            };

            await onCreatePage({ actions, page, reporter }, options);

            return {
                deletePage,
                reporter,
            };
        };

        it('imports', () => {
            expect(onCreatePage).toBeDefined();
            expect(typeof onCreatePage).toEqual('function');
        });

        it('deletes page', async () => {
            const { deletePage } = await setup(fixture, {
                exclude: /path/,
            });

            expect(deletePage).toHaveBeenCalledTimes(1);
        });

        it('logs deleted page when verbose is set to true', async () => {
            const { deletePage, reporter } = await setup(fixture, {
                exclude: /path/,
                verbose: true,
            });

            expect(deletePage).toHaveBeenCalledTimes(1);
            expect(reporter.info).toHaveBeenCalledTimes(1);
        });

        it('does nothing when productionOnly is set to true', async () => {
            process.env = Object.assign(env, {
                NODE_ENV: 'development',
            });

            const { deletePage } = await setup(fixture, {
                exclude: /path/,
                productionOnly: true,
            });

            expect(deletePage).toHaveBeenCalledTimes(0);
        });

        it("uses fallback for exclude", async () => {
            const { deletePage } = await setup({
                path: '/pages/archives/page'
            });

            expect(deletePage).toHaveBeenCalledTimes(1);
        });

        it("doesn't delete page if the path doesn't match", async () => {
            const { deletePage } = await setup(fixture);

            expect(deletePage).toHaveBeenCalledTimes(0);
        });

        afterEach(() => {
            process.env = env;
        });

    });

});