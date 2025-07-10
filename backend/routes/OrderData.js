// const express = require("express")
// const router = express.Router()
// const Order = require('../models/Order')

// router.post('/orderData', async (req,res) =>{
//     let data = req.body.order_data
//      data.splice(0,0,{Order_date:req.body.order_data})

//     let eId = await Order.findOne({'email':req.body.email})
//     console.log(eId)
//     if(eId === null){
//         try{
//             await Order.create({
//                 email:req.body.email,
//                 order_data: [data]
//             }).then(()=>{
//                 res.json({success: true})
//             })

//         }
//         catch(error){
//             console.log(error.message)
//             res.send("Server Error", error.message)
//         }
//     }
//     else{
//         try{
//             await Order.findOneAndUpdate({email: req.body.email},
//                 { $push: {order_data: data} }).then(()=>{
//                     res.json({success: true})
//                 })
//         }
//         catch(error){
//               res.send("Server Error", error.message)
//         }
//     }
// })
// module.exports = router;

// const express = require("express");
// const router = express.Router();
// const Order = require('../models/Order');

// router.post('/orderData', async (req, res) => {
//     let data = req.body.order_data;

//     // 🛠️ Fix this line
//     data.splice(0, 0, { Order_date: req.body.order_date });

//     let eId = await Order.findOne({ 'email': req.body.email });
//     console.log("📥 Order received for:", req.body.email);
//     console.log("🛒 Order Data:", data);

//     if (eId === null) {
//         try {
//             await Order.create({
//                 email: req.body.email,
//                 order_data: [data]
//             });
//             res.json({ success: true });
//         } catch (error) {
//             console.error("❌ Create Error:", error.message);
//             res.status(500).send("Server Error");
//         }
//     } else {
//         try {
//             await Order.findOneAndUpdate(
//                 { email: req.body.email },
//                 { $push: { order_data: data } }
//             );
//             res.json({ success: true });
//         } catch (error) {
//             console.error("❌ Update Error:", error.message);
//             res.status(500).send("Server Error");
//         }
//     }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const Order = require('../models/Order');

router.post('/orderData', async (req, res) => {
    try {
        let data = req.body.order_data;

        // Add order date at the beginning
        data.splice(0, 0, { Order_date: req.body.order_date });

        console.log("📥 Order received for:", req.body.email);
        console.log("🛒 Order Data:", data);

        // Create new order every time (no update logic now)
        await Order.create({
            email: req.body.email,
            order_data: data
        });

        return res.json({ success: true });
    } catch (error) {
        console.error("❌ Order Save Error:", error.message);
        return res.status(500).send("Server Error");
    }
});

router.post('/myorderData', async(req,res)=>{
    try{
        let myData = await Order.findOne({'email': req.body.email})
        res.json({orderData:myData})
    }catch(error){
        res.send("Server Error", error.message)
    }
})

module.exports = router;
