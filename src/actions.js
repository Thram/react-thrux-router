/**
 * Created by Thram on 16/04/17.
 */
import _assign from 'lodash/assign';
import _merge from 'lodash/merge';
import _omit from 'lodash/omit';
import _map from 'lodash/map';
import _find from 'lodash/find';
import UrlPattern from 'url-pattern';
import { parse, stringify } from 'qs';
import { createDict, dispatch, register } from 'thrux';

let options = {
  base: '#',
};

export const initRoutes = (routes, opts) => {
  options = _assign({}, options, opts);
  register({
    router: {
      INIT: createDict(() => ({
        routes: _map(routes, route =>
          _assign({}, route, { pattern: new UrlPattern(route.path) })),
      })),
      GO_ROUTE: createDict(({ routeId, props }, state) => {
        console.log(_find(state.routes, route => route.pattern.match(routeId || '/')));
        const routeKey = routeId || '/';
        const currentRoute = _find(state.routes, (route) => {
          const params = route.pattern.match(routeKey);
          if (params) {
            _assign(props, params);
            return true;
          }
          return false;
        });
        return _assign({}, state, {
          current: {
            props,
            ...currentRoute,
          },
        });
      }),
      SET_TAB: createDict((tab, state) => _merge({}, state, { current: { tab } })),
      OPEN_MODAL: createDict((modal, state) => _assign({}, state, { modal })),
      CLOSE_MODAL: createDict((payload, state) => _omit(state, 'modal')),
    },
  });
};


export const setTab = tab => dispatch('router:SET_TAB', tab);

export const goRoute = (routeId, query) => {
  window.location.href = `${options.base}${routeId || '/'}${query ? `?${stringify(query)}` : ''}`;
};

export const openModal = modal => dispatch('router:OPEN_MODAL', modal);

export const closeModal = () => dispatch('router:CLOSE_MODAL');

export const goHash = () => {
  const [path, query] = location.hash.split('?');
  const routeId = path.replace(`${options.base}`, '');
  console.log({
    routeId,
    props: parse(query),
  });
  dispatch('router:GO_ROUTE', {
    routeId,
    props: parse(query),
  });
};

export default { goHash, openModal, closeModal, setTab, goRoute, initRoutes };
