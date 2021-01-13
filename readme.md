## Complete Road Map for DoorStep App:

## API's Required:

1.Signup for Customer,Shopkeeper and Delivery Person using gmail,email with phone number compuslory.Phone number should be otp Verified.

2.Login system for Customer,Shopkeeper and Delivery Person.

3.Complsory add his location via automatic gps location service.

## API's for Shopkeeper:

1.Add items from his shop into his inventory database.

2.Remove Items from his shop.

3.Change quantities of a product of his shop.

4.Add a simple text ,which displays any offer provided by the shopkeeper.

5.Check Notifications of any new Order.

6.Confirm or reject order.

7.Can talk via phone no. with customer or delivery person.

8.As soon as the order is accepted,a notification(with the relevant customer,shopkeeper and price details ) goes to delivery guy of that area,to collect the item and deliver to the address.

9.Can Add his online payment qr codes to his profile (googlepay,phonepe,paytm etc).

10.Check history of his orders.

## API's for Customer:

1.Search items,shops or any brand product.

2.Add to his cart the items.

3.Place order.

4.Add the time of delivery ,if time of delivery is less than or equal to 2hr from the time of order then extra charge will be taken.

5.Cannot cancel the order once accepted by the shopkeeper.

6.Once shopkeeper accepts the order,a notificaton should be shown to customer for order accpetance.
7.Check history of his orders.

8.Can talk via phone no. with Shokeeper or delivery person.

## API's for Delivery guy:

1.Has a list of orders placed by various customers from various shopkeepers,where each order has name,address,contact details
of both the shopkeeper and customer.
  
2.Can Mark an order as completed,cancelled or Not able to complete,etc.

3.Can talk via phone no. with customer or Shopkeeper.

4.Notifications of new orders assigned.

## Working:

1.when the user places an order,our api adds that order to the shopkeepers module.

2.As soon as the shopkeeper accepts the order,our basic app sends the notification to the delivery person with shop address and phone number,item details prices,any specific timing for delivery,customer address and phone number.

3.Then the delivery guy gets to the given shop takes the item and delivers to the customer.

4.Regarding payment,

if the payment is done via online mode then,the money directly goes to the shopkeeper with the delivery charge.

if the payment is done via offline mode then the delivery person should accept the cash and transfer that money himself by online mode to the shopkeeper. if the shopkeeper or delivery person does'nt has any online mode then delivery person should give money to the shopkeeper via offline mode.

5.At the end of everyday,shopkeeper will transfer all the extra delivery money to ours account keeping only his item money.

6.At the end of every day,the fixed money will be given to the delivery guy.

## Business Model:

1.First 5 orders without any Delivery charge.

2.First month use free for all shopkeepers.

3.AFter that delivery charge will be 5-10% of the order Price.

4.After one month money will be taken from the shopkeepers to continue their app usage.(Initially 300-400/month).

5.Advertisement service will be provided for the shopkeepers or any local or non-local business entity,to show
their advertisement on our app,by providing some fees.

6.If anyshokeeper wants to rise up in the cometition from other shopkeeprs selling same product then he must provide some extra money so that his shop would show up in the search results.

7.THis is a future idea to provide consultancy to the new shopkeepers wanting to open a shop in the locality and
are in the need of information regarding the type of people living here,type of products mostly sold here,etc
so that he may open up a correct shop.we would charge some fees for this service.
