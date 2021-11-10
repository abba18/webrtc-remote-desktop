import { get, post } from "../utils/request";

export const queryDeviceList = async () => {
    // const resp = get("/api/devices")
    // https://jsonplaceholder.typicode.com/posts?_limit=5
    const resp = get("/posts?_limit=5")
    return resp
}