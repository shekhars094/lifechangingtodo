const router = require("express").Router();

const Todo = require("../models/todo");

router.get("/", (req, res) => {
    Todo.find({})
        .then(data => {
            res.render("index", { data });
        })
        .catch(err => {
            res.redirect("/");
        });
});

router.post("/", (req, res) => {
    Todo.create(req.body)
        .then(todo => {
            console.log("Document is saved");
            res.redirect("/");
        })
        .catch(err => {
            res.json({ err: `${err}` });
        });
});

router.post("/delete/:id", (req, res) => {
    const id = req.params.id;

    Todo.findOneAndDelete({ _id: id })
        .then(data => {
            res.redirect("/");
        })
        .catch(err => {
            res.json({ err: `${err}` });
        });
});

router.post("/update/:id", (req, res) => {
    const id = req.params.id;

    Todo.findOneAndUpdate(
        { _id: id },
        { $set: { completed: req.body.completed } }
    )
        .then(respon => {
            console.log(`Update is succesful`);
        })
        .catch(err => {
            res.json({
                err: `${err}`
            });
        });
});

module.exports = router;
