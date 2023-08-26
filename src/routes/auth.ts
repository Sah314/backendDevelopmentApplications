import express from 'express';

const router = express.Router();

router.post('/login', (req, res) => {
    try {
        let{email,password}=req.body;
        if(email==='' || password ===''){
            return res.status(401).json({message:'Email or Password is empty.'})
        }
        
    } catch (error) {
        
    }
  

});
router.post('/signup', (req, res) => {
  
});

export default router;
