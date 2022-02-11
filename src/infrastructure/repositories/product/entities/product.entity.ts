import { Document } from 'mongoose'

export interface ProductEntity extends Document {
    readonly title: string;
    readonly description: string;
    readonly price: number;
}