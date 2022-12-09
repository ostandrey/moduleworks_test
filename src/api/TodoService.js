import axios from "axios";

export default class PostService {
    static async getAll(limit = 10) {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos', {
            params: {
                _limit: limit,
            }
        });
        return response.data;
    }
}