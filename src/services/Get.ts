
class Get {
    static async getAppData(){
        try {
            const resp = await fetch ('https://fakestoreapi.com/products')
            return resp.json();
        } catch(e) {
            console.error(e)
        }
}
}

export default Get


