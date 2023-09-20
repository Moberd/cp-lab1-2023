class Cache{

    access_cnt = new Map()
    vault = new Map()

    constructor(){
    }

    set(key, value, access=1){
        if (typeof key === 'number' || typeof key === 'string'){
            if (typeof access === 'number'){
                this.vault.set(key, value)
                this.access_cnt.set(key, access)
                return true
            }
            throw new TypeError("Number of access must be a number")
        }
        throw new TypeError("Key must be number or string")
    }

    get(key){
        if (this.vault.has(key)) {
            this.access_cnt.set(key, this.access_cnt.get(key) - 1)
            let return_value = this.vault.get(key)
            if (this.access_cnt.get(key) === 0) {
                this.vault.delete(key)
                this.access_cnt.delete(key)
            } 
            return return_value
        } 
        return null
    }
    
    describe(){
        let res = ''
        for (let [k, v] of this.vault) {
            res += `Key:${k} Value:${v} Left entries:${this.access_cnt.get(k)}\n`
        }
        return res
    }

}
export {Cache}