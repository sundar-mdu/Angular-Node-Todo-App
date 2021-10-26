import paypal from 'paypal-rest-sdk'

export const createPay = async (req, res) => {
    try {
        const create_payment_json = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": "http://localhost:4200/success",
                "cancel_url": "http://localhost:4200/cancel"
            },
            "transactions": [{
                "item_list": {
                    "items": [{
                        "name": "Red Sox Hat",
                        "sku": "001",
                        "price": "50.00",
                        "currency": "USD",
                        "quantity": 1
                    }]
                },
                "amount": {
                    "currency": "USD",
                    "total": "50.00"
                },
                "description": "Hat for the best team ever"
            }]
        };

        paypal.payment.create(create_payment_json, function (error, payment) {
            if (error) {
                res.status(404).json({ message:error.message})
            } else {
                for(let i=0;i<payment.links.length;i++){
                    if(payment.links[i].rel=='approval_url'){
                        res.status(200).json({resUrl: payment.links[i].href})
                    }
                }
            }
        });
    } catch (error) {
        res.status(404).json({ message:error.message})
    }
}

export const executePay = async (req, res) => {
    try {
        const PayerID = req.body.PayerID
        const paymentId = req.body.paymentId

        console.log('PayerID', PayerID);
        console.log('paymentId', paymentId);


        const execute_payment_json = {
            "payer_id": PayerID,
            "transactions": [{
                "amount": {
                    "currency": "USD",
                    "total": "50.00"
                }
            }]
        };

        paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
            if (error) {
                console.log(error.response);
                throw error;
            } else {
                console.log("Get Payment Response");
                console.log(JSON.stringify(payment));
                res.status(200).json('Payment make successfully!')
            }
        });
    } catch (error) {
        res.status(404).json({ message:error.message})
    }
}