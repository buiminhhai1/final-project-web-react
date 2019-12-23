const Base64 = require('js-base64').Base64;

const axios = require('axios');

const profile_name =() => Math.random().toString(36).substring(10);
const sender_batch_id = () => Math.random().toString(36).substring(10);
const paypalClient = {
    id: 'AUV2xMuQXiRmF0mlpab5xwqKogt6bbK4nQqT9D1EJSETXJpo6OG2L1igLWsPn2jhWBwVnR-4LUzCFLit',
    secret: 'EK5z3wCPsxuyAf3mcDQkJe9R9w7McC8vGcvJ5CSnAkIclXJX0TH68LpOE-j0q9-IlWLBvjGaou7gTDMP'
}
const paypalConfigure = {
    'mode': 'sandbox', //sandbox or live
    'client_id': paypalClient.id,
    'client_secret': paypalClient.secret
};
const PAYPAL_OAUTH_API = 'https://api.sandbox.paypal.com/v1/oauth2/token/';
const PAYPAL_CHECKOUT_API = 'https://api.sandbox.paypal.com/v1/payments/payouts';
const basicAuth = Base64.encode(`${paypalClient.id}:${paypalClient.secret}`);

var create_web_profile_json = () => ({
    "name": profile_name(),
    "presentation": {
        "brand_name": "Tutor Recommendation APP",
        "locale_code": "VN"
    },
    "input_fields": {
        "allow_note": true,
        "no_shipping": 1,
        "address_override": 1
    },
    "flow_config": {
        "landing_page_type": "billing",
    }
});

var create_payment_json = (price, successUrl, cancelUrl) => ({
    "intent": "sale",
    "payer": {
        "payment_method": "paypal"
    },
    "redirect_urls": {
        "return_url": successUrl,
        "cancel_url": cancelUrl,
    },
    "transactions": [{
        "item_list": {
            "items": [{
                "name": "item",
                "sku": "item",
                "price": price,
                "currency": "USD",
                "quantity": 1
            }]
        },
        "amount": {
            "currency": "USD",
            "total": price
        },
        "description": "Cost for rent a tutor"
    }]
});



const execute_payment_json = (payer_id, price) => ({
    "payer_id": payer_id,
    "transactions": [{
        "amount": {
            "currency": "USD",
            "total": price
        }
    }]
});


const paypalTransferMoney = async (email,amount) => {
    try{
        const auth = await axios({
            url: PAYPAL_OAUTH_API,
            method: 'post',
            headers: {
                'Content-Type': `application/x-www-form-urlencoded`,
                Authorization: `Basic ${basicAuth}`
            },
            data: `grant_type=client_credentials`
        });
        if(auth){
            const details = await axios({
                method: 'post',
                url: PAYPAL_CHECKOUT_API,
                data: {
                    "sender_batch_header": {
                        "sender_batch_id": sender_batch_id(),
                        "email_subject": "Withdraw",
                        "email_message": "You have received some money through paypal! Thanks for using our service!"
                    },
                    "items": [
                        {
                            "recipient_type": "EMAIL",
                            "amount": {
                                "value": amount,
                                "currency": "USD"
                            },
                            "receiver": email
        
                        }
                    ]
                },
                headers: {
                    Accept: `application/json`,
                    Authorization: `Bearer ${auth.data.access_token}`
                }
            },
            );
            return details;
        }else return {status:400};
        
    }catch(error){
        return {status:400};
    }

}

module.exports = { paypalTransferMoney, paypalConfigure, create_payment_json, create_web_profile_json, execute_payment_json };