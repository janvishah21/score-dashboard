let BASE_URL = 'http://localhost:8000';

if(process.env.REACT_APP_ENV === 'development')
    BASE_URL = 'http://localhost:8000';

if(process.env.REACT_APP_ENV === 'production')
    BASE_URL = 'https://score-dashboard-api.herokuapp.com';

export { BASE_URL }