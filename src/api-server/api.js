const baseUrl = 'https://conduit.productionready.io/api/';

const request = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);

    return await response.json();
  } catch (error) {
    const myMessage = 'Requests faild';
    throw new Error(`${myMessage}, ${error.message}`);
  }
};
export const isUsernameFree = async (username) => {
  const response = await request(`${baseUrl}profiles/${username}`);
  return !response.profile;
};
export const regUser = async (userData) => {
  if (!userData) {
    throw new Error('Missing user data');
  }

  const { username, email, password } = userData;

  const regUserData = {
    user: {
      username,
      email,
      password,
    },
  };
  const regOptions = {
    method: 'POST',
    headers: {
      'Content-Type': `application/json;charset=utf-8`,
    },
    body: JSON.stringify(regUserData),
  };
  return request(`${baseUrl}users`, regOptions);
};

export const getCurrentUser = async (jwtToken) => {
  if (!jwtToken) {
    throw new Error('Missing user token');
  }
  const regOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Token ${jwtToken}`,
    },
  };
  return request(`${baseUrl}user`, regOptions);
};

export const authUser = async (userData) => {
  if (!userData) {
    throw new Error('Missing user data');
  }

  const { email, password } = userData;
  const regUserData = {
    user: {
      email,
      password,
    },
  };
  const regOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      // Authorization: `Token ${jwtToken}`,
    },
    body: JSON.stringify(regUserData),
  };
  return request(`${baseUrl}users/login`, regOptions);
};

export const updateUser = async (userData, jwtToken) => {
  if (!userData) {
    throw new Error('Missing user data');
  }

  const regUserData = {
    user: { ...userData },
  };
  const regOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Token ${jwtToken}`,
    },
    body: JSON.stringify(regUserData),
  };
  return request(`${baseUrl}user`, regOptions);
};

export const getArticlesList = async (limit = 5, page = 1, jwtToken = '') => {
  let headers = {};
  if (jwtToken) {
    headers = {
      'Content-Type': `application/json;charset=utf-8`,
      Authorization: `Token ${jwtToken}`,
    };
  } else {
    headers = {
      'Content-Type': `application/json;charset=utf-8`,
    };
  }
  const offset = page === 1 ? 0 : (page - 1) * 5;
  const options = {
    method: 'GET',
    headers,
  };
  return request(`${baseUrl}articles?limit=${limit}&offset=${offset}`, options);
};
export const getSingleArticle = async (slug, jwtToken = '') => {
  let headers = {};
  if (jwtToken) {
    headers = {
      'Content-Type': `application/json;charset=utf-8`,
      Authorization: `Token ${jwtToken}`,
    };
  } else {
    headers = {
      'Content-Type': `application/json;charset=utf-8`,
    };
  }
  const options = {
    method: 'GET',
    headers,
  };
  const singleArticle = await request(`${baseUrl}articles/${slug}`, options);

  return singleArticle;
};
export const favoriteArticle = async (slug, jwtToken, favorite) => {
  const actionMethod = favorite ? 'DELETE' : 'POST';
  const options = {
    method: actionMethod,
    headers: {
      'Content-Type': `application/json;charset=utf-8`,
      Authorization: `Token ${jwtToken}`,
    },
  };
  return request(`${baseUrl}articles/${slug}/favorite`, options);
};

export const createArticle = async (data, jwtToken) => {
  // const { body, title, description } = data;

  // const tagList = [];
  // for (const key in data) {
  //   if (key.includes("tag")) {
  //     tagList.push(data[key]);
  //   }
  // }
  // const articleData = { article: { body, title, description, tagList } };

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': `application/json;charset=utf-8`,
      Authorization: `Token ${jwtToken}`,
    },
    body: JSON.stringify(data),
  };
  return request(`${baseUrl}articles`, options);
};

export const updateArticle = async (data, slug, jwtToken) => {
  // const { body, title, description } = data;
  //
  // const tagList = [];
  // for (const key in data) {
  //   if (key.includes("tag")) {
  //     tagList.push(data[key]);
  //   }
  // }
  // const articleData = { article: { body, title, description, tagList } };

  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': `application/json;charset=utf-8`,
      Authorization: `Token ${jwtToken}`,
    },
    body: JSON.stringify(data),
  };
  return request(`${baseUrl}articles/${slug}`, options);
};

export const deleteArticle = async (slug, jwtToken) => {
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': `application/json;charset=utf-8`,
      Authorization: `Token ${jwtToken}`,
    },
  };
  await request(`${baseUrl}articles/${slug}`, options);

  return 'article deleted';
};

export const getFromLStorage = (valueName) => {
  return JSON.parse(localStorage.getItem(valueName));
};
export const removeFromLStorage = (valueName) => {
  return localStorage.removeItem(valueName);
};
export const setToLStorage = (valueName, data) => {
  localStorage.setItem(valueName, JSON.stringify(data));
};
