from flask import Flask, render_template, request, redirect
from flask_mail import Mail, Message
import json

app = Flask(__name__)

app.secret_key = "donbrands-secret-key"

app.config["MAIL_SERVER"] = "smtp.gmail.com"
app.config["MAIL_PORT"] = 587
app.config["MAIL_USE_TLS"] = True
app.config["MAIL_USERNAME"] = "YOUR_EMAIL@gmail.com"
app.config["MAIL_PASSWORD"] = "YOUR_APP_PASSWORD"

mail = Mail(app)

products = [

{
        "id":1,
        "name":"Luxury Senator White",
        "price":45000,
        "old_price":55000,
        "category":"Senators",
        "image":"images/senators/senator1.jpg",
        "badge":"HOT",
        "description":"Premium senator wear made with high-quality fabric."
    },

    {
        "id":2,
        "name":"Luxury Men's Set",
        "price":38000,
        "old_price":45000,
        "category":"Men",
        "image":"images/men/men1.jpg",
        "badge":"NEW",
        "description":"Modern luxury casual outfit."
    },
    
    {
       "id":3,
       "name":"Elegant Evening Dress",
       "price":32000,
       "old_price":40000,
        "category":"Women",
        "image":"images/women/women1.jpg",
        "badge":"SALE",
        "description":"Elegant evening gown."
    }
]

@app.route("/")
def home():
    return render_template("index.html", products=products)

@app.route("/cart")
def cart():
    return render_template("cart.html")

@app.route("/checkout")
def checkout():
    return render_template("checkout.html")

@app.route("/place-order", methods=["POST"])
def place_order():

    name = request.form["name"]
    phone = request.form["phone"]
    email = request.form["email"]
    address = request.form["address"]

    cart = json.loads(request.form["cart"])

    total = 0
    order = ""

    for item in cart:
        subtotal = item["price"] * item["quantity"]
        total += subtotal

        order += (
            f"{item['name']}\n"
            f"Qty: {item['quantity']}\n"
            f"Price: ₦{item['price']:,}\n\n"
        )

    body = f"""
NEW ORDER

Customer: {name}
Phone: {phone}
Email: {email}
Address: {address}

----------------------------

{order}

TOTAL: ₦{total:,}
"""

    try:

        msg = Message(
            subject="🛍 New Donbrands Boutique Order",
    sender=app.config["MAIL_USERNAME"],
    recipients=["YOUR_EMAIL@gmail.com"]
        )

        msg.body = body

        mail.send(msg)

        flash("Order placed successfully!")

    except Exception as e:

        print(e)

        flash("Order could not be sent.")

    return redirect("/")

@app.route("/product/<int:id>")
def product(id):

    product = next((p for p in products if p["id"] == id), None)

    if product is None:
        return "Product not found", 404

    return render_template("product.html", product=product)

if __name__ == "__main__":
    app.run(debug=True)