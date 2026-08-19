import { EntitySchema } from "typeorm";

export const ProductModel = new EntitySchema({
    name: "products",
    tableName: "products", 
    columns : {
        product_id: {
            primary:true,
            type: "int",
            generated: true
        },

        name: {
            type: "varchar",
            length: 255,
            nullable: false
        },

        price: {
            type: "decimal",
            precision: 10,
            scale: 2,
            nullable: false
        },

        stock: {
            type: "int",
            default: 0,
            nullable: false
        },

        category: {
            type: "varchar",
            length: 100,
            nullable: false
        },

        supplier_note: {
            type: "text",
            nullable: true
        },

    }
})