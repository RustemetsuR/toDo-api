const router = require("express").Router();
const Task = require("../models/Task");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user._id });
        res.send(tasks);
    } catch (e) {
        res.sendStatus(500);
    }
});

router.post("/", auth, async (req, res) => {
    const task = new Task(req.body);
    try {
        await task.save();
        res.send(task);
    } catch (e) {
        res.status(400).send(e);
    };
});

router.put("/:id", auth, async (req, res) => {
    const task = await Task.findById(req.params.id);
    if (task) {
        if (task.user.toString() === req.user._id.toString()) {
            await task.update(req.body);
            try {
                await Task.save();
                res.send("The Task was successfully deleted");
            } catch (e) {
                res.status(400).send(e);
            };
        } else {
            res.status(400).send("You can update only your tasks");
        };
    } else {
        res.status(400).send("Task does not exist");
    };
});

router.delete("/:id", auth, async (req, res) => {
    const task = await Task.findById(req.params.id);
    if (task) {
        if (task.user.toString() === req.user._id.toString()) {
            await task.remove();
            try {
                await Task.save();
                res.send("The Task was successfully deleted");
            } catch (e) {
                res.status(400).send(e);
            };
        } else {
            res.status(400).send("You can delete only your tasks");
        };
    } else {
        res.status(400).send("Task does not exist");
    };
});

module.exports = router;
