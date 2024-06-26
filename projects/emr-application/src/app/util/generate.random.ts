export class GenerateRandomValue {
    public static generate(length: number) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return result;
    }
    public static generateNumber(min:number, max:number){
        var num = Math.floor(Math.random() * (max - min + 1)) + min;
        return (num === 8 || num === 15) ? GenerateRandomValue.generateNumber(min, max) : num;
    }
}