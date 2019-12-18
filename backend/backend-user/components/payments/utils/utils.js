
var profile_name = Math.random().toString(36).substring(7);
const paypalConfigure = {
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AUV2xMuQXiRmF0mlpab5xwqKogt6bbK4nQqT9D1EJSETXJpo6OG2L1igLWsPn2jhWBwVnR-4LUzCFLit',
    'client_secret': 'EK5z3wCPsxuyAf3mcDQkJe9R9w7McC8vGcvJ5CSnAkIclXJX0TH68LpOE-j0q9-IlWLBvjGaou7gTDMP'
};

var create_web_profile_json = ()=>( {
    "name": profile_name,
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

var create_payment_json = (price,successUrl,cancelUrl)=>({
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



const execute_payment_json = (payer_id,price)=>({
    "payer_id": payer_id,
    "transactions": [{
      "amount": {
        "currency": "USD",
        "total": price
      }
    }]
  });

module.exports = {paypalConfigure, create_payment_json,create_web_profile_json,execute_payment_json};