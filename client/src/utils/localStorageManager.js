export const KEY_ACCESS_TOKEN = "Access_token"

export function getItem(key){
   return localStorage.getItem(key)
}

export function setItem(key, value){
    localStorage.setItem(key,value);
}

export function removeItem(key){
    localStorage.removeItem(key)
} 