'use strict'
fetch('https://graph.facebook.com/1423985038'+
      '?access_token=EAAEYW8PJBmABAIEQZAijc8kKXZApdxuhxPQbUjKlYjR5PEeTfocALCCT3VtyroHUQqg3UimxAj9vqJnj3UTgkc6SXDkn1h5fzaVZACrUF26kH5hi8hggexG2zIvZCO7X1l3GWwDUurIZBTocZCahtDubwtPY3PfGfb9BEleoZBQddERYJ7IfaUbIt120WmsrZBkZD')
  .then(response => response.json())
  .then(json => json.name)
  .then(name => name.toLowerCase().replace(' ', ''))
  .then(userName => fetch(`https://api.github.com/users/${userName}`))
  .then(response => response.json())
  .then(gitHubUser => {
    const img = document.createElement('img');
    img.src = gitHubUser.avatar_url;
    document.body.append(img);
  })
;
