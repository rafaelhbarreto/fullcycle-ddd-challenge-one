import { BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { OrderModel } from "./order.model";
import ProductModel from "./product.model";

@Table({
  tableName: 'order_items',
  timestamps: false,
})
export class OrderItemModel extends Model {
  
  @PrimaryKey
  @Column
  declare id: string; 

  @ForeignKey(() => ProductModel)
  @Column({allowNull: false})
  declare productId: string; 

  @BelongsTo(() => ProductModel)
  declare product: ProductModel;
  
  @ForeignKey(() => OrderModel)
  @Column({allowNull: false})
  declare order_id: string; 

  @BelongsTo(() => OrderModel)
  declare order: OrderModel

  @Column
  declare quantity: number; 

  @Column
  declare name: string; 

  @Column
  declare price: number; 
}