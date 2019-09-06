const axios = require('axios');

let baseUrl = 'https://blua.blue/api.v1/';

const api = {
    config: {
        baseURL: baseUrl,
        timeout: 2000,
        headers:{'X-Custom-Header': 'coolio'}
    },
    token: false,
    connected:false,
    init: async (user, password) => {
        if(this.token){
            this.config.headers.Authorization = `Bearer ${this.token}`;
        }
        if(!this.connected){
            let instance = axios.create(api.config);
            await instance.post('login',{username:user,password:password}).then(res=>{
                api.token = res.data.token;
                api.connected = true;
                api.config.headers.Authorization = `Bearer ${res.data.token}`;
                instance = axios.create(api.config);
            }).catch(err=>{
                // console.log(err);
                process.end()
            });
            return instance;
        }
    }
};

module.exports = api;