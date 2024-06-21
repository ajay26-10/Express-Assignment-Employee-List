const express = require ('express');
const app = express();
const path = require('path');
const PORT = 3000;

app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

const empList = [];

app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname, 'public','index.html'));
});

app.get('/add',(req,res)=>{
    res.sendFile(path.join(__dirname,'public','addEmp.html'));
});

app.get('/submit',(req,res)=>{
    res.sendFile(path.join(__dirname,'public','submit.html'));
})

app.get('/view/:id', (req,res)=>{
    res.sendFile(path.join(__dirname,'public','viewEmp.html'));
});

app.get('/update',(req,res)=>{
    res.sendFile(path.join(__dirname,'public','updateEmp.html'));
})

app.get('/delete',(req,res)=>{
    res.sendFile(path.join(__dirname,'public','deleteEmp.html'))
})

app.get('/viewAll', (req,res)=>{
    res.send(empList);
})

app.get('/api/add/:id',(req,res)=>{
    const id = req.params.id;
    const emp = empList.find(emp => emp.empID == id);
    if(!emp){
        return res.status(404).send("Employee Not Found!")
    }
    res.json(emp);
});

app.post('/add',(req,res)=>{
    const {empID, empName} = req.body;
    console.log(req.body);
    const newEmp = {empID, empName};
    empList.push(newEmp);
    console.log(empList);
    res.redirect('/submit');
});

app.put('api/update/:id',(req,res)=>{
    const id= req.params.id;
    const {empID, empName} = req.body;
    const emp1 = empList.find(emp1 => emp1.empID == id);
    if(!emp1){
        return res.status(404).send("Employee Not Found!")
    }
    empList[empID].empName = empName;
    res.json(emp1);

});

app.delete('api/delete/:id', (req,res)=>{
    const id = req.params.id;
    const{empID, empName} = req.body;
    const emp2 = empList.find(emp2 => emp2.empID == id);
    if(!emp2){
        return res.status(404).send("Employee Not Found!")
    }
    const delEmp = empList.splice(empID,1);
    res.json(delEmp);
})


app.listen(PORT,()=>{
    console.log(`Server Listening to PORT ${PORT}`);
});