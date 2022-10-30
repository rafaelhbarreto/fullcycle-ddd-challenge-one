import Order from "../../../domain/entities/order";
import { OrderItemModel } from "../sequelize/model/order-item.model";
import { OrderModel } from "../sequelize/model/order.model";

export default class OrderRepository {

  public async create(order: Order): Promise<void> {
    await OrderModel.create({
      id: order.id,
      customerId: order.customerId,
      total: order.total(),
      items: order.items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        productId: item.productId,
      }))
    }, {
      include: [{model: OrderItemModel}]
    })
  }

}