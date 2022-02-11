export class Product {
    public readonly id?: string;
    public readonly title: string;
    public readonly description: string;
    public readonly price: number;


    constructor(id: string, title: string, description: string, price: number) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.price = price;
    }
}
