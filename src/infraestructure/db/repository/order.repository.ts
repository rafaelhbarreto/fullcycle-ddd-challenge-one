import Order from "../../../domain/entities/order";
import OrderItem from "../../../domain/entities/order-item";
import { OrderItemModel } from "../sequelize/model/order-item.model";
import { OrderModel } from "../sequelize/model/order.model";

export default class OrderRepository {

  public async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customerId: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          productId: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }

  public async update(order: Order): Promise<void> {
    await OrderModel.update({
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
      where: {
        id: order.id
      },
    });
  }

  public async find(id: string): Promise<Order> {
    let orderModel;

    try {
      orderModel = await OrderModel.findOne({
        where: {id},
        include: [{model: OrderItemModel}],
        rejectOnEmpty: true
      }); 
    } catch(err) {
      throw new Error('Order not found');
    }

    const items = orderModel.items.map(item => {
      return new OrderItem(
        item.id,
        item.name,
        item.price,
        item.productId,
        item.quantity
      ); 
    })

    return new Order(
      orderModel.id,
      orderModel.customerId,
      items
    );
  }

  public async findAll(): Promise<Order[]> {
   const orderModels = await OrderModel.findAll({
    include: ["items"]
   }); 
   
   return orderModels.map(orderModel => {
    return new Order(
      orderModel.id,
      orderModel.customerId,
      orderModel.items.map(item => {
        return new OrderItem(
          item.id,
          item.name,
          item.price/item.quantity,
          item.productId,
          item.quantity
        );
      })
    );
   });
  }

}