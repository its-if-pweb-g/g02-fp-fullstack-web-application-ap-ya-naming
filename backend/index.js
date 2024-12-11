const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { error } = require("console");
const { type } = require("os");
const bcrypt = require('bcrypt');


// Middleware to parse JSON
app.use(express.json());

app.use(cors());

// Database connection with MongoDB
mongoose.connect("mongodb://user-g:g-for-goodluck@db.nafkhanzam.com/pweb-g", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log("Error connecting to MongoDB: ", err);
    process.exit(1);  // Exit the application if connection fails
});
// API
app.get("/",(req,res)=>{
    res.send("Express app is running");
})

app.use((req, res, next) => {
    if (mongoose.connection.readyState !== 1) {
        return res.status(500).json({ error: 'Database not connected' });
    }
    next();
});

// Image storage engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename:(req,file,cb)=>{
        return cb(null, `${file.fieldname}_${Date.now()}${path,path.extname(file.originalname)}`)
    }
})

const upload = multer({storage:storage})

// Upload endpoint for images
app.use('/images',express.static('upload/images'))

app.post("/upload",upload.single('product'),(req,res)=>{
    res.json({
        success:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
})

// Schema for creating products
const Product = mongoose.model("Product",{
    id:{
        type: Number,
        required: true,        
    },
    name:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
    category:{
        type: String,
        required: true,
    },
    old_price:{
        type: Number,
        required: true,
    },
    new_price:{
        type: Number,
        required: true,
    },
    date:{
        type: Date,
        default: Date.now,
    },
    available:{
        type:Boolean,
        default:true,
    },
}, 'shoepping-products')

// API for adding products
app.post('/addproduct', async(req,res)=>{
    let products = await Product.find({});
    let id;
    if(products.length > 0){
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1;
    } else {
        id = 1;
    }
    const product = new Product({
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        old_price:req.body.old_price,
        new_price:req.body.new_price,
    });
    console.log(product);
    await product.save();
    console.log("Saved");
    res.json({
        success:true,
        name:req.body.name,
    })
})

// API for removing products
app.post('/removeproduct', async(req,res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("Removed");
    res.json({
        success:true,
        name:req.body.name,
    })
})

app.get('/product/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findOne({ id });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  });

  app.post('/updateproduct/:id', async (req, res) => {
    try {
        const updatedProduct = await Product.findOneAndUpdate(
            { id: req.params.id },
            { $set: req.body },
            { new: true }  // Return the updated document
        );
        if (!updatedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }
        console.log('Updated Product:', updatedProduct);
        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error while updating product' });
    }
});

// API for getting all products
app.get('/allproducts', async(req,res)=>{
    let products = await Product.find({});
    console.log("All Products Fetched");
    res.send(products);
})

// schema for creating user model
const Users = mongoose.model('Users',{
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
    },
    cartData:{
        type:Object,
    },
    date:{
        type:Date,
        default:Date.now,
    }
}, 'shoepping-users')

app.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validasi format email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, errors: "Invalid email format" });
        }

        // Validasi panjang password
        if (password.length < 8) {
            return res.status(400).json({ success: false, errors: "Password must be at least 8 characters long" });
        }

        // Cek apakah email sudah digunakan
        let check = await Users.findOne({ email });
        if (check) {
            return res.status(400).json({ success: false, errors: "Existing user found with same email address" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Membuat data cart default
        let cart = {};
        for (let i = 0; i < 300; i++) {
            cart[i] = 0;
        }

        // Menyimpan pengguna baru
        const user = new Users({
            name: username,
            email,
            password: hashedPassword,
            cartData: cart,
        });

        await user.save();

        // Membuat token
        const data = {
            user: {
                id: user.id,
            },
        };

        const token = jwt.sign(data, 'secret_ecom');
        res.json({ success: true, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, errors: "Server error" });
    }
});


// endpoint for user login
app.post('/login', async (req, res) => {
    try {
        let user = await Users.findOne({ email: req.body.email });
        if (user) {
            // Compare hashed password
            const passCompare = await bcrypt.compare(req.body.password, user.password);
            if (passCompare) {
                const data = {
                    user: {
                        id: user.id,
                    },
                };
                const token = jwt.sign(data, 'secret_ecom');
                res.json({ success: true, token });
            } else {
                res.json({ success: false, errors: "Wrong Password" });
            }
        } else {
            res.json({ success: false, errors: "Email not registered" });
        }
    } catch (error) {
        res.status(500).json({ success: false, errors: "Server error" });
    }
});


// endpoint new collection data
app.get('/newcollections',async (req,res)=>{
    let products = await Product.find({});
    let newcollection = products.slice(1).slice(-8);
    console.log("NewCollection Fetched");
    res.send(newcollection);
})

// endpoint popular women
app.get('/popularinwomen', async (req,res)=>{
    let products = await Product.find({category:"Women"});
    let popular_in_women = products.slice(0,4);
    console.log("Popular in Women Fetched");
    res.send(popular_in_women);
})

// middleware to fetch user
const fetchUser = async (req,res,next)=>{
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({errors:"Please authenticate using valid token"})
    }
    else{
        try {
            const data = jwt.verify(token,'secret_ecom');
            req.user = data.user;
            next();
        } catch (error) {
            res.status(401).send({errors:"Please authenticate using a valid token"})
        }
    }
}

// endpoint adding products in cartdata
app.post('/addtocart',fetchUser,async(req,res)=>{
    let userData = await Users.findOne({_id:req.user.id});
    console.log("Added",req.body.itemId);
    userData.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Added")
})

// endpoint remove product from cartdata
app.post ('/removefromcart',fetchUser,async(req,res)=>{
    console.log("Removed",req.body.itemId);
    let userData = await Users.findOne({_id:req.user.id});
    if(userData.cartData[req.body.itemId]>0)
    userData.cartData[req.body.itemId] -= 1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Removed")    
})

// endpoint get cartdata
app.post('/getcart',fetchUser,async(req,res)=>{
    console.log("GetCart");
    let userData = await Users.findOne({_id:req.user.id});
    res.json(userData.cartData);
})

app.listen(port,(error)=>{
    if(!error) {
        console.log("Server running on port "+port)
    }
    else {
        console.log("Error: "+error)
    }
})