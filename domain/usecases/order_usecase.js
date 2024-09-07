// npm install mongoose uuid

const orderRepository = require('../repositories/order_repository');
const { v4: uuidv4 } = require('uuid');

// Function to create a new order
const create = async (orderData) => {
    try {
        const orderId = uuidv4();
        let items = [];
        let total_price = 0;
        console.log(orderData);
        if (!orderData.order_items || orderData.order_items.length === 0) {
            throw new Error('Order items are required');
        }
        orderData.order_items = orderData.order_items.map(item => {
            item.item_id = uuidv4();

            let itemPrice = item.item_price * item.item_quantity

            items.push(item);

            total_price += itemPrice;
        });
        
        orderData.customer.customer_id = uuidv4();

        const order = {
            order_id: orderId,
            order_name: orderData.order_name,
            quantity: orderData.quantity,
            total_price: total_price,
            status: orderData.status,
            order_items: items,
            customer: orderData.customer,
            created_by: orderData.created_by,
        }
        const createdOrder = await orderRepository.create(order);
        return createdOrder;
    } catch (error) {
        throw new Error('Failed to create order: ' + error.message);
    }
};

// Function to get list of orders
const getList = async () => {
    try {
        const orders = await orderRepository.findAll();
        return orders;
    } catch (error) {
        throw new Error('Failed to get list of orders: ' + error.message);
    }
}

// Function to get an order by order id
const getOneByOrderId = async (orderId) => {
    try {
        const order = await orderRepository.getOneByOrderId(orderId);
        return order;
    } catch (error) {
        throw new Error('Failed to get order by order_id: ' + error.message);
    }
}

module.exports = { create, getList, getOneByOrderId };