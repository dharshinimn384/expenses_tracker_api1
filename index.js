const express = require('express') 
const mongoose = require('mongoose')
const app = express()
const bodyParser = require('body-parser');
const port = process.env.PORT || 8000  
const Expense = require('./models/expense')
mongoose.connect('mongodb+srv://dharshinimn21aid:uxITgyYvYj0Tj1yw@cluster0.1lyjnaz.mongodb.net/Expense-tracker?retryWrites=true&w=majority',{
    useUnifiedTopology:true
})
app.use(express.json());
app.get('/expenses',async (req, res) => {
    const result = await Expense.find();
    res.send(result)
  })
app.get('/expenses/:id',async (req, res) => {
    const id =req.params.id;
    const result = await Expense.findById(id)
    try{
    if(result)
    {       
        res.send(result)
    }
    else
    {
        res.send("No expenses")
    }}catch(err)
    {
        res.send(err)
    }
})
app.delete('/expenses/:id',async (req, res) => {
    const id =req.params.id;
    const result = await Expense.findByIdAndDelete(id)
    try{
    if(result)
    {
        res.send(result)
    }
    else
    {
        res.send("No expenses")
    }}catch(err)
    {
        res.send(err)
    }
})

app.post('/expenses',async(req, res) => {
  console.log(req.body);
  const newExpense = req.body;
  await Expense.create(newExpense)
  res.send('<h1>haii</h1>')
})
app.put('/expenses/:id',async(req, res) => {
  const id =req.params.id;
  const updateObject = req.body;
  const updatedObject = await Expense.findByIdAndUpdate(id,
    {$set : updateObject},{new :true})

  res.send(updatedObject);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

