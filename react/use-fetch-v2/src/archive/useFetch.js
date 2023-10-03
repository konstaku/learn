import { useEffect, useReducer } from 'react';

const ACTIONS = {
  FETCH_START: 'FETCH_START',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  FETCH_ERROR: 'FETCH_ERROR',
};

function fetchReducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.FETCH_START: {
      return {
        isLoading: true,
        isError: false,
      };
    }
    case ACTIONS.FETCH_SUCCESS: {
      return {
        data: payload.value,
        isLoading: false,
        isError: false,
      };
    }
    case ACTIONS.FETCH_ERROR: {
      return {
        isLoading: false,
        isError: true,
      };
    }
    default: {
      return state;
    }
  }
}

export function useFetch(url, options = {}) {
  const [fetchData, dispatch] = useReducer(fetchReducer, {
    isLoading: true,
    isError: false,
  });

  useEffect(() => {
    dispatch({ type: ACTIONS.FETCH_START });
    const controller = new AbortController();

    fetch(url, { ...options, signal: controller.signal })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject(response);
        }
      })
      .then((result) =>
        dispatch({ type: ACTIONS.FETCH_SUCCESS, payload: { value: result } })
      )
      .catch((e) => {
        if (e.name === 'AbortError') {
          return;
        }
        dispatch({ type: ACTIONS.FETCH_ERROR });
      });

    return () => {
      controller.abort();
    };
  }, [url]);

  return fetchData;
}
