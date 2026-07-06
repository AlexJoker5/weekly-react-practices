import '@testing-library/jest-dom';

import 'whatwg-fetch';

import { server } from './mock-server';

import { vi } from 'vitest';

globalThis.jest = vi

beforeAll(() => server.listen({
    onUnhandledRequest(req) {
        console.warn(
            "You are directly calling the API in your test. Consider mocking the request! The unhandled call is %s %s", req.method, req.url.href
        );
    }
}));

afterEach(() => server.resetHandlers());
afterAll(() => server.close());