// Board
app.factory('Board', [
  'restmod', 'Options',
  function(restmod, Options) {
    return restmod.model(Options.apiUrl + '/boards')
  }
])

// Topic
app.factory('Topic', [
  'restmod', 'Options',
  function(restmod, Options) {
    return restmod.model(Options.apiUrl + '/topics')
  }
])

// Post
app.factory('Post', [
  'restmod', 'Options',
  function(restmod, Options) {
    return restmod.model(Options.apiUrl + '/posts')
  }
])
