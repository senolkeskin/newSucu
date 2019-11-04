export interface IOrderItem
{
    orderId:number,
    unitPrice:number,
    totalPrice:number,
    tookTotalPrice: number,
    restAmount: number,
    count:number,
    productName: string,
    productCode: string,
    dateTime: string,
}