const express = require('express');
const router = express.Router();

// Diary model
const Diary = require('../../models/Diary');

// @route GET api/diaries
// @desc get all diaries
// @access public
router.get('/', (req, res)=>{
    Diary.find()
        .sort({ date: -1 })
        .then(diaries=>res.json(diaries))
});

// @route POST api/diaries
// @desc create a new Diary
// @access public
router.post('/', (req, res)=>{
    const newDiary = new Diary({
        author: req.body.author,
        title: req.body.title,
        description: req.body.description
    })

    newDiary.save()
        .then(diary=>res.json(diary))
})

// @route GET api/diaries/:id
// @desc get an instance of a single diary
// @access public
router.get('/:id', (req,res)=>{
    Diary.findById(req.params.id)
        .then(diary =>((res.json(diary))))
})

// @route DELETE api/diaries/:id
// @desc delete a full diary
// @access public
router.delete('/:id', (req, res)=>{
    Diary.findById(req.params.id)
        .then(diary => diary.remove()
                            .then(()=>res.json({success: true})))
                            .catch(err=>res.json({success: false, error: err}))
})

// Page model
const Page = require('../../models/Page')

// @route GET api/diaries/:diary/pages/
// @desc get all diary pages 
// @access public
router.get('/:diary/pages/', (req,res)=>{
    Page.find({diary: req.params.diary})
        .then(page=>res.json(page))

})

// @route GET api/diaries/:diary/pages/:date
// @desc get a diary page given the date
// @access public
router.get('/:diary/pages/:date', (req, res)=>{
    Page.find({diary: req.params.diary, date:req.params.date})
        .then(page=>res.json(page))
})

// @route POST api/diaries
// @desc create a new page
// @access public
router.post('/:diary/pages/', (req, res)=>{
    const newPage = new Page({
        diary: req.params.diary,
        body: req.body.body,
        date: req.body.date
    })
    newPage.save()
        .then(page=>res.json(page))
})

// @route PUT api/diaries/:diary/pages/:date
// @desc modify a diary page given the date
// @access public
router.put('/:diary/pages/:date', (req, res)=>{
    const newPage = new Page({
        diary: req.params.diary,
        date: req.params.date,
        body: req.body.body,
        _id: req.body.id
    })
    const query = {
        diary: req.params.diary,
        date:req.params.date
    }
    Page.findOneAndUpdate(query, newPage)
        .then(page=>res.json(page))
})

// @route DELETE api/diaries/:id/pages
// @desc delete all pages associated with a diary
// @access public
router.delete('/:id/pages', (req, res)=>{
    // Page.find({diary: req.params.id})
    //     .then(page => page.remove()
    //                         .then(()=>res.json({success: true})))
    //                         .catch(err=>res.json({success: false, error: err}))
    Page.remove({diary: req.params.id})
                            .then(()=>res.json({success: true}))
                            .catch(err=>res.json({success:false, error: err}))
})

module.exports = router;