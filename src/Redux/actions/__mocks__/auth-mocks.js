
const user={
    username:'hriks',
    password:'gt4043@1'
}
export function loginUser(username,password) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // simulate backend query for ifExsit 
            if(username===user.username && password===user.password){
               return resolve({
                    status:200,
                    data: {
                      token:'xxxxxxxxxx'
                    }
                })
            }
            reject({
                status:400,
                message:'user login failed'
            }) 
        }, 100);
    })
}    