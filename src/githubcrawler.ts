const octokit = require('@octokit/rest')({
    debug: false
});
octokit.issues.getForRepo({
    owner: 'broadinstitute',
    repo: 'cromwell'
}).then((data:any) => {
    // handle data
  data.data.forEach((p:any) => {
        console.log(p.user.login);
      octokit.orgs.getForUser({
          username: p.user.login  }).then( (k:any) => {
              console.log(k.data[0].login);
      })
    });

});

