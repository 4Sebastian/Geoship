import axios from "axios"

interface HttpResponse {
    data: any,
    status: number
}

type Handler = (response: HttpResponse) => void;

function get(url: string, response_handler: Handler, catch_handler?: Handler) {
    axios.get(url)
        .then(function (response) {
            response_handler({data: response.data, status: response.status})
        }).catch((err) => {
            if(catch_handler){
                catch_handler({data: err.response.data, status: err.response.status});
            }
        })
}

function post(url: string, data: any, response_handler?: Handler, catch_handler?: Handler) {
    axios.post(url, data)
        .then(function (response) {
            if(response_handler){
                response_handler({data: response.data, status: response.status})
            }
        }).catch((err) => {
            if(catch_handler){
                catch_handler({data: err.response.data, status: err.response.status});
            }
        })
}

function del(url: string, response_handler?: Handler, catch_handler?: Handler) {
    axios.delete(url)
        .then(function (response) {
            if(response_handler){
                response_handler({data: response.data, status: response.status})
            }
        }).catch((err) => {
            if(catch_handler){
                catch_handler({data: err.response.data, status: err.response.status});
            }
        })
}