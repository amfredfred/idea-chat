type RouteNames = '';

export type RouteMethods =
    'post' |
    'get';

type ApiRoutes = Record<RouteNames, (data?: Record<string, string>, path?: string) => {
    method: RouteMethods,
    path: string,
    data?: Record<string, string>
}>;

export const apiRoutes: ApiRoutes = {
    '': () => ({
        path: '',
        method: 'get'
    })
};