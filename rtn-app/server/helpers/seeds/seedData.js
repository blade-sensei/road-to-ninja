const data = {
  'users' : [
    {
      username : 'sensei',
      uid : '1',
      name: 'juan',
      password : 'pswd',
    },
    {
      username : 'repou',
      uid : '2',
      name: 'poure',
      password : 'pswd',
    },
    {
      username : 'pampa',
      uid : '3',
      name: 'pampa',
      password : 'pswd',
    }
  ],
  'projects' :[
    {
      title : 'project 1',
      description: 'This is the description for project 1',
      status : 'finished',
      data : 'https://',
      uid : '1',
      requires : [],
    },
    {
      title : 'project 1b',
      description: 'This is the description for project 1b',
      status : 'finished',
      data : 'https://',
      uid : '2',
      requires : []
    },
    {
      title : 'project 2b',
      description: 'This is the description for project 2b',
      status : 'no started',
      data : 'https://',
      uid : '2',
      requires : [{
        title : 'project 1b',
        description: 'This is the description for project 1b',
        status : 'finished',
      }]
    },
    {
      title: 'project 3',
      description: 'This is the description for project 3',
      status: 'started',
      data: 'https://',
      uid : '1',
      requires: [
        {
          title : 'project 1',
          description: 'This is the description for project 1',
          status : 'finished',
        }]
    },
    {
      title: 'project 4',
      description: 'This is the description for project 4',
      status: 'in progress',
      data: 'https://',
      uid : '1',
      requires: [
        {
          title : 'project 1',
          description: 'This is the description for project 1',
          status : 'finished',
        }
      ]
    }
  ]
};

module.exports = data;